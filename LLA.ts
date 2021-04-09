
export const Radians2Degrees = 180 / Math.PI;

export class LV2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	
	toString() {
		return `[${this.x}, ${this.y}]`;
	}

	copy() {
		return new LV2(this.x, this.y);
	}
	
	setAs(o: LV2) {
		this.x = o.x;
		this.y = o.y;
	}

	setValues(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	
	add(o: LV2) {
		return new LV2(this.x + o.x, this.y + o.y);
	}
	
	iadd(o: LV2) {
		this.x += o.x;
		this.y += o.y;
	}
	
	sub(o: LV2) {
		return new LV2(this.x - o.x, this.y - o.y);
	}
	
	isub(o: LV2) {
		this.x -= o.x;
		this.y -= o.y;
	}
	
	scale(s: number) {
		return new LV2(this.x * s, this.y * s);
	}

	scaleXY(sx: number, sy: number) {
		return new LV2(this.x * sx, this.y * sy);
	}

	iscale(s: number) {
		this.x *= s;
		this.y *= s;
	}
	
	div(s: number) {
		return new LV2(this.x / s, this.y / s);
	}
	
	idiv(s: number) {
		this.x /= s;
		this.y /= s;
	}
	
	dot(o: LV2) {
		return this.x * o.x + this.y * o.y;
	}

	proj(onto: LV2): { scalar: number, projection: LV2 } {
		const ontoUnit = onto.unit();
		const scalar = this.dot(ontoUnit);

		return { scalar, projection: ontoUnit.scale(scalar) };
	}

	dist(o: LV2) {
		var dx = this.x - o.x;
		var dy = this.y - o.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	
	mag() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	
	round() {
		return new LV2(Math.round(this.x), Math.round(this.y));
	}
	
	floor() {
		return new LV2(Math.floor(this.x), Math.floor(this.y));
	}
	
	iround() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
	}
	
	ifloor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
	}
	
	unit() {
		var m = Math.sqrt(this.x * this.x + this.y * this.y);
		return new LV2(this.x / m, this.y / m);	
	}
	
	iunit() {
		var m = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x /= m;
		this.y /= m;
	}
	
	interpolateTo(target: LV2, time: number) {
		var to = target.copy();
		to.isub(this);
		to.iscale(time);
		to.iadd(this);
		return to;
	}

	getAngle() {
		let angle = Radians2Degrees * Math.atan(this.y / this.x);
		if(this.x < 0.0)
			angle += 180.0;
		else if(this.y < 0.0)
			angle += 360.0;
		return angle;
	}
	
	static fromAngle(angle: number) {
		const rv = new LV2(0, 0);
		angle /= Radians2Degrees;
		rv.x = Math.cos(angle);
		rv.y = Math.sin(angle);
		return rv;
	}

	toJSON() {
		return { x: this.x, y: this.y };
	}

	static fromJSON(obj) {
		return new LV2(obj.x, obj.y);
	}
}

export class LV3 {
	x: number;
	y: number;
	z: number;
	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	toString() {
		return `${this.x},${this.y},${this.z}`;
	}

	copy() {
		return new LV3(this.x, this.y, this.z);
	}

	setAs(o: LV3) {
		this.x = o.x;
		this.y = o.y;
		this.z = o.z;
	}

