import { pathParse } from './core';
import { polyParse } from './core';
import { circleParse } from './core';
import { ellipseParse } from './core';
import { rectParse } from './core';

class SvgParse {
    public pathParse = pathParse
    public polyParse = polyParse
    public circleParse = circleParse
    public ellipseParse = ellipseParse
    public rectParse = rectParse
}


// If you want to see the examples, please unzip the comment
// import './example';

export default SvgParse;