import svgParse from '../core';

// const parseData = path2poly('M3,7 5-6 L1,7 1e2-.4 m-10,10 l10,0  \
// V27 89 H23           v10 h10             \
// C33,43 38,47 43,47   c0,5 5,10 10,10     \
// S63,67 63,67         s-10,10 10,10       \
// Q50,50 73,57         q20,-5 0,-10        \
// T70,40               t0,-15              \
// A5,5 45 1,0 40,20    a5,5 20 0,1 -10-10  Z')

// console.log('parseData', parseData)


window.onload = function () {
    const cav = document.getElementById('myCanvas') as HTMLCanvasElement;
    const ctx = cav.getContext('2d');
    const pointArray = svgParse.rectParse(44, 45, 260, 260, 20, 20, "matrix(0.8938 0.4484 -0.4484 0.8938 96.9396 -59.4412)", 20);
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
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }
};