	setValues(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(o: LV3) {
		return new LV3(this.x + o.x, this.y + o.y, this.z + o.z);
	}

	iadd(o: LV3) {
		this.x += o.x;
		this.y += o.y;
		this.z += o.z;
	}

	sub(o: LV3) {
		return new LV3(this.x - o.x, this.y - o.y, this.z - o.z);
	}

	isub(o: LV3) {
		this.x -= o.x;
		this.y -= o.y;
		this.z -= o.z;
	}

	scale(s: number) {
		return new LV3(this.x * s, this.y * s, this.z * s);
	}

	iscale(s: number) {
		this.x *= s;
		this.y *= s;
		this.z *= s;
	}

	div(s: number) {
		return new LV3(this.x / s, this.y / s, this.z / s);
	}

	idiv(s: number) {
		this.x /= s;
		this.y /= s;
		this.z /= s;
	}

	dot(o: LV3) {
		return this.x * o.x + this.y * o.y + this.z * o.z;
	}

	proj(onto: LV3): { scalar: number, projection: LV3 } {
		const ontoUnit = onto.unit();
		const scalar = this.dot(ontoUnit);

		return { scalar, projection: ontoUnit.scale(scalar) };
	}

	cross(o: LV3) {
		return new LV3(
			this.y * o.z - this.z * o.y,
			this.z * o.x - this.x * o.z,
			this.x * o.y - this.y * o.x
		);
	}

	icross(o: LV3) {
		const x = this.x;
		const y = this.y;
		const z = this.z;
		this.x = y * o.z - z * o.y;
		this.y = z * o.x - x * o.z;
		this.z = x * o.y - y * o.x;
	}


	dist(o: LV3) {
		const dx = this.x - o.x;
		const dy = this.y - o.y;
		const dz = this.z - o.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}

	mag() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	round() {
		return new LV3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
	}

	floor() {
		return new LV3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
	}

	iround() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);
	}

	ifloor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);
	}

	unit() {
		const m = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		return new LV3(this.x / m, this.y / m, this.z / m);	
	}

	iunit() {
		const m = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		this.x /= m;
		this.y /= m;
		this.z /= m;	
	}

	toJSON() {
		return { x: this.x, y: this.y, z: this.z };
	}

	static fromJSON(obj: LV3) {
		return new LV3(obj.x, obj.y, obj.z);
	}
}

export class LMat3 {
	arr: number[];

	constructor(inp?: number[]) {
		this.arr = inp || [0, 0, 0, 0, 0, 0, 0, 0, 0];
	}
	
	toString() {
		return `| ${this.arr[0]} ${this.arr[1]} ${this.arr[2]}
			   '| ${this.arr[3]} ${this.arr[4]} ${this.arr[5]}
			   '| ${this.arr[6]} ${this.arr[7]} ${this.arr[8]}
		`;
	}
	
	copy() {
		return new LMat3(this.arr.slice());
	}

	at(row: number, col: number) {
		return this.arr[row * 3 + col];
	}

	set(row: number, col: number, val: number) {
		this.arr[row * 3 + col] = val;
	}
	
	itranspose() {
		this.arr = [
			this.arr[0], this.arr[3], this.arr[6],
			this.arr[1], this.arr[4], this.arr[7],
			this.arr[2], this.arr[5], this.arr[8] 
		];
	}
	
	transpose() {
		return new LMat3([
			this.arr[0], this.arr[3], this.arr[6],
			this.arr[1], this.arr[4], this.arr[7],
			this.arr[2], this.arr[5], this.arr[8] 
		]);
	}
	
	imult(m: LMat3) {
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
	}
	
	mult(m: LMat3) {
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
	}
	
	multLV2(p: LV2) {
		return new LV2(p.x * this.arr[0] + p.y * this.arr[1] + 1 * this.arr[2],
					   p.x * this.arr[3] + p.y * this.arr[4] + 1 * this.arr[5]);
	}
	
	multLV3(p: LV3) {
		return new LV3(p.x * this.arr[0] + p.y * this.arr[1] + p.z * this.arr[2],
					   p.x * this.arr[3] + p.y * this.arr[4] + p.z * this.arr[5],
					   p.x * this.arr[6] + p.y * this.arr[7] + p.z * this.arr[8]);
	}

	inv(): LMat3 {
		return invertSquareMatrix<LMat3>(this);
	}

	static zero() {
		return new LMat3();
	}

	static identity() {
		return new LMat3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
	}

