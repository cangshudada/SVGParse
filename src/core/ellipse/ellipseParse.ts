import { TransformConvert } from '../transform/transformConvert';

/**
 *
 * @description 根据椭圆生成相应点阵坐标
 * @param {number} cx 椭圆中心点x坐标
 * @param {number} cy 椭圆中心点y坐标
 * @param {number} rx x轴半径
 * @param {number} ry y轴半径
 * @param {string} [transfrom] 是否有矩阵换算
 * @param {number} [pointDensity=2] 点阵密度(不建议超过5)
 * @returns {AcrPoint[]}
 */
export const ellipseParse = (cx: number, cy: number, rx: number, ry: number, transfrom?: string, pointDensity: number = 2) => {
    if (pointDensity <= 0) {
        throw Error('pointDensity cannot be 0 or negative')
    }

    if (!cx || !cy || !rx || !ry) {
        console.warn('please afferent related parameters!')
        return []
    }

    let _radiusX = -rx;
    let pointAry: SvgParse.Points = [];

    /**
     * @description 生成椭圆上半圈的点
     */
    (function getPoint() {
        let posX, posY;
        if (_radiusX <= rx) {
            posX = _radiusX;
            posY = Math.sqrt(1 - Math.pow(_radiusX / rx, 2)) * -ry;
            _radiusX += pointDensity;

            // 解析椭圆上半圈
            if (!isNaN(posX) && !isNaN(posY)) {
                pointAry.push({
                    x: posX,
                    y: posY === -0 ? 0 : posY
                })
            }
            // 递归调用
            getPoint()
        } else {
            // 椭圆上半圈解析完毕
            return
        }
    })()

    // 翻转上半圈的点
    const reversePoints: SvgParse.Points = JSON.parse(JSON.stringify(pointAry))
    reversePoints.forEach(pos => {
        pos.y = pos.y === 0 ? 0 : -pos.y;
    })

    // 合并成所有点
    pointAry = pointAry.concat(reversePoints.reverse());

    // 兼容传入的中心点坐标
    pointAry.forEach(pos => {
        pos.x += cx;
        pos.y += cy;
    })

    if (transfrom) {
        const transformConvert = new TransformConvert();
        pointAry = transformConvert.convertTransform(transfrom, pointAry)
    }

    return pointAry;
}