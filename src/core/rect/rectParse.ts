import BezierCurve2point from '../../math/belzierParse';
import { TransformConvert } from '../transform/transformConvert';
const bezierCurve2point = new BezierCurve2point();

/**
 *
 * @description rect parse
 * @param {number} x rect左上角坐标x
 * @param {number} y rect左上角坐标y
 * @param {number} width rect width
 * @param {number} height rect height
 * @param {number} [rx=0] rect 存在圆角
 * @param {number} [ry=0] rect 存在圆角
 * @param {string} [transfrom] 是否有矩阵换算
 * @param {number} [pointDensity=20] 圆角密度 默认为20个
 * @returns {SvgParse.Points}
 */
export const rectParse = (x: number, y: number, width: number, height: number, rx: number = 0, ry: number = 0, transfrom?: string, pointDensity: number = 20): SvgParse.Points => {
    if (pointDensity <= 0) {
        throw Error('pointDensity cannot be 0 or negative')
    }

    if (!x || !y || !width || !height) {
        console.warn('please afferent related parameters!')
        return []
    }

    let _parseRect: SvgParse.Points = [];
    if (rx !== 0 || ry !== 0) {
        // 左上角
        _parseRect.push({
            x,
            y: y + ry
        })
        // 左上角中间弧线
        _parseRect.push(...bezierCurve2point.getBezierCurvePoint(pointDensity, {
            x,
            y: y + ry
        }, {
            x: x + rx,
            y
        }, {
            x, y
        }))

        // 右上角
        _parseRect.push({
            x: x + rx,
            y
        }, {
            x: x + width - rx,
            y
        })

        // 右上角中间弧线
        _parseRect.push(...bezierCurve2point.getBezierCurvePoint(30, {
            x: x + width - rx,
            y
        }, {
            x: x + width,
            y: y + ry
        }, {
            x: x + width, y
        }))

        // 右下角
        _parseRect.push({
            x: x + width,
            y: y + ry
        }, {
            x: x + width,
            y: y + height - ry
        })

        // 右下角中间弧线
        _parseRect.push(...bezierCurve2point.getBezierCurvePoint(30, {
            x: x + width,
            y: y + height - ry
        }, {
            x: x + width - rx,
            y: y + height
        }, {
            x: x + width, y: y + height
        }))

        // 左下角
        _parseRect.push({
            x: x + width - rx,
            y: y + height
        }, {
            x: x + rx,
            y: y + height
        })

        // 左下角中间弧线
        _parseRect.push(...bezierCurve2point.getBezierCurvePoint(30, {
            x: x + rx,
            y: y + height
        }, {
            x,
            y: y + height - ry
        }, {
            x: x, y: y + height
        }))

        _parseRect.push({
            x, y: y + height - ry
        })

    } else {
        _parseRect = [{
            x, y
        }, {
            x: x + width, y
        }, {
            x: x + width, y: y + height
        }, {
            x, y: y + height
        }]
    }

    if (transfrom) {
        const transformConvert = new TransformConvert();
        _parseRect = transformConvert.convertTransform(transfrom, _parseRect)
    }

    return _parseRect;
}