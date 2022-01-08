<template>
  <div class="app">
    <div class="vertcont">
      
      <div class="controls">
        <VueCustomTooltip label="flip board" position="is-bottom">
        <button v-on:click="doFlip">Flip</button>
        </VueCustomTooltip>
        <VueCustomTooltip label="to begin" position="is-bottom">
        <button v-on:click="tobegin">|&lt;</button>
        </VueCustomTooltip>
        <VueCustomTooltip label="back" position="is-bottom">
        <button v-on:click="back">&lt;</button>            
        </VueCustomTooltip>
        <VueCustomTooltip label="forward" position="is-bottom">
        <button v-on:click="forward">&gt;</button>
        </VueCustomTooltip>
        <VueCustomTooltip label="to end" position="is-bottom">
        <button v-on:click="toend">&gt;|</button>
        </VueCustomTooltip>
        <VueCustomTooltip label="del" position="is-bottom">
        <button v-on:click="del">X</button>
        </VueCustomTooltip>
        <VueCustomTooltip label="reset board" position="is-bottom">
        <button v-on:click="reset">Reset</button>        
        </VueCustomTooltip>
        <VueCustomTooltip label="engine go" position="is-bottom">
        <button v-on:click="go">Go</button>
        </VueCustomTooltip>
        <VueCustomTooltip label="engine stop" position="is-bottom">
        <button v-on:click="stop">Stop</button>        
        </VueCustomTooltip>
        <VueCustomTooltip label="set board variant" position="is-bottom">
        <Perscombo v-on:perscombochanged="variantChanged" ref="variant" id="variant" :options="variants"></Perscombo>
        </VueCustomTooltip>
        <VueCustomTooltip label="set multipv" position="is-bottom">
        <Perscombo ref="setmultipv" id="setmultipv" :options="multipvs"></Perscombo>
        </VueCustomTooltip>
      </div>
      <div class="boardcont">   
        <div style="width: 480px; height: 480px;">   
          <div ref="board" style="width: 480px; height: 480px;" class="maplebackground is2d"></div>
        </div>
        <div class="legalsans">
          <div class="sancont" v-for="item in game.richLegalSans()" :key="item.san">
            <div :class="item.class" v-on:click="clickSan" :san="item.san">
              {{ item.san }}
            </div>
            <button style="margin-left: 5px;" :san="item.san" v-on:click="stepRating(item.san, 1)">+</button>
            <div class="weight">
              <span v-if="item.weights[0] < 10">
                {{ item.weights[0] }}
              </span>
              <span v-else>
                !
              </span>
            </div>
            <button :san="item.san" v-on:click="stepRating(item.san, -1)">-</button>
          </div>
        </div>
        <div class="legalsans">            
            <div v-for="node in game.mainLine().slice().reverse()" :key="node.id" v-on:click="clickNode" :id="node.id" :class="node.id === game.current.id ? 'legalsan selected':'legalsan'">
              {{ node.displaySan }}
            </div>
          </div>      
        <div class="analysis">          
          <div class="pvitem" v-for="item in pvInfo" :key="item.multipv">
            <div class="multipv">
              {{ item.multipv }}.
            </div>
            <div class="score">              
              {{ item.scoreNumerical }}
            </div>
            <div class="pv">
              <span class="bestmove">
                {{ item.pvSans[0] }}
              </span>
              {{ item.pvSans.slice(1).join(" ") }}
            </div>
            <div class="depth">
              {{ item.depth }}
            </div>                        
          </div>
          <!--<pre>{{ JSON.stringify(pvInfo, null, 2) }}</pre>-->
        </div>
      </div>  
      <div class="showfen">
        <VueCustomTooltip label="position fen / press ENTER to set" position="is-top">
        <input v-on:keyup.enter="doSetfen" class="feninput" type="text" ref="feninput" />
        </VueCustomTooltip>
        <VueCustomTooltip label="set position fen" position="is-top">
        <button v-on:click="doSetfen">Set</button>
        </VueCustomTooltip>
      </div>    
    </div>
  </div>