	static scale(scalar: number) {
		return new LMat3([
			scalar, 0, 0,
			0, scalar, 0,
			0, 0, 1,
		]);
	}

	static trans(x: number, y: number) {
		return new LMat3([
			1, 0, x,
			0, 1, y,
			0, 0, 1,
		]);
	}

	static rotate(angle: number) {
		const radians = angle / Radians2Degrees;
		const cosine = Math.cos(radians);
		const sinus = Math.sin(radians);
		return new LMat3([
			cosine, -sinus, 0,
			sinus, cosine, 0,
			0, 0, 1,
		]);
	}

	static rotateX(angle: number) {
		const radians = angle / Radians2Degrees;
		const cosine = Math.cos(radians);
		const sinus = Math.sin(radians);
		return new LMat3([
			1, 0, 0,
			0, cosine, -sinus,
			0, sinus, cosine,
		]);
	}

	static rotateY(angle: number) {
		const radians = angle / Radians2Degrees;
		const cosine = Math.cos(radians);
		const sinus = Math.sin(radians);
		return new LMat3([
			cosine, 0, sinus,
			0, 1, 0,
			-sinus, 0, cosine,
		]);
	}

	static rotateZ(angle: number) {
		const radians = angle / Radians2Degrees;
		const cosine = Math.cos(radians);
		const sinus = Math.sin(radians);
		return new LMat3([
			cosine, -sinus, 0,
			sinus, cosine, 0,
			0, 0, 1,
		]);
	}

	static buildMatrix(matrices: LMat3[] = []) {
		return matrices.reduce((p,c) => p.mult(c), LMat3.identity());
	}
}

export class LMat4 {
	arr: number[];

	constructor(inp: number[] = []) {
		this.arr = inp || [
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
		];
	}
	
	toString() {
		return '|' + this.arr[0] + ',' + this.arr[1] + ',' + this.arr[2] + ',' + this.arr[3] + '|\n' + 
			   '|' + this.arr[4] + ',' + this.arr[5] + ',' + this.arr[6] + ',' + this.arr[7] + '|\n' + 
			   '|' + this.arr[8] + ',' + this.arr[9] + ',' + this.arr[10] + ',' + this.arr[11] + '|\n' + 
			   '|' + this.arr[12] + ',' + this.arr[13] + ',' + this.arr[14] + ',' + this.arr[15] + '|\n';
	}
	
	copy() {
		return new LMat4(this.arr.slice());
	}

	at(row: number, col: number) {
		return this.arr[row * 4 + col];
	}

	set(row: number, col: number, val: number) {
		this.arr[row * 4 + col] = val;
	}
	
	itranspose() {
		this.arr = [
			this.arr[0], this.arr[4], this.arr[8], this.arr[12],
			this.arr[1], this.arr[5], this.arr[9], this.arr[13],
			this.arr[2], this.arr[6], this.arr[10], this.arr[14],
			this.arr[3], this.arr[7], this.arr[11], this.arr[15]
		];
	}
	
	transpose() {
		return new LMat4([
			this.arr[0], this.arr[4], this.arr[8], this.arr[12],
			this.arr[1], this.arr[5], this.arr[9], this.arr[13],
			this.arr[2], this.arr[6], this.arr[10], this.arr[14],
			this.arr[3], this.arr[7], this.arr[11], this.arr[15]
		]);
	}
	
