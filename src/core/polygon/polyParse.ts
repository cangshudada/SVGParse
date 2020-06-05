
import { TransformConvert } from '../transform/transformConvert';

/**
 *
 * @description 根据polygon或者polyline标签信息生成相应点阵坐标
 * @param {string} parseString polygon或者polyline标签信息
 * @param {string} [transfrom] 是否有矩阵换算
 */
export const polyParse = (parseString: string, transfrom?: string): SvgParse.Points => {
    if (!parseString) {
        console.warn('please afferent related parameters!')
        return []
    }

    let convertPoints = parseString.trim().split(' ').filter(point => {
        return point != "" && point.split(',').length === 2;
    }).reduce((prev: SvgParse.Points, points: string) => {
        prev.push({
            x: parseFloat(points.split(',')[0]),
            y: parseFloat(points.split(',')[1])
        })
        return prev
    }, [])

    if (transfrom) {
        const transformConvert = new TransformConvert();
        convertPoints = transformConvert.convertTransform(transfrom, convertPoints)
    }

    return convertPoints;

}