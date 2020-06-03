import { TransformConvert } from '../transform/transformConvert';

/**
 *
 * @description 根据圆形生成相应点阵坐标
 * @param {number} cx 中心点x坐标
 * @param {number} cy 中心点y坐标
 * @param {number} r 半径
 * @param {string} [transfrom] 是否有矩阵换算
 * @param {number} [pointDensity=5] 密度
 */
export const circleParse = (cx: number, cy: number, r: number, transfrom?: string, pointDensity: number = 5): SvgParse.Points => {
    if (pointDensity <= 0) {
        throw Error('pointDensity cannot be 0 or negative')
    }

    if (!cx || !cy || !r) {
        console.warn('please afferent related parameters!')
        return []
    }


    const _pointDensity = Math.abs(pointDensity);
    const angleCount = Math.floor(360 / _pointDensity);
    let acrPoint: SvgParse.Points = [];
    let angle = _pointDensity;

    for (let i = 0; i < angleCount; i++) {
        const _angle = angle * (i + 1);
        const _x = Math.sqrt(Math.pow(r, 2) * (1 - Math.pow(Math.sin(_angle * Math.PI / 180), 2)));
        const _y = Math.sqrt(Math.pow(r, 2) * (1 - Math.pow(Math.cos(_angle * Math.PI / 180), 2)));
        if (_angle <= 90 && 0 < _angle) {
            acrPoint.push({
                x: cx + _x,
                y: cy + _y
            })
        } else if (_angle > 90 && _angle <= 180) {
            acrPoint.push({
                x: cx - _x,
                y: cy + _y
            })
        } else if (_angle > 180 && _angle <= 270) {
            acrPoint.push({
                x: _x === cx ? cx : cx - _x,
                y: cy - _y
            })
        } else if (_angle > 270 && _angle <= 360) {
            acrPoint.push({
                x: cx + _x,
                y: _y === cy ? cy : cy - _y
            })
        }
    }


    if (transfrom) {
        const transformConvert = new TransformConvert();
        acrPoint = transformConvert.convertTransform(transfrom, acrPoint)
    }

    return acrPoint
}