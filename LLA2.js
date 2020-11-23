export var Radians2Degrees = 180 / Math.PI;
var LV2 = /** @class */ (function () {
    function LV2(x, y) {
        this.x = x;
        this.y = y;
    }
    LV2.prototype.toString = function () {
        return "[" + this.x + ", " + this.y + "]";
    };
    LV2.prototype.copy = function () {
        return new LV2(this.x, this.y);
    };
    LV2.prototype.setAs = function (o) {
        this.x = o.x;
        this.y = o.y;
    };
    LV2.prototype.setValues = function (x, y) {
        this.x = x;
        this.y = y;
    };
    LV2.prototype.add = function (o) {
        return new LV2(this.x + o.x, this.y + o.y);
    };
    LV2.prototype.iadd = function (o) {
        this.x += o.x;
        this.y += o.y;
    };
    LV2.prototype.sub = function (o) {
        return new LV2(this.x - o.x, this.y - o.y);
    };
    LV2.prototype.isub = function (o) {
        this.x -= o.x;
        this.y -= o.y;
    };
    LV2.prototype.scale = function (s) {
        return new LV2(this.x * s, this.y * s);
    };
    LV2.prototype.scaleXY = function (sx, sy) {
        return new LV2(this.x * sx, this.y * sy);
    };
    LV2.prototype.iscale = function (s) {
        this.x *= s;
        this.y *= s;
    };
    LV2.prototype.div = function (s) {
        return new LV2(this.x / s, this.y / s);
    };
    LV2.prototype.idiv = function (s) {
        this.x /= s;
        this.y /= s;
    };
    // o: { x: number, y: number }
    // return: number
    LV2.prototype.dot = function (o) {
        return this.x * o.x + this.y * o.y;
    };
    // o: { x: number, y: number }
    // return: number
    LV2.prototype.dist = function (o) {
        var dx = this.x - o.x;
        var dy = this.y - o.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    // return: number
    LV2.prototype.mag = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    // return: LV2
    LV2.prototype.round = function () {
        return new LV2(Math.round(this.x), Math.round(this.y));
    };
    // return: LV2
    LV2.prototype.floor = function () {
        return new LV2(Math.floor(this.x), Math.floor(this.y));
    };
    LV2.prototype.iround = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    };
    LV2.prototype.ifloor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    };
    // return: LV2
    LV2.prototype.unit = function () {
        var m = Math.sqrt(this.x * this.x + this.y * this.y);
        return new LV2(this.x / m, this.y / m);
    };
    LV2.prototype.iunit = function () {
        var m = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x /= m;
        this.y /= m;
    };
    // target: LV2
    // time: number [0-1]
    // return: LV2
    LV2.prototype.interpolateTo = function (target, time) {
        var to = target.copy();
        to.isub(this);
        to.iscale(time);
        to.iadd(this);
        return to;
    };
    // return: number
    LV2.prototype.getAngle = function () {
        var angle = CONSTANTS.rad2deg * Math.atan(this.y / this.x);
        if (this.x < 0.0)
            angle += 180.0;
        else if (y < 0.0)
            angle += 360.0;
        return angle;
    };
    // angle: number
    // return: LV2
    LV2.fromAngle = function (angle) {
        var rv = new LV2(0, 0);
        angle /= CONSTANTS.rad2deg;
        rv.x = Math.cos(angle);
        rv.y = Math.sin(angle);
        return rv;
    };
    return LV2;
}());
export { LV2 };
var LV3 = /** @class */ (function () {
    // x: number
    // y: number
    // z: number
    function LV3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // return: string
    LV3.prototype.toString = function () {
        return '[' + this.x + ',' + this.y + ',' + this.z + ']';
    };
    // return: LV3
    LV3.prototype.copy = function () {
        return new LV3(this.x, this.y, this.z);
    };
    // o: LV3
    LV3.prototype.setAs = function (o) {
        this.x = o.x;
        this.y = o.y;
        this.z = o.z;
    };
    // x: number
    // y: number
    // z: number
    LV3.prototype.setValues = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };
    // o: LV3
    // return: LV3
    LV3.prototype.add = function (o) {
        return new LV3(this.x + o.x, this.y + o.y, this.z + o.z);
    };
    // o: LV3
    LV3.prototype.iadd = function (o) {
        this.x += o.x;
        this.y += o.y;
        this.z += o.z;
    };
    // o: LV3
    // return: LV3
    LV3.prototype.sub = function (o) {
        return new LV3(this.x - o.x, this.y - o.y, this.z - o.z);
    };
    // o: LV3
    LV3.prototype.isub = function (o) {
        this.x -= o.x;
        this.y -= o.y;
        this.z -= o.z;
    };
    // s: number
    // return: LV3
    LV3.prototype.scale = function (s) {
        return new LV3(this.x * s, this.y * s, this.z * s);
    };
    // s: number
    // return: LV3
    LV3.prototype.iscale = function (s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    };
    // s: number
    // return: LV3
    LV3.prototype.div = function (s) {
        return new LV3(this.x / s, this.y / s, this.z / s);
    };
    // s: number
    LV3.prototype.idiv = function (s) {
        this.x /= s;
        this.y /= s;
        this.z /= s;
    };
    // o: LV3
    // return: number
    LV3.prototype.dot = function (o) {
        return this.x * o.x + this.y * o.y + this.z * o.z;
    };
    // o: LV3
    // return: LV3
    LV3.prototype.cross = function (o) {
        return new LV3(this.y * o.z - this.z * o.y, this.z * o.x - this.x * o.z, this.x * o.y - this.y * o.x);
    };
    // o: LV3
    LV3.prototype.icross = function (o) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        this.x = y * o.z - z * o.y;
        this.y = z * o.x - x * o.z;
        this.z = x * o.y - y * o.x;
    };
    // o: LV3
    // return: number
    LV3.prototype.dist = function (o) {
        var dx = this.x - o.x;
        var dy = this.y - o.y;
        var dz = this.z - o.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };
    // return: number
    LV3.prototype.mag = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    // return: LV3
    LV3.prototype.round = function () {
        return new LV3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
    };
    // return: LV3
    LV3.prototype.floor = function () {
        return new LV3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
    };
    LV3.prototype.iround = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
    };
    LV3.prototype.ifloor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
    };
    // return: LV3
    LV3.prototype.unit = function () {
        var m = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return new LV3(this.x / m, this.y / m, this.z / m);
    };
    LV3.prototype.iunit = function () {
        var m = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        this.x /= m;
        this.y /= m;
        this.z /= m;
    };
    return LV3;
}());
export { LV3 };
var LMat3 = /** @class */ (function () {
    // inp?: number[9] 
    function LMat3(inp) {
        if (!inp)
            this.arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        else
            this.arr = inp;
    }
    // return: string
    LMat3.prototype.toString = function () {
        return '|' + this.arr[0] + ',' + this.arr[1] + ',' + this.arr[2] + '|\n' +
            '|' + this.arr[3] + ',' + this.arr[4] + ',' + this.arr[5] + '|\n' +
            '|' + this.arr[6] + ',' + this.arr[7] + ',' + this.arr[8] + '|\n';
    };
    // return: LMat3
    LMat3.prototype.copy = function () {
        return new LMat3(this.arr.slice());
    };
    /**
     * @param {number} row
     * @param {number} col
     * @returns {number}
     */
    LMat3.prototype.at = function (row, col) {
        return this.arr[row * 3 + col];
    };
    /**
     * @param {number} row
     * @param {number} col
     * @param {number} val
     * @returns {number}
     */
    LMat3.prototype.set = function (row, col, val) {
        this.arr[row * 3 + col] = val;
    };
    LMat3.prototype.itranspose = function () {
        this.arr = [
            this.arr[0], this.arr[3], this.arr[6],
            this.arr[1], this.arr[4], this.arr[7],
            this.arr[2], this.arr[5], this.arr[8]
        ];
    };
    // return: LMat3
    LMat3.prototype.transpose = function () {
        return new LMat3([
            this.arr[0], this.arr[3], this.arr[6],
            this.arr[1], this.arr[4], this.arr[7],
            this.arr[2], this.arr[5], this.arr[8]
        ]);
    };
    // m: LMat3
    LMat3.prototype.imult = function (m) {
        this.arr = [
            this.arr[0] * m.arr[0] + this.arr[1] * m.arr[3] + this.arr[2] * m.arr[6],
            this.arr[0] * m.arr[1] + this.arr[1] * m.arr[4] + this.arr[2] * m.arr[7],
            this.arr[0] * m.arr[2] + this.arr[1] * m.arr[5] + this.arr[2] * m.arr[8],
            this.arr[3] * m.arr[0] + this.arr[4] * m.arr[3] + this.arr[5] * m.arr[6],
            this.arr[3] * m.arr[1] + this.arr[4] * m.arr[4] + this.arr[5] * m.arr[7],
            this.arr[3] * m.arr[2] + this.arr[4] * m.arr[5] + this.arr[5] * m.arr[8],
            this.arr[6] * m.arr[0] + this.arr[7] * m.arr[3] + this.arr[8] * m.arr[6],
            this.arr[6] * m.arr[1] + this.arr[7] * m.arr[4] + this.arr[8] * m.arr[7],
            this.arr[6] * m.arr[2] + this.arr[7] * m.arr[5] + this.arr[8] * m.arr[8],
        ];
    };
    // m: LMat3
    // return: LMat3
    LMat3.prototype.mult = function (m) {
        return new LMat3([
            this.arr[0] * m.arr[0] + this.arr[1] * m.arr[3] + this.arr[2] * m.arr[6],
            this.arr[0] * m.arr[1] + this.arr[1] * m.arr[4] + this.arr[2] * m.arr[7],
            this.arr[0] * m.arr[2] + this.arr[1] * m.arr[5] + this.arr[2] * m.arr[8],
            this.arr[3] * m.arr[0] + this.arr[4] * m.arr[3] + this.arr[5] * m.arr[6],
            this.arr[3] * m.arr[1] + this.arr[4] * m.arr[4] + this.arr[5] * m.arr[7],
            this.arr[3] * m.arr[2] + this.arr[4] * m.arr[5] + this.arr[5] * m.arr[8],
            this.arr[6] * m.arr[0] + this.arr[7] * m.arr[3] + this.arr[8] * m.arr[6],
            this.arr[6] * m.arr[1] + this.arr[7] * m.arr[4] + this.arr[8] * m.arr[7],
            this.arr[6] * m.arr[2] + this.arr[7] * m.arr[5] + this.arr[8] * m.arr[8],
        ]);
    };
    // p: LV2
    // return: LV2
    LMat3.prototype.multLV2 = function (p) {
        return new LV2(p.x * this.arr[0] + p.y * this.arr[1] + 1 * this.arr[2], p.x * this.arr[3] + p.y * this.arr[4] + 1 * this.arr[5]);
    };
    // p: LV3
    // return: LV3
    LMat3.prototype.multLV3 = function (p) {
        return new LV3(p.x * this.arr[0] + p.y * this.arr[1] + p.z * this.arr[2], p.x * this.arr[3] + p.y * this.arr[4] + p.z * this.arr[5], p.x * this.arr[6] + p.y * this.arr[7] + p.z * this.arr[8]);
    };
    /**
     * @returns {LMat3}
     */
    LMat3.prototype.inv = function () {
        return invertSquareMatrix(this);
    };
    // return: LMat3
    LMat3.zero = function () {
        return new LMat3();
    };
    // return: LMat3
    LMat3.identity = function () {
        return new LMat3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    };
    // scalar: number
    // return: LMat3
    LMat3.scale = function (scalar) {
        return new LMat3([scalar, 0, 0, 0, scalar, 0, 0, 0, 1]);
    };
    // x: number
    // y: number
    // return: LMat3
    LMat3.trans = function (x, y) {
        return new LMat3([1, 0, x, 0, 1, y, 0, 0, 1]);
    };
    // angle: number
    // return: LMat3
    LMat3.rotate = function (angle) {
        angle *= 0.0174533;
        var cosine = Math.cos(angle);
        var sinus = Math.sin(angle);
        return new LMat3([cosine, -sinus, 0, sinus, cosine, 0, 0, 0, 1]);
    };
    // angle: number
    // return: LMat3
    LMat3.rotateX = function (angle) {
        angle *= 0.0174533;
        var cosine = Math.cos(angle);
        var sinus = Math.sin(angle);
        return new LMat3([1, 0, 0, 0, cosine, -sinus, 0, sinus, cosine]);
    };
    // angle: number
    // return: LMat3
    LMat3.rotateY = function (angle) {
        angle *= 0.0174533;
        var cosine = Math.cos(angle);
        var sinus = Math.sin(angle);
        return new LMat3([cosine, 0, sinus, 0, 1, 0, -sinus, 0, cosine]);
    };
    // angle: number
    // return: LMat3
    LMat3.rotateZ = function (angle) {
        angle *= 0.0174533;
        var cosine = Math.cos(angle);
        var sinus = Math.sin(angle);
        return new LMat3([cosine, -sinue, 0, sinus, cosine, 0, 0, 0, 1]);
    };
    /**
     * @param {Array<LMat3>} mats
     * @returns {LMat3}
     */
    LMat3.buildMatrix = function (mats) {
        if (mats === void 0) { mats = []; }
        return mats.reduce(function (p, c) { return p.mult(c); }, LMat3.identity());
    };
    return LMat3;
}());
export { LMat3 };
var LMat4 = /** @class */ (function () {
    // inp?: [number * 16]
    function LMat4(inp) {
        if (inp === undefined) {
            this.arr = [0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0];
        }
        else
            this.arr = inp;
    }
    // return: string
    LMat4.prototype.toString = function () {
        return '|' + this.arr[0] + ',' + this.arr[1] + ',' + this.arr[2] + ',' + this.arr[3] + '|\n' +
            '|' + this.arr[4] + ',' + this.arr[5] + ',' + this.arr[6] + ',' + this.arr[7] + '|\n' +
            '|' + this.arr[8] + ',' + this.arr[9] + ',' + this.arr[10] + ',' + this.arr[11] + '|\n' +
            '|' + this.arr[12] + ',' + this.arr[13] + ',' + this.arr[14] + ',' + this.arr[15] + '|\n';
    };
    // return: LMat4
    LMat4.prototype.copy = function () {
        return new LMat4(this.arr.slice());
    };
    /**
     * @param {number} row
     * @param {number} col
     * @returns {number}
     */
    LMat4.prototype.at = function (row, col) {
        return this.arr[row * 4 + col];
    };
    /**
     * @param {number} row
     * @param {number} col
     * @param {number} val
     * @returns {number}
     */
    LMat4.prototype.set = function (row, col, val) {
        this.arr[row * 4 + col] = val;
    };
    LMat4.prototype.itranspose = function () {
        this.arr = [
            this.arr[0], this.arr[4], this.arr[8], this.arr[12],
            this.arr[1], this.arr[5], this.arr[9], this.arr[13],
            this.arr[2], this.arr[6], this.arr[10], this.arr[14],
            this.arr[3], this.arr[7], this.arr[11], this.arr[15]
        ];
    };
    // return: LMat4
    LMat4.prototype.transpose = function () {
        return new LMat4([
            this.arr[0], this.arr[4], this.arr[8], this.arr[12],
            this.arr[1], this.arr[5], this.arr[9], this.arr[13],
            this.arr[2], this.arr[6], this.arr[10], this.arr[14],
            this.arr[3], this.arr[7], this.arr[11], this.arr[15]
        ]);
    };
    // m: LMat4
    LMat4.prototype.imult = function (m) {
        this.arr = [
            this.arr[0] * m.arr[0] + this.arr[1] * m.arr[4] + this.arr[2] * m.arr[8] + this.arr[3] * m.arr[12],
            this.arr[0] * m.arr[1] + this.arr[1] * m.arr[5] + this.arr[2] * m.arr[9] + this.arr[3] * m.arr[13],
            this.arr[0] * m.arr[2] + this.arr[1] * m.arr[6] + this.arr[2] * m.arr[10] + this.arr[3] * m.arr[14],
            this.arr[0] * m.arr[3] + this.arr[1] * m.arr[7] + this.arr[2] * m.arr[11] + this.arr[3] * m.arr[15],
            this.arr[4] * m.arr[0] + this.arr[5] * m.arr[4] + this.arr[6] * m.arr[8] + this.arr[7] * m.arr[12],
            this.arr[4] * m.arr[1] + this.arr[5] * m.arr[5] + this.arr[6] * m.arr[9] + this.arr[7] * m.arr[13],
            this.arr[4] * m.arr[2] + this.arr[5] * m.arr[6] + this.arr[6] * m.arr[10] + this.arr[7] * m.arr[14],
            this.arr[4] * m.arr[3] + this.arr[5] * m.arr[7] + this.arr[6] * m.arr[11] + this.arr[7] * m.arr[15],
            this.arr[8] * m.arr[0] + this.arr[9] * m.arr[4] + this.arr[10] * m.arr[8] + this.arr[11] * m.arr[12],
            this.arr[8] * m.arr[1] + this.arr[9] * m.arr[5] + this.arr[10] * m.arr[9] + this.arr[11] * m.arr[13],
            this.arr[8] * m.arr[2] + this.arr[9] * m.arr[6] + this.arr[10] * m.arr[10] + this.arr[11] * m.arr[14],
            this.arr[8] * m.arr[3] + this.arr[9] * m.arr[7] + this.arr[10] * m.arr[11] + this.arr[11] * m.arr[15],
            this.arr[12] * m.arr[0] + this.arr[13] * m.arr[4] + this.arr[14] * m.arr[8] + this.arr[15] * m.arr[12],
            this.arr[12] * m.arr[1] + this.arr[13] * m.arr[5] + this.arr[14] * m.arr[9] + this.arr[15] * m.arr[13],
            this.arr[12] * m.arr[2] + this.arr[13] * m.arr[6] + this.arr[14] * m.arr[10] + this.arr[15] * m.arr[14],
            this.arr[12] * m.arr[3] + this.arr[13] * m.arr[7] + this.arr[14] * m.arr[11] + this.arr[15] * m.arr[15]
        ];
    };
    // m: LMat4
    // return: LMat4
    LMat4.prototype.mult = function (m) {
        return new LMat4([
            this.arr[0] * m.arr[0] + this.arr[1] * m.arr[4] + this.arr[2] * m.arr[8] + this.arr[3] * m.arr[12],
            this.arr[0] * m.arr[1] + this.arr[1] * m.arr[5] + this.arr[2] * m.arr[9] + this.arr[3] * m.arr[13],
            this.arr[0] * m.arr[2] + this.arr[1] * m.arr[6] + this.arr[2] * m.arr[10] + this.arr[3] * m.arr[14],
            this.arr[0] * m.arr[3] + this.arr[1] * m.arr[7] + this.arr[2] * m.arr[11] + this.arr[3] * m.arr[15],
            this.arr[4] * m.arr[0] + this.arr[5] * m.arr[4] + this.arr[6] * m.arr[8] + this.arr[7] * m.arr[12],
            this.arr[4] * m.arr[1] + this.arr[5] * m.arr[5] + this.arr[6] * m.arr[9] + this.arr[7] * m.arr[13],
            this.arr[4] * m.arr[2] + this.arr[5] * m.arr[6] + this.arr[6] * m.arr[10] + this.arr[7] * m.arr[14],
            this.arr[4] * m.arr[3] + this.arr[5] * m.arr[7] + this.arr[6] * m.arr[11] + this.arr[7] * m.arr[15],
            this.arr[8] * m.arr[0] + this.arr[9] * m.arr[4] + this.arr[10] * m.arr[8] + this.arr[11] * m.arr[12],
            this.arr[8] * m.arr[1] + this.arr[9] * m.arr[5] + this.arr[10] * m.arr[9] + this.arr[11] * m.arr[13],
            this.arr[8] * m.arr[2] + this.arr[9] * m.arr[6] + this.arr[10] * m.arr[10] + this.arr[11] * m.arr[14],
            this.arr[8] * m.arr[3] + this.arr[9] * m.arr[7] + this.arr[10] * m.arr[11] + this.arr[11] * m.arr[15],
            this.arr[12] * m.arr[0] + this.arr[13] * m.arr[4] + this.arr[14] * m.arr[8] + this.arr[15] * m.arr[12],
            this.arr[12] * m.arr[1] + this.arr[13] * m.arr[5] + this.arr[14] * m.arr[9] + this.arr[15] * m.arr[13],
            this.arr[12] * m.arr[2] + this.arr[13] * m.arr[6] + this.arr[14] * m.arr[10] + this.arr[15] * m.arr[14],
            this.arr[12] * m.arr[3] + this.arr[13] * m.arr[7] + this.arr[14] * m.arr[11] + this.arr[15] * m.arr[15]
        ]);
    };
    // p: LV3
    // return: LV3
    LMat4.prototype.multLV3 = function (p, w) {
        if (w === void 0) { w = 1; }
        return new LV3(p.x * this.arr[0] + p.y * this.arr[1] + p.z * this.arr[2] + this.arr[3] * w, p.x * this.arr[4] + p.y * this.arr[5] + p.z * this.arr[6] + this.arr[7] * w, p.x * this.arr[8] + p.y * this.arr[9] + p.z * this.arr[10] + this.arr[11] * w);
    };
    /**
     * @returns {LMat4}
     */
    LMat4.prototype.inv = function () {
        return invertSquareMatrix(this);
    };
    // scalar: number
    // return: LMat4
    LMat4.scale = function (scalar) {
        return new LMat4([scalar, 0, 0, 0,
            0, scalar, 0, 0,
            0, 0, scalar, 0,
            0, 0, 0, 1]);
    };
    /**
     * @param {number} xs
     * @param {number} ys
     * @param {number} zs
     * @returns {LMat4}
     */
    LMat4.scaleXYZ = function (xs, ys, zs) {
        return new LMat4([xs, 0, 0, 0,
            0, ys, 0, 0,
            0, 0, zs, 0,
            0, 0, 0, 1]);
    };
    // x: number
    // y: number
    // z: number
    // return: LMat4
    LMat4.trans = function (x, y, z) {
        return new LMat4([1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1]);
    };
    // angle: number
    // return: LMat4
    LMat4.rotateX = function (angle) {
        angle *= 0.0174533;
        var cosine = Math.cos(angle);
        var sinus = Math.sin(angle);
        return new LMat4([1, 0, 0, 0,
            0, cosine, -sinus, 0,
            0, sinus, cosine, 0,
            0, 0, 0, 1
        ]);
    };
    // angle: number
    // return: LMat4
    LMat4.rotateY = function (angle) {
        angle *= 0.0174533;
        var cosine = Math.cos(angle);
        var sinus = Math.sin(angle);
        return new LMat4([cosine, 0, sinus, 0,
            0, 1, 0, 0,
            -sinus, 0, cosine, 0,
            0, 0, 0, 1
        ]);
    };
    // angle: number
    // return: LMat4
    LMat4.rotateZ = function (angle) {
        var rad = angle * 0.0174533;
        var cosine = Math.cos(rad);
        var sinus = Math.sin(rad);
        return new LMat4([cosine, -sinus, 0, 0,
            sinus, cosine, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    };
    // return: LMat4
    LMat4.zero = function () {
        return new LMat4();
    };
    // return: LMat4
    LMat4.identity = function () {
        return new LMat4([1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1]);
    };
    /**
     * @param {Array<LMat4>} mats
     * @returns {LMat4}
     */
    LMat4.buildMatrix = function (mats) {
        if (mats === void 0) { mats = []; }
        return mats.reduce(function (p, c) { return p.mult(c); }, LMat4.identity());
    };
    return LMat4;
}());
export { LMat4 };
// get inverse of a square matrix
/**
 * @todo improve this
 * @param {T extends LMat4 | LMat3} mat
 * @returns {T}
 */
function invertSquareMatrix(mat) {
    var arr = mat.arr;
    var N = Math.floor(Math.sqrt(arr.length));
    var getV = function (arr, r, c) {
        return arr[r * N + c];
    };
    var setV = function (arr, r, c, v) {
        arr[r * N + c] = v;
    };
    var makeArr = function () { return Array.from({ length: N * N }, function () { return 0; }); };
    /**
     * @desc Function to get cofactor of A[p][q] in temp[][]. n is current dimension of A[][]
     * @param {Array<number>} A
     * @param {number} p
     * @param {number} q
     * @param {number} n
     * @returns {Array<number>}
     */
    var getCofactor = function (A, p, q, n) {
        var i = 0;
        var j = 0;
        var temp = makeArr();
        // console.log('nnnnnn', n)
        // Looping for each element of the matrix 
        for (var row = 0; row < n; row++) {
            for (var col = 0; col < n; col++) {
                //  Copying into temporary matrix only those element 
                //  which are not in given row and column 
                if (row !== p && col !== q) {
                    var _ = getV(A, row, col);
                    // console.log('getting v', _, row, col, A)
                    setV(temp, i, j++, _);
                    // Row is filled, so increase row index and 
                    // reset col index 
                    if (j === n - 1) {
                        j = 0;
                        i++;
                    }
                }
            }
        }
        return temp;
    };
    /**
     * @desc Recursive function for finding determinant of matrix. n is current dimension of A[][].
     * @param {Array<number>} A
     * @param {number} n
     * @returns {number}
     */
    var getDeterminant = function (A, n) {
        var D = 0; // Initialize result 
        //  Base case : if matrix contains single element 
        if (n === 1)
            return getV(A, 0, 0);
        // let temp = makeArr(); // To store cofactors 
        var sign = 1; // To store sign multiplier 
        // Iterate for each element of first row 
        for (var f = 0; f < n; f++) {
            // Getting Cofactor of A[0][f] 
            if (A.some(function (x) { return x === undefined; }))
                throw new Error('blah');
            var temp = getCofactor(A, 0, f, n);
            // console.log('WOW', temp)
            D += sign * getV(A, 0, f) * getDeterminant(temp, n - 1);
            // terms are to be added with alternate sign 
            sign = -sign;
        }
        return D;
    };
    /**
     * @desc Function to get adjoint of A[N][N] in adj[N][N].
     * @param {Array<number>} A
     * @returns {Array<number>}
     */
    var adjoint = function (A) {
        var adj = makeArr();
        // console.log('from make', adj)
        if (N === 1) {
            setV(adj, 0, 0, 1);
            return;
        }
        // temp is used to store cofactors of A[][] 
        var sign = 1;
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < N; j++) {
                // Get cofactor of A[i][j] 
                var temp = getCofactor(A, i, j, N);
                // console.log(temp)
                // sign of adj[j][i] positive if sum of row 
                // and column indexes is even. 
                sign = ((i + j) % 2 == 0) ? 1 : -1;
                // console.log('SIGN', sign)
                // Interchanging rows and columns to get the 
                // transpose of the cofactor matrix 
                var _ = (sign) * (getDeterminant(temp, N - 1));
                // console.log('_', _)
                setV(adj, j, i, _);
            }
        }
        return adj;
    };
    /**
     * @desc Function to calculate and store inverse, returns false if matrix is singular
     * @param {Array<number>} A
     * @returns {Array<number>}
     */
    var getInverse = function (A) {
        var inverseArr = makeArr();
        // Find determinant of A[][] 
        var det = getDeterminant(A, N); // number
        if (det === 0) {
            console.log("Singular matrix, can't find its inverse");
            return undefined;
        }
        // Find adjoint 
        // int adj[N][N]; 
        var adj = adjoint(A);
        // console.log('adj', adj) 
        // Find Inverse using formula "inverse(A) = adj(A)/det(A)" 
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < N; j++) {
                var _ = getV(adj, i, j) / det;
                setV(inverseArr, i, j, _);
            }
        }
        return inverseArr;
    };
    return N === 4
        ? new LMat4(getInverse(mat.arr))
        : new LMat3(getInverse(mat.arr));
}