</template>

<script>
import { Game, UciEngineBrowser, INFINITE } from "../../dist/index.js"
import { Chessground } from "@publishvue/chessground"
import "@publishvue/chessground/assets/maple.css"

import Perscombo from "./components/Perscombo.vue"

import VueCustomTooltip from "@adamdehaven/vue-custom-tooltip"

const variants = [
  {display: "Standard", value: "chess"},
  {display: "Antichess", value: "antichess"},
  {display: "Atomic", value: "atomic"},
  //{display: "Crazyhouse", value: "crazyhouse"},  
  {display: "Horde", value: "horde"},
  {display: "King of the Hill", value: "kingofthehill"},
  {display: "Racing Kings", value: "racingkings"},
  {display: "Three Check", value: "3check"},  
]

const multipvs = [1,2,3,4,5,6,7,8,9,10].map(i => ({
  display: `${i}`, value: `mpv${i}`
}))

export default {
  name: 'App',  
  components: {
    Perscombo,    
    VueCustomTooltip
  },
  methods: {    
    stepRating(san, dir){
      const node = this.game.nodeForSan(san, true)
      if(!node.weights.length) node.weights = [0, 0]
      let weight = node.weights[0] + dir
      if(weight > 10) weight = 0
      if(weight < 0) weight = 10
      node.weights[0] = weight
      this.store()
    },
    del(){
      this.game.del()
      this.setUp()
    },
    tobegin(){
      this.game.toBegin()
      this.setUp()
    },
    back(){
      this.game.back()
      this.setUp()
    },
    forward(){
      this.game.forward()
      this.setUp()
    },
    toend(){
      this.game.toEnd()
      this.setUp()
    },
    doSetfen(){
      this.game.setVariant(this.variant, this.$refs.feninput.value)
      this.setUp()
    },
    variantChanged(){            
      this.variant = this.$refs.variant.value
      this.game.setVariant(this.variant)
      this.setUp()
    },
    doFlip(){
      this.flip = !this.flip
      this.board.set({
        orientation: this.flip ? "black" : "white"
      })
    },
    go(){        
      this.multipv = parseInt(this.$refs.setmultipv.value.substring(3))    
      let variant = this.variant            
      const payload = {
        depth: INFINITE,
        fen: this.game.reportFen(),
        multipv: this.multipv,
        variant,
      }      
      this.engine.go(payload)
    },
    stop(){
      this.engine.stop()
    },
    movePlayed(orig, dest){
      const baseUci = `${orig}${dest}`      
      const legals = this.game.pos.legalsForUci(baseUci)      
      if(legals.length === 1){
        this.game.playUci(legals[0])        
      }
      this.setUp()
    },
    reset(){                  
      this.variantChanged()
    },
    setFen(fen){
      this.board.set({
        fen
      })
    },
    store(){
      const gameStr = this.game.stringify()
      localStorage.setItem("storedgamestr", gameStr)
    },
    setUp(){
      const fen = this.game.reportFen()
      this.setFen(fen)      
      this.$refs.feninput.value = fen
      this.pvInfo = []
      this.board.set({lastMove: undefined})
      if(!this.game.current.isRoot){
        const uci = this.game.current.genUci
        this.board.set({lastMove: [uci.substring(0, 2), uci.substring(2, 4)]})
      }  
      this.store()
    },
    playSan(san){            
      this.game.playSan(san)      
      this.setUp()
    },
    clickSan(ev) {
      const san = ev.target.getAttribute("san")
      this.playSan(san)
    },
    clickNode(ev) {
      const id = ev.target.getAttribute("id")
      this.game.selectId(id)
      this.setUp()
    },
    sendAnalysisInfo(info){
      this.info = JSON.parse(JSON.stringify(info))
      this.pvInfo = []
      const highest = this.info.highestCompletedDepth
      if(highest){
        this.pvInfo = highest.pvItems.slice(1)
      }
    }
  },
  data(){
    const game = Game().parse(localStorage.getItem("storedgamestr"))
    return {
      game,      
      board: null,
      fen: "",
      engine: null,
      info: {},
      pvInfo: [],
      flip: false,
      variants,
      multipvs,
      variant: "chess",
      multipv: 1,
    }
  },  
  mounted(){    
    this.board = Chessground(this.$refs.board, {      
    })
    this.board.set({
      movable: { events: { after: (orig, dest) => this.movePlayed(orig, dest) } },
    })
    this.setUp()
    this.engine = new UciEngineBrowser(
      "../../binweb/stockfish.wasm.js",
      this.sendAnalysisInfo.bind(this)
    ).spawn()    
  },  
}
</script>