	imult(m: LMat4) {
		this.arr = [
			this.arr[0]*m.arr[0] + this.arr[1]*m.arr[4] + this.arr[2]*m.arr[8] + this.arr[3]*m.arr[12],
			this.arr[0]*m.arr[1] + this.arr[1]*m.arr[5] + this.arr[2]*m.arr[9] + this.arr[3]*m.arr[13],
			this.arr[0]*m.arr[2] + this.arr[1]*m.arr[6] + this.arr[2]*m.arr[10] + this.arr[3]*m.arr[14],
			this.arr[0]*m.arr[3] + this.arr[1]*m.arr[7] + this.arr[2]*m.arr[11] + this.arr[3]*m.arr[15],
	
			this.arr[4]*m.arr[0] + this.arr[5]*m.arr[4] + this.arr[6]*m.arr[8] + this.arr[7]*m.arr[12],
			this.arr[4]*m.arr[1] + this.arr[5]*m.arr[5] + this.arr[6]*m.arr[9] + this.arr[7]*m.arr[13],
			this.arr[4]*m.arr[2] + this.arr[5]*m.arr[6] + this.arr[6]*m.arr[10] + this.arr[7]*m.arr[14],
			this.arr[4]*m.arr[3] + this.arr[5]*m.arr[7] + this.arr[6]*m.arr[11] + this.arr[7]*m.arr[15],
	
			this.arr[8]*m.arr[0] + this.arr[9]*m.arr[4] + this.arr[10]*m.arr[8] + this.arr[11]*m.arr[12],
			this.arr[8]*m.arr[1] + this.arr[9]*m.arr[5] + this.arr[10]*m.arr[9] + this.arr[11]*m.arr[13],
			this.arr[8]*m.arr[2] + this.arr[9]*m.arr[6] + this.arr[10]*m.arr[10] + this.arr[11]*m.arr[14],
			this.arr[8]*m.arr[3] + this.arr[9]*m.arr[7] + this.arr[10]*m.arr[11] + this.arr[11]*m.arr[15],
	
			this.arr[12]*m.arr[0] + this.arr[13]*m.arr[4] + this.arr[14]*m.arr[8] + this.arr[15]*m.arr[12],
			this.arr[12]*m.arr[1] + this.arr[13]*m.arr[5] + this.arr[14]*m.arr[9] + this.arr[15]*m.arr[13],
			this.arr[12]*m.arr[2] + this.arr[13]*m.arr[6] + this.arr[14]*m.arr[10] + this.arr[15]*m.arr[14],
			this.arr[12]*m.arr[3] + this.arr[13]*m.arr[7] + this.arr[14]*m.arr[11] + this.arr[15]*m.arr[15]
			
		];
	}
	
	mult(m: LMat4) {
		return new LMat4([
			this.arr[0]*m.arr[0] + this.arr[1]*m.arr[4] + this.arr[2]*m.arr[8] + this.arr[3]*m.arr[12],
			this.arr[0]*m.arr[1] + this.arr[1]*m.arr[5] + this.arr[2]*m.arr[9] + this.arr[3]*m.arr[13],
			this.arr[0]*m.arr[2] + this.arr[1]*m.arr[6] + this.arr[2]*m.arr[10] + this.arr[3]*m.arr[14],
			this.arr[0]*m.arr[3] + this.arr[1]*m.arr[7] + this.arr[2]*m.arr[11] + this.arr[3]*m.arr[15],
	
			this.arr[4]*m.arr[0] + this.arr[5]*m.arr[4] + this.arr[6]*m.arr[8] + this.arr[7]*m.arr[12],
			this.arr[4]*m.arr[1] + this.arr[5]*m.arr[5] + this.arr[6]*m.arr[9] + this.arr[7]*m.arr[13],
			this.arr[4]*m.arr[2] + this.arr[5]*m.arr[6] + this.arr[6]*m.arr[10] + this.arr[7]*m.arr[14],
			this.arr[4]*m.arr[3] + this.arr[5]*m.arr[7] + this.arr[6]*m.arr[11] + this.arr[7]*m.arr[15],
	
			this.arr[8]*m.arr[0] + this.arr[9]*m.arr[4] + this.arr[10]*m.arr[8] + this.arr[11]*m.arr[12],
			this.arr[8]*m.arr[1] + this.arr[9]*m.arr[5] + this.arr[10]*m.arr[9] + this.arr[11]*m.arr[13],
			this.arr[8]*m.arr[2] + this.arr[9]*m.arr[6] + this.arr[10]*m.arr[10] + this.arr[11]*m.arr[14],
			this.arr[8]*m.arr[3] + this.arr[9]*m.arr[7] + this.arr[10]*m.arr[11] + this.arr[11]*m.arr[15],
	
			this.arr[12]*m.arr[0] + this.arr[13]*m.arr[4] + this.arr[14]*m.arr[8] + this.arr[15]*m.arr[12],
			this.arr[12]*m.arr[1] + this.arr[13]*m.arr[5] + this.arr[14]*m.arr[9] + this.arr[15]*m.arr[13],
			this.arr[12]*m.arr[2] + this.arr[13]*m.arr[6] + this.arr[14]*m.arr[10] + this.arr[15]*m.arr[14],
			this.arr[12]*m.arr[3] + this.arr[13]*m.arr[7] + this.arr[14]*m.arr[11] + this.arr[15]*m.arr[15]
			
		]);
	}
	
