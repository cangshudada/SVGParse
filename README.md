SVGParse.js [![npm](https://img.shields.io/npm/v/svg-parse2point.svg?style=flat)](https://www.npmjs.com/package/svg-parse2point) [![npm](https://img.shields.io/npm/l/svg-parse2point.svg?style=flat)](https://www.npmjs.com/package/svg-parse2point)
===
⚙Node package that parse SVG tags to Polygonal points.

Path parsing part depends on [svg-path-parser](https://github.com/hughsk/svg-path-parser) in this library , and combined with it weighs ~23kb.



## Features

- [x] Can parse all currently existing SVG tags.

- [x] Support attribute transform matrix parse.

- [x] It can realize high-precision analysis of the curve and support the output of arbitrary precision lattice coordinates.

- [x] Use Typescript, more efficient type checking.



## Installation

```bash
npm install --save svg-parse2point
//or
yarn add --save svg-parse2point
```

```html
<script src="svgParse.min.js"></script>
```



## Getting Started

```html
<!-- html -->
<canvas id="myCanvas" width="5000" height="5000" style="border:1px solid #ccc;">
        您的浏览器不支持canvas，请升级浏览器
</canvas>
```

```javascript
// javascript
import SvgParse from 'svg-parse2point';
const svgParse = new SvgParse();



// rect parse
const pointArray = svgParse.rectParse(2500, 1000, 1000, 1000, 30, 30, 'matrix(0.8938 0.4484 -0.4484 0.8938 96.9396 -59.4412)')
// or path parse
const pointArray = svgParse.pathParse('M3676.5,1589.5c0,0-491-561-361,383s-121,1126-313,1070s-312,857,61,909s1700-126,1530-400 s379-1247,196-1365s26-809-374-635S3676.5,1589.5,3676.5,1589.5z', '', 20)
// or other tags parse...

// render
const cav = document.getElementById('myCanvas');
const ctx = cav.getContext('2d');

if (ctx) {
    ctx.beginPath()
    pointArray.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    })
    ctx.lineTo(pointArray[0].x, pointArray[0].y);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#00ffff';
    ctx.stroke();
}
```



## API



> #### pathParse  PATH标签解析

|     params      |              sense               |  type  | default | reruire |
| :-------------: | :------------------------------: | :----: | :-----: | :-----: |
| svgPathString |      path标签中d属性字符串       | string |   no    |  true   |
|   transfrom   |   transform矩阵转换属性字符串    | string |   no    |  false  |
| pointDensity  | 生成点密度，为曲线部分生成点密度 | number |   10    |  false  |

```javascript
/**
 *
 * @description parse Path
 * @param {string} svgPathString path标签D字符串（目前A标签还没有合适的算法来解析转点，欢迎贡献）
 * @param {string} [transfrom] 是否有矩阵换算
 * @param {number} [pointDensity=10] 生成点密度，主要为弧线部分 弧线默认转为10个点
 * @returns {SvgParse.Points}
 */

import SvgParse from 'svg-parse2point';
const svgParse = new SvgParse();

const pointArray = svgParse.pathParse('M3676.5,1589.5c0,0-491-561-361,383s-121,1126-313,1070s-312,857,61,909s1700-126,1530-400 s379-1247,196-1365s26-809-374-635S3676.5,1589.5,3676.5,1589.5z', 'matrix(0.8938 0.4484 -0.4484 0.8938 96.9396 -59.4412)', 20);
console.log('pointArray >>',pointArray) 
// [{x: 49.809,y:4.3577},{x: 49.2403,y: 8.6824},...{x:50,y:0}]

```

![path](https://test.cloudindoormap.com/H5/map/GitImg/SVGParse/path.png)


> #### circleParse CIRCLE标签解析

|    params    |            sense            |  type  | default | reruire |
| :----------: | :-------------------------: | :----: | :-----: | :-----: |
|      cx      |         中心点x坐标         | number |   no    |  true   |
|      cy      |         中心点y坐标         | number |   no    |  true   |
|      r       |            半径             | number |   no    |  true   |
|  transfrom   | transform矩阵转换属性字符串 | string |   no    |  false  |
| pointDensity |         生成点密度          | number |    5    |  false  |

```javascript
/**
 *
 * @description 根据圆形生成相应点阵坐标
 * @param {number} cx 中心点x坐标
 * @param {number} cy 中心点y坐标
 * @param {number} r 半径
 * @param {string} [transfrom] 是否有矩阵换算
 * @param {number} [pointDensity=5] 密度
 */

import SvgParse from 'svg-parse2point';
const svgParse = new SvgParse();

const pointArray = svgParse.circleParse(500, 500, 200);
console.log('pointArray >>',pointArray) 
// [{x: 699.2389396183491, y: 517.4311485495316},{x: 696.9615506024415, y: 534.7296355333862},{x: 693.1851652578137, y: 551.7638090205041},...{x: 700, y: 500}]
```

![circle](https://test.cloudindoormap.com/H5/map/GitImg/SVGParse/circle.png)


> #### ellipseParse ELLIPSE标签解析

|    params    |            sense            |  type  | default | reruire |
| :----------: | :-------------------------: | :----: | :-----: | :-----: |
|      cx      |         中心点x坐标         | number |   no    |  true   |
|      cy      |         中心点y坐标         | number |   no    |  true   |
|      rx      |           x轴半径           | number |   no    |  true   |
|      ry      |           y轴半径           | number |   no    |  true   |
|  transfrom   | transform矩阵转换属性字符串 | string |   no    |  false  |
| pointDensity |         生成点密度          | number |    2    |  false  |

```javascript
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

import SvgParse from 'svg-parse2point';
const svgParse = new SvgParse();

const pointArray = svgParse.ellipseParse(500, 500, 200, 100);
console.log('pointArray >>',pointArray) 
// [{x: 300, y: 500},{x: 302, y: 485.89326402033413},{x: 304, y: 480.10025125786757},{x: 306, y: 475.6895084377136},{x: 308, y: 472},...{x: 302, y: 514.1067359796659},{x: 300, y: 500}]
```

![ellipse](https://test.cloudindoormap.com/H5/map/GitImg/SVGParse/ellipse.png)



> #### polyParse POLYGON/POLYLINE标签解析

|   params    |            sense            |  type  | default | reruire |
| :---------: | :-------------------------: | :----: | :-----: | :-----: |
| parseString |         中心点x坐标         | string |   no    |  true   |
|  transfrom  | transform矩阵转换属性字符串 | string |   no    |  false  |

```javascript
/**
 *
 * @description 根据polygon或者polyline标签信息生成相应点阵坐标
 * @param {string} parseString polygon或者polyline标签信息
 * @param {string} [transfrom] 是否有矩阵换算
 */

import SvgParse from 'svg-parse2point';
const svgParse = new SvgParse();

const pointArray = svgParse.polyParse("500,50 200,990 950,390 50,390 800,990");
console.log('pointArray >>',pointArray) 
// [{x: 500, y: 50},{x: 200, y: 990},{x: 950, y: 390},{x: 50, y: 390},{x: 800, y: 990}]
```

![poly](https://test.cloudindoormap.com/H5/map/GitImg/SVGParse/poly.png)


> #### rectParse RECT标签解析

|    params    |            sense            |  type  | default | reruire |
| :----------: | :-------------------------: | :----: | :-----: | :-----: |
|      x       |       rect左上角坐标x       | number |   no    |  true   |
|      y       |       rect左上角坐标y       | number |   no    |  true   |
|    width     |         rect width          | number |   no    |  true   |
|    height    |         rect height         | number |   no    |  true   |
|      rx      |           圆角rx            | number |    0    |  false  |
|      ry      |           圆角ry            | number |    0    |  false  |
|  transfrom   | transform矩阵转换属性字符串 | string |   no    |  false  |
| pointDensity |         生成点密度          | number |   20    |  false  |

```javascript
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

import SvgParse from 'svg-parse2point';
const svgParse = new SvgParse();

const pointArray = svgParse.rectParse(100, 40, 350, 350, 30, 30, 'matrix(0.8938 0.4484 -0.4484 0.8938 96.9396 -59.4412)');
console.log('pointArray >>',pointArray) 
// [{x: 154.9316, y: 47.964800000000004},{x: 154.9316, y: 47.964800000000004},{x: 156.310205, y: 45.384065},{x: 157.75562, y: 43.00466000000001},...{x: 24.8956, y: 307.1668000000001}, {x: 24.8956, y: 307.1668000000001}]
```

![rect](https://test.cloudindoormap.com/H5/map/GitImg/SVGParse/rect.png)

## TODO

* Need to support arc commands.



If you find a bug, welcome to submit [issues](https://github.com/cangshudada/SVGParse/issues),THANKS！😉



## License

```
MIT License

Copyright (c) 2020 varon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