<style>
  .boardcont {
    display: flex;
    align-items: center;
  }
  .legalsans {
    margin-left: 10px;
    padding: 5px;
    background-color: #ffe;
    max-height: 460px;
    overflow-y: scroll;    
    width: 140px;
  }
  .legalsan {
    padding: 3px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    color: #007;
  }
  .richlegalsan {
    padding: 3px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    color: #007;
    width: 70px;
    border: solid 2px transparent;
  }
  .richlegalsan.forcedwin{
    background-color: #afa;
  }
  .richlegalsan.winning{
    background-color: #ada;
  }
  .richlegalsan.exclam{
    background-color: #9b9;
  }
  .richlegalsan.good{
    background-color: #7a7;    
  }
  .richlegalsan.promising{
    background-color: #77f;
    color: #fff;
  }
  .richlegalsan.stable{
    background-color: #33d;
    color: #fff;
  }
  .richlegalsan.experimental{
    background-color: #007;
    color: #fff;
  }
  .richlegalsan.bad{
    background-color: #700;
    color: #fff;
  }
  .richlegalsan.losing{
    background-color: #a77;
    color: #fff;
  }
  .richlegalsan.forcedloss{
    background-color: #f00;
    color: #fff;
  }
  .richlegalsan.mainline{
    border: solid 2px #7e7;
  }
  .richlegalsan.variation{
    border: solid 2px #aaf;
  }
  .vertcont {
    display: flex;
    flex-direction: column;
    background-color: #eee;    
    padding: 5px;
  }
  .controls {
    padding: 3px;
    background-color: #ffe;    
    margin-bottom: 5px;
  }
  .app {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5px;
    border: solid 1px;
  }
  .showfen {    
    margin-top: 5px;        
    font-size: 10px;
  }
  .feninput {
    padding: 1px;
    padding-left: 5px;
    font-family: monospace;
    width: 470px;
  }
  .analysis {
    width: 380px;
    margin-left: 5px;
    height: 480px;
    overflow-y: scroll;
    padding-left: 10px;
    border: solid 1px;
  }
  .controls button {
    margin-right: 5px;
  }
  .pvitem {
    display: flex;
    align-items: center;
    padding: 5px;
    margin-top: 5px;
    font-size: 20px;
    font-family: monospace;
  }
  .pvitem .score {
    padding: 5px;
    width: 85px;
    color: #007;
    font-weight: bold;
    text-align: center;
    font-size: 28px;
  }
  .pvitem .pv {
    padding: 5px;
    color: #070;    
    min-width: 200px;
    max-width: 200px;
    white-space: nowrap;
    overflow-x: hidden;
  }
  .pvitem .depth {
    padding: 5px;
    color: #700;
    font-size: 18px;
    margin-left: 15px;    
  }
  .multipv {
    font-size: 15px;
    color: #077;
    font-style: italic;
    width: 20px;
  }
  .pvitem .bestmove {
    font-size: 30px;
    font-weight: bold;    
  }
  .controls select {
    margin-right: 5px;
  }
  .legalsan.selected{
    background-color: #afa;
  }
  .sancont{
    display:flex;
    align-items: center;
    margin: 1px;
  }
  .sancont button{
    font-size: 10px;
    padding: 1px;
    margin: 1px;
    height: 16px;    
  }
  .sancont .weight{
    color: #00d;    
    margin-left: 2px;
    margin-right: 2px;
    font-family: monospace;
  }
</style>
