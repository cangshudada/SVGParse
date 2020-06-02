import { pathParse } from '../core';
import { polyParse } from '../core';
import { circleParse } from '../core';
import { ellipseParse } from '../core';
import { rectParse } from '../core';

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
    const pointArray1 = circleParse(2500, 2500, 800);
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
    const pointArray2 = ellipseParse(2500, 2500, 1000, 600);
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
        ctx2.strokeStyle = '#ff0000';
        ctx2.stroke();
    }


    // path parse
    const pointArray3 = pathParse('M3676.5,1589.5c0,0-491-561-361,383s-121,1126-313,1070s-312,857,61,909s1700-126,1530-400 s379-1247,196-1365s26-809-374-635S3676.5,1589.5,3676.5,1589.5z', '', 20)
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
        ctx3.strokeStyle = '#ff0000';
        ctx3.stroke();
    }

    // polygon parse
    const pointArray4 = polyParse("2500,250 1000,4950 4750,1950 250,1950 4000,4950")
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
        ctx4.strokeStyle = '#ff0000';
        ctx4.stroke();
    }

    // polyline parse
    const pointArray5 = polyParse("2500,250 1000,4950 4750,1950 250,1950 4000,4950")
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
        ctx5.strokeStyle = '#ff0000';
        ctx5.stroke();
    }

    // polyline parse
    const pointArray6 = rectParse(2500, 1000, 1000, 1000, 30, 30, 'matrix(0.8938 0.4484 -0.4484 0.8938 96.9396 -59.4412)')
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
        ctx6.strokeStyle = '#ff0000';
        ctx6.stroke();
    }
};