import { pathParse } from './path/pathParse';
import { polyParse } from './polygon/polyParse';
import { circleParse } from './circle/circleParse';
import { ellipseParse } from './ellipse/ellipseParse';
import { rectParse } from './rect/rectParse';

export default {
    pathParse,
    polyParse,
    polylineParse: polyParse,
    circleParse,
    ellipseParse,
    rectParse
}
