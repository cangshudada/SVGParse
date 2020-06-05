import { parseSVG, makeAbsolute } from 'svg-path-parser';
import { TransformConvert } from '../transform/transformConvert';

import BezierCurve2point from '../../math/belzierParse';
const bezierCurve2point = new BezierCurve2point();

/**
 *
 * @description parse Path
 * @param {string} svgPathString path标签D字符串（目前A标签还没有合适的算法来解析转点，欢迎贡献）
 * @param {string} [transfrom] 是否有矩阵换算
 * @param {number} [pointDensity=10] 生成点密度，主要为弧线部分 弧线默认转为10个点
 * @returns {SvgParse.Points}
 */
export const pathParse = (svgPathString: string, transfrom?: string, pointDensity: number = 10): SvgParse.Points => {
    if (pointDensity <= 0) {
        throw Error('pointDensity cannot be 0 or negative')
    }

    if (!svgPathString) {
        console.warn('please afferent related parameters!')
        return []
    }
    
    let _pathParse = [] as SvgParse.Points;
    // 记录连续标签'T'时上一个控制点坐标
    let _controlPoint: SvgParse.Point = {
        x: 0,
        y: 0
    };

    makeAbsolute(parseSVG(svgPathString.trim())).forEach((cmd, index, cmds) => {

        switch (cmd.code) {
            case 'M': { //moveTo
                _pathParse.push({
                    x: cmd.x,
                    y: cmd.y
                })
            }
                break;

            case 'L': { //lineTo
                _pathParse.push({
                    x: cmd.x,
                    y: cmd.y
                })
            }
                break;


            case 'H': { //horizontal 
                _pathParse.push({
                    x: cmd.x,
                    y: _pathParse[_pathParse.length - 1].y
                })
            }
                break;

            case 'V': { //vertical  
                _pathParse.push({
                    x: _pathParse[_pathParse.length - 1].x,
                    y: cmd.y
                })
            }
                break;

            case 'C': { //curveto  
                const curvePoint = bezierCurve2point.getBezierCurvePoint(pointDensity, {
                    x: cmd.x0,
                    y: cmd.y0
                }, {
                    x: cmd.x, y: cmd.y
                }, {
                    x: cmd.x1,
                    y: cmd.y1
                }, {
                    x: cmd.x2, y: cmd.y2
                })

                curvePoint.forEach(point => {
                    _pathParse.push({
                        x: point.x,
                        y: point.y
                    })
                })

            }
                break;

            case 'S': { //Belzier curveto  

                let controlX: number, controlY: number;
                const prevCmd = cmds[index - 1];

                if (prevCmd.code === 'C' || prevCmd.code === 'S') {
                    controlX = prevCmd.x * 2 - prevCmd.x2;
                    controlY = prevCmd.y * 2 - prevCmd.y2;
                } else {
                    controlX = cmd.x0;
                    controlY = cmd.y0;
                }

                const curvePoint = bezierCurve2point.getBezierCurvePoint(pointDensity, {
                    x: cmd.x0,
                    y: cmd.y0
                }, {
                    x: cmd.x, y: cmd.y
                }, {
                    x: controlX,
                    y: controlY
                }, {
                    x: cmd.x2, y: cmd.y2
                })

                curvePoint.forEach(point => {
                    _pathParse.push({
                        x: point.x,
                        y: point.y
                    })
                })

            }
                break;

            case 'Q': { //Belzier curveto
                const curvePoint = bezierCurve2point.getBezierCurvePoint(pointDensity, {
                    x: cmd.x0,
                    y: cmd.y0
                }, {
                    x: cmd.x, y: cmd.y
                }, {
                    x: cmd.x1, y: cmd.y1
                })

                curvePoint.forEach(point => {
                    _pathParse.push({
                        x: point.x,
                        y: point.y
                    })
                })

            }
                break;

            case 'T': { //Belzier curveto  

                let controlX: number, controlY: number;
                const prevCmd = cmds[index - 1];

                if (prevCmd.code === 'Q') {
                    controlX = prevCmd.x * 2 - prevCmd.x1;
                    controlY = prevCmd.y * 2 - prevCmd.y1;

                    _controlPoint = {
                        x: controlX,
                        y: controlY
                    }

                } else if (prevCmd.code === 'T') {

                    controlX = cmd.x0 * 2 - _controlPoint.x;
                    controlY = cmd.y0 * 2 - _controlPoint.y;

                    _controlPoint = {
                        x: controlX,
                        y: controlY
                    }
                } else {
                    controlX = cmd.x0;
                    controlY = cmd.y0;

                    _controlPoint = {
                        x: 0,
                        y: 0
                    }
                }


                const curvePoint = bezierCurve2point.getBezierCurvePoint(pointDensity, {
                    x: cmd.x0,
                    y: cmd.y0
                }, {
                    x: cmd.x, y: cmd.y
                }, {
                    x: controlX,
                    y: controlY
                })

                curvePoint.forEach(point => {
                    _pathParse.push({
                        x: point.x,
                        y: point.y
                    })
                })

            }
                break;


            case 'A': { //elliptical Arc

                // There is no suitable algorithm to analyze the arc as points
                // You are welcome to provide corresponding contributions to this part of the algorithm

                _pathParse.push({
                    x: cmd.x,
                    y: cmd.y
                })
            }
                break;

            case 'Z': { //closepath" 
                // end
            }
                break;
        }
    });

    if (transfrom) {
        const transformConvert = new TransformConvert();
        _pathParse = transformConvert.convertTransform(transfrom, _pathParse)
    }

    return _pathParse;
}