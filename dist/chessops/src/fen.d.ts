import { Result } from '@badrap/result';
import { Piece } from './types';
import { SquareSet } from './squareSet';
import { Board } from './board';
import { Setup, MaterialSide, Material, RemainingChecks } from './setup';
export declare const INITIAL_BOARD_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
export declare const INITIAL_EPD: string;
export declare const INITIAL_FEN: string;
export declare const EMPTY_BOARD_FEN = "8/8/8/8/8/8/8/8";
export declare const EMPTY_EPD: string;
export declare const EMPTY_FEN: string;
export declare enum InvalidFen {
    Fen = "ERR_FEN",
    Board = "ERR_BOARD",
    Pockets = "ERR_POCKETS",
    Turn = "ERR_TURN",
    Castling = "ERR_CASTLING",
    EpSquare = "ERR_EP_SQUARE",
    RemainingChecks = "ERR_REMAINING_CHECKS",
    Halfmoves = "ERR_HALFMOVES",
    Fullmoves = "ERR_FULLMOVES"
}
export declare class FenError extends Error {
}
export declare function parseBoardFen(boardPart: string): Result<Board, FenError>;
export declare function parsePockets(pocketPart: string): Result<Material, FenError>;
export declare function parseCastlingFen(board: Board, castlingPart: string): Result<SquareSet, FenError>;
export declare function parseRemainingChecks(part: string): Result<RemainingChecks, FenError>;
export declare function parseFen(fen: string): Result<Setup, FenError>;
export interface FenOpts {
    promoted?: boolean;
    shredder?: boolean;
    epd?: boolean;
}
export declare function parsePiece(str: string): Piece | undefined;
export declare function makePiece(piece: Piece, opts?: FenOpts): string;
export declare function makeBoardFen(board: Board, opts?: FenOpts): string;
export declare function makePocket(material: MaterialSide): string;
export declare function makePockets(pocket: Material): string;
export declare function makeCastlingFen(board: Board, unmovedRooks: SquareSet, opts?: FenOpts): string;
export declare function makeRemainingChecks(checks: RemainingChecks): string;
export declare function makeFen(setup: Setup, opts?: FenOpts): string;
