<template>
  <select ref="perscombo" v-on:change="perscombochanged">
    <option :key="option.value" v-for="option in options" :selected="option.value == value" :value="option.value">
      {{ option.display }}
    </option>
  </select>
</template>

<script>
  import { setLocal, getLocal } from "@publishvue/vueutils"
  export default {
    name: "Perscombo",
    data(){
      return {
        value: getLocal(this.id, "")
      }
    },
    props: {      
      id: {
        type: String,
        required: true,
      },
      options: {
        type: Array,
        required: true,
      }
    },
    methods: {
      getValue(){
        const stored = getLocal(this.id, "")
        const value = stored
        this.setValue(value)
        return value
      },
      setValue(value){
        setLocal(this.id, value)
        this.value = value        
      },
      perscombochanged(){
        const value = this.$refs.perscombo.value

        this.setValue(value)

        this.$emit("perscombochanged", {
          id: this.id,
          value: value
        })
      }
    }
  }
</script>

<style scoped>
  
</style>