	multLV3(p: LV3, w: number = 1) {
		return new LV3(p.x * this.arr[0] + p.y * this.arr[1] + p.z * this.arr[2] + this.arr[3] * w,
					   p.x * this.arr[4] + p.y * this.arr[5] + p.z * this.arr[6] + this.arr[7] * w,
					   p.x * this.arr[8] + p.y * this.arr[9] + p.z * this.arr[10] + this.arr[11] * w);
	}

	inv(): LMat4 {
		return invertSquareMatrix<LMat4>(this);
	}
	
	static scale(scalar: number) {
		return new LMat4([scalar, 0, 0, 0, 
						  0, scalar, 0, 0,
						  0, 0, scalar, 0,
						  0, 0, 0, 1]);
	}

	static scaleXYZ(xs: number, ys: number, zs: number) {
		return new LMat4([xs, 0, 0, 0, 
						  0, ys, 0, 0,
						  0, 0, zs, 0,
						  0, 0, 0, 1]);
	}
	
	static trans(x: number, y: number, z: number) {
		return new LMat4([1, 0, 0, x,
						  0, 1, 0, y,
						  0, 0, 1, z,
						  0, 0, 0, 1]);
	}
	
	static rotateX(angle: number) {
		const radians = angle / Radians2Degrees;
		const cosine = Math.cos(radians);
		const sinus = Math.sin(radians);
		return new LMat4([1, 0, 0, 0,
						  0, cosine, -sinus, 0,
						  0, sinus, cosine, 0,
						  0, 0, 0, 1
			]);
	}
	
	static rotateY(angle: number) {
		const radians = angle / Radians2Degrees;
		const cosine = Math.cos(radians);
		const sinus = Math.sin(radians);
		return new LMat4([cosine, 0, sinus, 0,
						  0, 1, 0, 0,
						  -sinus, 0, cosine, 0,
						  0, 0, 0, 1
			]);
	}
	
	static rotateZ(angle: number) {
		const radians = angle / Radians2Degrees;
		const cosine = Math.cos(radians);
		const sinus = Math.sin(radians);
		return new LMat4([cosine, -sinus, 0, 0,
						  sinus, cosine, 0, 0,
						  0, 0, 1, 0,
						  0, 0, 0, 1
			]);
	}
	
	static zero() {
		return new LMat4();
	}
	
	static identity() {
		return new LMat4([1, 0, 0, 0,
						  0, 1, 0, 0,
						  0, 0, 1, 0,
						  0, 0, 0, 1]);
	}

	static buildMatrix(mats: LMat4[] = []) {
		return mats.reduce((p,c) => p.mult(c), LMat4.identity());
	}

}
	

// get inverse of a square matrix
/**
 * @todo improve this
 * @param {T extends LMat4 | LMat3} mat 
 * @returns {T}
 */
