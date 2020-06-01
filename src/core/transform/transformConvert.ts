interface OperInfo {
    oper: string,
    data: string[]
}

export class TransformConvert {
    private _matrix: number[]
    constructor() {
        this._matrix = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]
    }

    public convertTransform(transfromInfo: string, points: SvgParse.Points): SvgParse.Points {
        const splitInfo = transfromInfo.trim().split(')');
        const transformText: OperInfo[] = [];

        splitInfo.forEach(splitText => {
            const text = splitText.split('(');
            if (text[0]) {

                transformText.push({
                    oper: text[0],
                    data: text[1].indexOf(',') !== -1 ? text[1].split(',') : text[1].split(' ')
                })
            }
        })

        return this.parseTransformText(transformText, points)
    }

    private parseTransformText(transformText: OperInfo[], points: SvgParse.Points) {
        let _convertPoints = points;

        transformText.forEach(transformType => {

            switch (transformType.oper.trim()) {

                case "translate": {

                    if (transformType.data.length >= 1) {
                        const tx = parseFloat(transformType.data[0]);
                        let ty = tx;
                        if (transformType.data.length >= 2) {
                            ty = parseFloat(transformType.data[1]);
                        }
                        this.translate(tx, ty);

                        _convertPoints = this.convertPoints(_convertPoints)
                    }
                }
                    break;

                case "rotate": {

                    if (transformType.data.length >= 1) {

                        let cx = 0;
                        let cy = 0;

                        // Angle
                        const angle = - parseFloat(transformType.data[0]) * Math.PI / 180;

                        if (transformType.data.length >= 3) {

                            // Center x, y
                            cx = parseFloat(transformType.data[1]);
                            cy = parseFloat(transformType.data[2]);

                        }

                        // Rotate around center (cx, cy)
                        const tempTransform1 = new TransformConvert().identity().translate(- cx, - cy);
                        const tempTransform2 = new TransformConvert().identity().rotate(angle);
                        const tempTransform3 = new TransformConvert().multiplyMatrices(tempTransform2, tempTransform1);
                        tempTransform1.identity().translate(cx, cy);
                        this.multiplyMatrices(tempTransform1, tempTransform3);

                        _convertPoints = this.convertPoints(_convertPoints)
                    }
                }
                    break;

                case "scale": {

                    if (transformType.data.length >= 1) {

                        const scaleX = parseFloat(transformType.data[0]);
                        let scaleY = scaleX;

                        if (transformType.data.length >= 2) {

                            scaleY = parseFloat(transformType.data[1]);

                        }

                        this.scale(scaleX, scaleY);

                        _convertPoints = this.convertPoints(_convertPoints)
                    }
                }
                    break;

                case "skewX": {

                    if (transformType.data.length === 1) {

                        this.set(
                            1, Math.tan(parseFloat(transformType.data[0]) * Math.PI / 180), 0,
                            0, 1, 0,
                            0, 0, 1
                        );

                        _convertPoints = this.convertPoints(_convertPoints)
                    }
                }
                    break;

                case "skewY": {

                    if (transformType.data.length === 1) {

                        this.set(
                            1, 0, 0,
                            Math.tan(parseFloat(transformType.data[0]) * Math.PI / 180), 1, 0,
                            0, 0, 1
                        );

                        _convertPoints = this.convertPoints(_convertPoints)
                    }
                }
                    break;

                case "matrix": {

                    if (transformType.data.length === 6) {

                        const pointArray: number[] = []

                        transformType.data.forEach(data => {
                            pointArray.push(parseFloat(data))
                        })

                        this.set(
                            pointArray[0], pointArray[2], pointArray[4],
                            pointArray[1], pointArray[3], pointArray[5],
                            0, 0, 1
                        );

                        _convertPoints = this.convertPoints(_convertPoints)
                    }
                }
                    break;
            }
        })

        return _convertPoints;
    }

    private convertPoints(points: SvgParse.Points) {
        const convertPoint: SvgParse.Points = [];

        points.forEach(point => {
            convertPoint.push({
                x: this._matrix[0] * point.x + this._matrix[3] * point.y + this._matrix[6] * 1,
                y: this._matrix[1] * point.x + this._matrix[4] * point.y + this._matrix[7] * 1
            })
        })

        return convertPoint
    }

    private set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number) {

        const te = this._matrix;

        te[0] = n11; te[1] = n21; te[2] = n31;
        te[3] = n12; te[4] = n22; te[5] = n32;
        te[6] = n13; te[7] = n23; te[8] = n33;

        return this;

    }

    private identity() {

        this.set(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );

        return this;

    }

    private multiplyMatrices(a: TransformConvert, b: TransformConvert) {

        const ae = a._matrix;
        const be = b._matrix;
        const te = this._matrix;

        const a11 = ae[0], a12 = ae[3], a13 = ae[6];
        const a21 = ae[1], a22 = ae[4], a23 = ae[7];
        const a31 = ae[2], a32 = ae[5], a33 = ae[8];

        const b11 = be[0], b12 = be[3], b13 = be[6];
        const b21 = be[1], b22 = be[4], b23 = be[7];
        const b31 = be[2], b32 = be[5], b33 = be[8];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31;
        te[3] = a11 * b12 + a12 * b22 + a13 * b32;
        te[6] = a11 * b13 + a12 * b23 + a13 * b33;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31;
        te[4] = a21 * b12 + a22 * b22 + a23 * b32;
        te[7] = a21 * b13 + a22 * b23 + a23 * b33;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31;
        te[5] = a31 * b12 + a32 * b22 + a33 * b32;
        te[8] = a31 * b13 + a32 * b23 + a33 * b33;

        return this;
    }

    private translate(tx: number, ty: number) {
        const te = this._matrix;

        te[0] += tx * te[2]; te[3] += tx * te[5]; te[6] += tx * te[8];
        te[1] += ty * te[2]; te[4] += ty * te[5]; te[7] += ty * te[8];

        return this;
    }

    private rotate(theta: number) {

        const c = Math.cos(theta);
        const s = Math.sin(theta);

        const te = this._matrix;

        const a11 = te[0], a12 = te[3], a13 = te[6];
        const a21 = te[1], a22 = te[4], a23 = te[7];

        te[0] = c * a11 + s * a21;
        te[3] = c * a12 + s * a22;
        te[6] = c * a13 + s * a23;

        te[1] = - s * a11 + c * a21;
        te[4] = - s * a12 + c * a22;
        te[7] = - s * a13 + c * a23;

        return this;

    }

    private scale(sx: number, sy: number) {

        const te = this._matrix;

        te[0] *= sx; te[3] *= sx; te[6] *= sx;
        te[1] *= sy; te[4] *= sy; te[7] *= sy;

        return this;

    }

}
