export declare const MATE_SCORE = 10000;
export declare const PV_MAX_LENGTH = 5;
export declare const INFINITE = -1;
export declare type Commands = string | Array<string>;
import { Variant, Fen, Uci, San } from "./chessops";
export declare type GoPayload = {
    variant?: Variant;
    fen?: Fen;
    depth?: number;
    multipv?: number;
    bestmoveCallback?: (info: AnalysisInfo) => void;
    pvMaxLength?: number;
};
export declare type ScoreType = "cp" | "mate";
export declare type ScoreValue = Number;
export declare type ScoreNumerical = Number;
export declare type PvItem = {
    multipv: number;
    parsedPv: string;
    pvUcis: Uci[];
    pvSans: San[];
    scoreType: ScoreType;
    scoreValue: Number;
    scoreNumerical: ScoreNumerical;
    depth: number;
};
export declare class DepthItem {
    pvItems: PvItem[];
    depth: number;
    multipv: number;
    constructor(propsOpt?: any);
    fromProps(propsOpt: any): this;
    serialize(): any;
    stringify(): string;
    parse(json: string): this;
    get completed(): boolean;
}
export declare type EngineState = "preparing" | "ready" | "stopping" | "running";
export declare type AnalysisInfo = {
    state: EngineState;
    variant: Variant;
    analyzedFen: Fen;
    multipv: number;
    depthItems: DepthItem[];
    highestCompletedDepth: DepthItem | undefined;
    infoString: string;
    currentMultipv: number;
    currentDepth: number;
    currentScoreType: ScoreType;
    currentScoreValue: number;
    currentScoreNumerical: ScoreNumerical;
    pvMaxLength: number;
    bestmove: string;
    ponder: string;
};
export declare type SendAnalysisInfo = (info: AnalysisInfo) => void;
export declare abstract class UciEngine {
    abstract spawn(): UciEngine;
    abstract kill(): void;
    abstract writeCommand(command: string): void;
    abstract get me(): string;
    sendAnalysisInfo: SendAnalysisInfo;
    goPayload: GoPayload | undefined;
    deferredPayload: GoPayload | undefined;
    options: {
        [name: string]: string[];
    };
    shouldGo: boolean;
    analysisInfo: AnalysisInfo;
    compileAndSendAnalysisInfo(): void;
    constructor(sendAnalysisInfo: SendAnalysisInfo);
    checkShouldGo(): void;
    processLine(line: string): void;
    processStdout(chunk: string): void;
    processStderr(err: string): void;
    processClose(message: string): void;
    issueCommand(commands: Commands): void;
    setoption(name: string, value: string | Number): void;
    position(fen?: Fen): void;
    go(payload: GoPayload): void;
    stop(): void;
}
export declare class UciEngineNode extends UciEngine {
    executable: string;
    process: any;
    constructor(executable: string, sendAnalysisInfo: SendAnalysisInfo);
    spawn(): UciEngine;
    kill(): void;
    get me(): string;
    writeCommand(command: string): void;
}
export declare class UciEngineBrowser extends UciEngine {
    executable: string;
    process: any;
    constructor(executable: string, sendAnalysisInfo: SendAnalysisInfo);
    spawn(): UciEngine;
    kill(): void;
    get me(): string;
    writeCommand(command: string): void;
}
