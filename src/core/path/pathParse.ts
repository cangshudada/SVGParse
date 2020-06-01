import { parseSVG, makeAbsolute } from 'svg-path-parser';

export const pathParse = (svgPathString: string): SvgParse.Points => {
    const _pathParse = [] as SvgParse.Points;

    makeAbsolute(parseSVG(svgPathString)).forEach(cmd => {
        console.log('cmd', cmd)
        switch (cmd.code) {
            case 'M':
            case 'm': {
                _pathParse.push({
                    x: cmd.x,
                    y: cmd.y
                })
            }
                break;

            case 'L':
            case 'l': {
                _pathParse.push({
                    x: cmd.x,
                    y: cmd.y
                })
            }
                break;
        }
    });

    return _pathParse;
}