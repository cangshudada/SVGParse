import { polyParse, rectParse } from '../core';

test('rectParse', () => {
    expect(rectParse(100, 40, 350, 350)).toStrictEqual([
        { x: 100, y: 40 },
        { x: 450, y: 40 },
        { x: 450, y: 390 },
        { x: 100, y: 390 }
    ])
})

test('polyParse', () => {
    expect(polyParse("500,50 200,990 950,390 50,390 800,990")).toStrictEqual([
        { x: 500, y: 50 },
        { x: 200, y: 990 },
        { x: 950, y: 390 },
        { x: 50, y: 390 },
        { x: 800, y: 990 }
    ])
})
