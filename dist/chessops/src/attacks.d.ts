/**
 * Compute attacks and rays.
 *
 * These are low-level functions that can be used to implement chess rules.
 *
 * Implementation notes: Sliding attacks are computed using
 * [hyperbola quintessence](https://www.chessprogramming.org/Hyperbola_Quintessence).
 * Magic bitboards would deliver faster lookups, but also require
 * initializing considerably larger attack tables. On the web, initialization
 * time is important, so the chosen method may strike a better balance.
 *
 * @packageDocumentation
 */
import { Square, Piece, Color } from './types';
import { SquareSet } from './squareSet';
/**
 * Gets squares attacked or defended by a king on `square`.
 */
export declare function kingAttacks(square: Square): SquareSet;
/**
 * Gets squares attacked or defended by a knight on `square`.
 */
export declare function knightAttacks(square: Square): SquareSet;
/**
 * Gets squares attacked or defended by a pawn of the given `color`
 * on `square`.
 */
export declare function pawnAttacks(color: Color, square: Square): SquareSet;
/**
 * Gets squares attacked or defended by a bishop on `square`, given `occupied`
 * squares.
 */
export declare function bishopAttacks(square: Square, occupied: SquareSet): SquareSet;
/**
 * Gets squares attacked or defended by a rook on `square`, given `occupied`
 * squares.
 */
export declare function rookAttacks(square: Square, occupied: SquareSet): SquareSet;
/**
 * Gets squares attacked or defended by a queen on `square`, given `occupied`
 * squares.
 */
export declare function queenAttacks(square: Square, occupied: SquareSet): SquareSet;
/**
 * Gets squares attacked or defended by a `piece` on `square`, given
 * `occupied` squares.
 */
export declare function attacks(piece: Piece, square: Square, occupied: SquareSet): SquareSet;
/**
 * Gets all squares of the rank, file or diagonal with the two squares
 * `a` and `b`, or an empty set if they are not aligned.
 */
export declare function ray(a: Square, b: Square): SquareSet;
/**
 * Gets all squares between `a` and `b` (bounds not included), or an empty set
 * if they are not on the same rank, file or diagonal.
 */
export declare function between(a: Square, b: Square): SquareSet;
