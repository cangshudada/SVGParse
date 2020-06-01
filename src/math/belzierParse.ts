class BezierCurve2point {
    /**
     *
     * @description 贝塞尔曲线转点（含 1-3阶贝塞尔曲线）
     * @param {number} [pointDensity=180] 生成贝塞尔曲线上点的个数 默认为180个
     * @param {SvgParse.Point} p1 p1坐标
     * @param {SvgParse.Point} p2 p2坐标
     * @param {SvgParse.Point} cp1 控制点1
     * @param {SvgParse.Point} cp2 控制点2
     * @returns {SvgParse.Points}
     * @memberof BezierCurve2point
     */

    public getBezierCurvePoint(pointDensity: number = 180, p1: SvgParse.Point, p2: SvgParse.Point, cp1?: SvgParse.Point, cp2?: SvgParse.Point): SvgParse.Points {
        if (pointDensity <= 0) {
            throw Error('pointDensity cannot be 0 or negative')
        }

        let points: SvgParse.Points = [];
        // 一阶
        if (!cp1 && !cp2) {
            points = this.oneBezierParse(pointDensity, p1, p2);
        } else if (cp1 && !cp2) { //二阶
            points = this.twoBezierParse(pointDensity, p1, p2, cp1);
        } else if (cp1 && cp2) { //三阶
            points = this.threeBezierParse(pointDensity, p1, p2, cp1, cp2);
        }
        points.push(p2);

        return points;
    }


    /**
     *
     * @description 一阶贝塞尔曲线转点
     * @param {number} 生成贝塞尔曲线上点的个数 默认为180个
     * @param {SvgParse.Point} p1 起点坐标
     * @param {SvgParse.Point} p2 终点坐标
     * @returns {SvgParse.Points}
     * @memberof bezierCurve2point
     */
    private oneBezierParse(pointDensity: number, p1: SvgParse.Point, p2: SvgParse.Point): SvgParse.Points {
        const points: SvgParse.Points = [];

        for (let i = 0; i < pointDensity; i++) {
            const ratio: number = i / pointDensity;
            points.push({
                x: p1.x + (p2.x - p1.x) * ratio,
                y: p1.y + (p2.y - p1.y) * ratio
            })
        }

        return points;
    }

    /**
     *
     * @description 二阶贝塞尔曲线转点
     * @param {number} 生成贝塞尔曲线上点的个数 默认为180个
     * @param {SvgParse.Point} p1 起点坐标
     * @param {SvgParse.Point} p2 终点坐标
     * @param {SvgParse.Point} cp 控制点坐标
     * @returns {SvgParse.Points}
     * @memberof bezierCurve2point
     */
    private twoBezierParse(pointDensity: number, p1: SvgParse.Point, p2: SvgParse.Point, cp: SvgParse.Point): SvgParse.Points {
        const points: SvgParse.Points = [];

        for (let i = 0; i < pointDensity; i++) {
            const ratio: number = i / pointDensity;
            points.push({
                x: (1 - ratio) * (1 - ratio) * p1.x + 2 * ratio * (1 - ratio) * cp.x + ratio * ratio * p2.x,
                y: (1 - ratio) * (1 - ratio) * p1.y + 2 * ratio * (1 - ratio) * cp.y + ratio * ratio * p2.y
            })
        }

        return points;
    }


    /**
     *
     * @description 三阶贝塞尔曲线转点 
     * @param {number} 生成贝塞尔曲线上点的个数 默认为180个
     * @param {SvgParse.Point} p1 起点坐标
     * @param {SvgParse.Point} p2 终点坐标
     * @param {SvgParse.Point} cp1 控制点1坐标
     * @param {SvgParse.Point} cp2 控制点2坐标
     * @returns {SvgParse.Points}
     * @memberof BezierCurve2point
     */
    private threeBezierParse(pointDensity: number, p1: SvgParse.Point, p2: SvgParse.Point, cp1: SvgParse.Point, cp2: SvgParse.Point): SvgParse.Points {
        const points: SvgParse.Points = [];

        for (let i = 0; i < pointDensity; i++) {
            const ratio: number = i / pointDensity;
            const x =
                p1.x * (1 - ratio) * (1 - ratio) * (1 - ratio) +
                3 * cp1.x * ratio * (1 - ratio) * (1 - ratio) +
                3 * cp2.x * ratio * ratio * (1 - ratio) +
                p2.x * ratio * ratio * ratio;
            const y =
                p1.y * (1 - ratio) * (1 - ratio) * (1 - ratio) +
                3 * cp1.y * ratio * (1 - ratio) * (1 - ratio) +
                3 * cp2.y * ratio * ratio * (1 - ratio) +
                p2.y * ratio * ratio * ratio;

            points.push({
                x,
                y
            })
        }

        return points;
    }

}


export default BezierCurve2point;