function invertSquareMatrix<T extends LMat3 | LMat4>(mat: T): T {
    const arr = mat.arr;
    const N = Math.floor(Math.sqrt(arr.length));
    const getV = (arr: number[], r: number, c: number) => {
        return arr[r * N + c];
    };
    const setV = (arr: number[], r: number, c: number, v: number) => {
        arr[r * N + c] = v;
    };
    const makeArr = () => Array.from({ length: N * N }, () => 0);

    /**
     * @desc Function to get cofactor of A[p][q] in temp[][]. n is current dimension of A[][] 
     */
    const getCofactor = (A: number[], p: number, q: number, n: number): number[] => { 
        let i = 0;
        let j = 0; 
        let temp = makeArr();
    
        // Looping for each element of the matrix 
        for (let row = 0; row < n; row++) { 
            for (let col = 0; col < n; col++) { 
                //  Copying into temporary matrix only those element 
                //  which are not in given row and column 
                if (row !== p && col !== q) { 
                    const _ = getV(A, row, col);
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
    } 
    /**
     * @desc Recursive function for finding determinant of matrix. n is current dimension of A[][].
     */
    const getDeterminant = (A: number[], n: number): number => { 
        let D = 0; // Initialize result 
    
        //  Base case : if matrix contains single element 
        if (n === 1) 
            return getV(A, 0, 0); 
    
        // let temp = makeArr(); // To store cofactors 
    
        let sign = 1;  // To store sign multiplier 
    
        // Iterate for each element of first row 
        for (let f = 0; f < n; f++) { 
            // Getting Cofactor of A[0][f] 
            if (A.some(x => x === undefined)) throw new Error('blah');
            const temp = getCofactor(A, 0, f, n); 
            // console.log('WOW', temp)
            D += sign * getV(A, 0, f) * getDeterminant(temp, n - 1); 
    
            // terms are to be added with alternate sign 
            sign = -sign; 
        } 
    
        return D; 
    } 
    /**
     * @desc Function to get adjoint of A[N][N] in adj[N][N]. 
     */
    const adjoint = (A: number[]): number[] => { 
        const adj = makeArr();
        // console.log('from make', adj)
        if (N === 1) { 
            setV(adj, 0, 0, 1); 
            return; 
        } 
    
        // temp is used to store cofactors of A[][] 
        let sign = 1;
    
        for (let i = 0; i < N; i++) { 
            for (let j = 0; j < N; j++) { 
                // Get cofactor of A[i][j] 
                const temp = getCofactor(A, i, j, N); 
                // console.log(temp)
    
                // sign of adj[j][i] positive if sum of row 
                // and column indexes is even. 
                sign = ((i+j)%2==0)? 1: -1; 
                // console.log('SIGN', sign)
    
                // Interchanging rows and columns to get the 
                // transpose of the cofactor matrix 
                const _ = (sign)*(getDeterminant(temp, N-1));
                // console.log('_', _)
                setV(adj, j, i, _); 
            } 
        } 
        return adj;
    } 
    /**
     * @desc Function to calculate and store inverse, returns false if matrix is singular 
     */
    const getInverse = (A: number[]): number[] => {
        let inverseArr = makeArr();
        // Find determinant of A[][] 
        let det = getDeterminant(A, N); // number
        if (det === 0) {
            console.log("Singular matrix, can't find its inverse"); 
            return undefined; 
        } 
    
        // Find adjoint 
        // int adj[N][N]; 
        const adj = adjoint(A);
        // console.log('adj', adj) 
    
        // Find Inverse using formula "inverse(A) = adj(A)/det(A)" 
        for (let i=0; i<N; i++) {
            for (let j=0; j<N; j++) {
                const _ = getV(adj,i,j)/det; 
                setV(inverseArr, i, j, _);
            }
        }
    
        return inverseArr; 
    } 
    return N === 4
        ? new LMat4(getInverse(mat.arr)) as T
        : new LMat3(getInverse(mat.arr)) as T;
}
