export declare const Radians2Degrees: number;
export declare class LV2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    toString(): string;
    copy(): LV2;
    setAs(o: LV2): void;
    setValues(x: number, y: number): void;
    add(o: LV2): LV2;
    iadd(o: LV2): void;
    sub(o: LV2): LV2;
    isub(o: LV2): void;
    scale(s: number): LV2;
    scaleXY(sx: number, sy: number): LV2;
    iscale(s: number): void;
    div(s: number): LV2;
    idiv(s: number): void;
    dot(o: LV2): number;
    proj(onto: LV2): {
        scalar: number;
        projection: LV2;
    };
    dist(o: LV2): number;
    mag(): number;
    round(): LV2;
    floor(): LV2;
    iround(): void;
    ifloor(): void;
    unit(): LV2;
    iunit(): void;
    interpolateTo(target: LV2, time: number): LV2;
    getAngle(): number;
    static fromAngle(angle: number): LV2;
    toJSON(): {
        x: number;
        y: number;
    };
    static fromJSON(obj: any): LV2;
}
export declare class LV3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    toString(): string;
    copy(): LV3;
    setAs(o: LV3): void;
    setValues(x: number, y: number, z: number): void;
    add(o: LV3): LV3;
    iadd(o: LV3): void;
    sub(o: LV3): LV3;
    isub(o: LV3): void;
    scale(s: number): LV3;
    iscale(s: number): void;
    div(s: number): LV3;
    idiv(s: number): void;
    dot(o: LV3): number;
    proj(onto: LV3): {
        scalar: number;
        projection: LV3;
    };
    cross(o: LV3): LV3;
    icross(o: LV3): void;
    dist(o: LV3): number;
    mag(): number;
    round(): LV3;
    floor(): LV3;
    iround(): void;
    ifloor(): void;
    unit(): LV3;
    iunit(): void;
    toJSON(): {
        x: number;
        y: number;
        z: number;
    };
    static fromJSON(obj: LV3): LV3;
}
export declare class LMat3 {
    arr: number[];
    constructor(inp?: number[]);
    toString(): string;
    copy(): LMat3;
    at(row: number, col: number): number;
    set(row: number, col: number, val: number): void;
    itranspose(): void;
    transpose(): LMat3;
    imult(m: LMat3): void;
    mult(m: LMat3): LMat3;
    multLV2(p: LV2): LV2;
    multLV3(p: LV3): LV3;
    inv(): LMat3;
    static zero(): LMat3;
    static identity(): LMat3;
    static scale(scalar: number): LMat3;
    static scaleXY(xs: number, ys: number): LMat3;
    static trans(x: number, y: number): LMat3;
    static rotate(angle: number): LMat3;
    static rotateX(angle: number): LMat3;
    static rotateY(angle: number): LMat3;
    static rotateZ(angle: number): LMat3;
    static buildMatrix(matrices?: LMat3[]): LMat3;
}
export declare class LMat4 {
    arr: number[];
    constructor(inp?: number[]);
    toString(): string;
    copy(): LMat4;
    at(row: number, col: number): number;
    set(row: number, col: number, val: number): void;
    itranspose(): void;
    transpose(): LMat4;
    imult(m: LMat4): void;
    mult(m: LMat4): LMat4;
    multLV3(p: LV3, w?: number): LV3;
    inv(): LMat4;
    static scale(scalar: number): LMat4;
    static scaleXYZ(xs: number, ys: number, zs: number): LMat4;
    static trans(x: number, y: number, z: number): LMat4;
    static rotateX(angle: number): LMat4;
    static rotateY(angle: number): LMat4;
    static rotateZ(angle: number): LMat4;
    static zero(): LMat4;
    static identity(): LMat4;
    static buildMatrix(mats?: LMat4[]): LMat4;
}
