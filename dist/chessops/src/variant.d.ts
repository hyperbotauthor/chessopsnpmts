import { Result } from '@badrap/result';
import { Square, Outcome, Color, Piece, Rules } from './types';
import { SquareSet } from './squareSet';
import { Setup } from './setup';
import { PositionError, Position, IllegalSetup, Context, Castles, Chess } from './chess';
export { Position, PositionError, IllegalSetup, Context, Chess, Castles };
export declare class Crazyhouse extends Chess {
    protected constructor();
    static default(): Crazyhouse;
    static fromSetup(setup: Setup): Result<Crazyhouse, PositionError>;
    protected validate(): Result<undefined, PositionError>;
    clone(): Crazyhouse;
    hasInsufficientMaterial(color: Color): boolean;
    dropDests(ctx?: Context): SquareSet;
}
export declare class Atomic extends Chess {
    protected constructor();
    static default(): Atomic;
    static fromSetup(setup: Setup): Result<Atomic, PositionError>;
    clone(): Atomic;
    protected validate(): Result<undefined, PositionError>;
    protected kingAttackers(square: Square, attacker: Color, occupied: SquareSet): SquareSet;
    protected playCaptureAt(square: Square, captured: Piece): void;
    hasInsufficientMaterial(color: Color): boolean;
    dests(square: Square, ctx?: Context): SquareSet;
    isVariantEnd(): boolean;
    variantOutcome(_ctx?: Context): Outcome | undefined;
}
export declare class Antichess extends Chess {
    protected constructor();
    static default(): Antichess;
    static fromSetup(setup: Setup): Result<Antichess, PositionError>;
    clone(): Antichess;
    protected validate(): Result<undefined, PositionError>;
    protected kingAttackers(_square: Square, _attacker: Color, _occupied: SquareSet): SquareSet;
    ctx(): Context;
    dests(square: Square, ctx?: Context): SquareSet;
    hasInsufficientMaterial(color: Color): boolean;
    isVariantEnd(): boolean;
    variantOutcome(ctx?: Context): Outcome | undefined;
}
export declare class KingOfTheHill extends Chess {
    protected constructor();
    static default(): KingOfTheHill;
    static fromSetup(setup: Setup): Result<KingOfTheHill, PositionError>;
    clone(): KingOfTheHill;
    hasInsufficientMaterial(_color: Color): boolean;
    isVariantEnd(): boolean;
    variantOutcome(_ctx?: Context): Outcome | undefined;
}
export declare class ThreeCheck extends Chess {
    protected constructor();
    static default(): ThreeCheck;
    static fromSetup(setup: Setup): Result<ThreeCheck, PositionError>;
    clone(): ThreeCheck;
    hasInsufficientMaterial(color: Color): boolean;
    isVariantEnd(): boolean;
    variantOutcome(_ctx?: Context): Outcome | undefined;
}
export declare class RacingKings extends Chess {
    protected constructor();
    static default(): RacingKings;
    static fromSetup(setup: Setup): Result<RacingKings, PositionError>;
    protected validate(): Result<undefined, PositionError>;
    clone(): RacingKings;
    dests(square: Square, ctx?: Context): SquareSet;
    hasInsufficientMaterial(_color: Color): boolean;
    isVariantEnd(): boolean;
    variantOutcome(ctx?: Context): Outcome | undefined;
}
export declare class Horde extends Chess {
    protected constructor();
    static default(): Horde;
    static fromSetup(setup: Setup): Result<Horde, PositionError>;
    protected validate(): Result<undefined, PositionError>;
    clone(): Horde;
    hasInsufficientMaterial(_color: Color): boolean;
    isVariantEnd(): boolean;
    variantOutcome(_ctx?: Context): Outcome | undefined;
}
export declare function defaultPosition(rules: Rules): Position;
export declare function setupPosition(rules: Rules, setup: Setup): Result<Position, PositionError>;
