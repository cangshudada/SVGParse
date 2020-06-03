import { pathParse, polyParse, circleParse, ellipseParse, rectParse } from '../core';

window.onload = function () {
    const cav1 = document.getElementById('myCanvas1') as HTMLCanvasElement;
    const ctx1 = cav1.getContext('2d');

    const cav2 = document.getElementById('myCanvas2') as HTMLCanvasElement;
    const ctx2 = cav2.getContext('2d');

    const cav3 = document.getElementById('myCanvas3') as HTMLCanvasElement;
    const ctx3 = cav3.getContext('2d');

    const cav4 = document.getElementById('myCanvas4') as HTMLCanvasElement;
    const ctx4 = cav4.getContext('2d');

    const cav5 = document.getElementById('myCanvas5') as HTMLCanvasElement;
    const ctx5 = cav5.getContext('2d');

    const cav6 = document.getElementById('myCanvas6') as HTMLCanvasElement;
    const ctx6 = cav6.getContext('2d');

    // circle parse
    const pointArray1 = circleParse(500, 500, 200);
    if (ctx1) {
        ctx1.beginPath()
        pointArray1.forEach((point, index) => {
            if (index === 0) {
                ctx1.moveTo(point.x, point.y);
            } else {
                ctx1.lineTo(point.x, point.y);
            }
        })
        ctx1.lineTo(pointArray1[0].x, pointArray1[0].y);
        ctx1.lineWidth = 6;
        ctx1.strokeStyle = '#ff0000';
        ctx1.stroke();
    }

    // ellipse parse
    const pointArray2 = ellipseParse(500, 500, 200, 100);
    if (ctx2) {
        ctx2.beginPath()
        pointArray2.forEach((point, index) => {
            if (index === 0) {
                ctx2.moveTo(point.x, point.y);
            } else {
                ctx2.lineTo(point.x, point.y);
            }
        })
        ctx2.lineTo(pointArray2[0].x, pointArray2[0].y);
        ctx2.lineWidth = 6;
        ctx2.strokeStyle = '#00ff00';
        ctx2.stroke();
    }


    // path parse
    const pointArray3 = pathParse('M382.2,547.1c-66.6,32-177.6,4.1-193.4,0c32.1-12.6,73.5-33.2,76.7-60.7c3.8-32.6-49.2-46.6-90-93.1 c-59.6-67.9-41-145.5-23.3-147.8c16.8-2.2,35.3,63.8,76.7,64.8c53.2,1.2,76-106.2,120.1-105.3c48.5,1,74,132.6,76.7,216.6 C428.7,518.3,401,538.1,382.2,547.1z', '', 20)
    if (ctx3) {
        ctx3.beginPath()
        pointArray3.forEach((point, index) => {
            if (index === 0) {
                ctx3.moveTo(point.x, point.y);
            } else {
                ctx3.lineTo(point.x, point.y);
            }
        })
        ctx3.lineTo(pointArray3[0].x, pointArray3[0].y);
        ctx3.lineWidth = 6;
        ctx3.strokeStyle = '#0000ff';
        ctx3.stroke();
    }

    // polygon parse
    const pointArray4 = polyParse("500,50 200,990 950,390 50,390 800,990")
    if (ctx4) {
        ctx4.beginPath()
        pointArray4.forEach((point, index) => {
            if (index === 0) {
                ctx4.moveTo(point.x, point.y);
            } else {
                ctx4.lineTo(point.x, point.y);
            }
        })
        ctx4.lineTo(pointArray4[0].x, pointArray4[0].y);
        ctx4.lineWidth = 6;
        ctx4.strokeStyle = '#ffff00';
        ctx4.stroke();
    }

    // polyline parse
    const pointArray5 = polyParse("500,50 200,990 950,390 50,390 800,990")
    if (ctx5) {
        ctx5.beginPath()
        pointArray5.forEach((point, index) => {
            if (index === 0) {
                ctx5.moveTo(point.x, point.y);
            } else {
                ctx5.lineTo(point.x, point.y);
            }
        })
        ctx5.lineTo(pointArray5[0].x, pointArray5[0].y);
        ctx5.lineWidth = 6;
        ctx5.strokeStyle = '#00ffff';
        ctx5.stroke();
    }

    // polyline parse
    const pointArray6 = rectParse(100, 40, 350, 350, 30, 30, 'matrix(0.8938 0.4484 -0.4484 0.8938 96.9396 -59.4412)')
    if (ctx6) {
        ctx6.beginPath()
        pointArray6.forEach((point, index) => {
            if (index === 0) {
                ctx6.moveTo(point.x, point.y);
            } else {
                ctx6.lineTo(point.x, point.y);
            }
        })
        ctx6.lineTo(pointArray6[0].x, pointArray6[0].y);
        ctx6.lineWidth = 6;
        ctx6.strokeStyle = '#ff00ff';
        ctx6.stroke();
    }
};