declare namespace SvgParse {
    type Point = Record<'x' | 'y', number>
    type Points = Point[]
}

declare module 'svg-path-parser' {
    export function parseSVG(input: string): Command[];
    export function makeAbsolute(commands: Command[]): Command[];

    type Command = MoveToCommand |
        LineToCommand |
        HorizontalLineToCommand |
        VerticalLineToCommand |
        ClosePathCommand |
        CurveToCommand |
        SmoothCurveToCommand |
        QuadraticCurveToCommand |
        SmoothQuadraticCurveToCommand |
        EllipticalArcCommand;

    interface MoveToCommand {
        code: 'm' | 'M';
        command: 'moveto';
        relative?: boolean;
        x: number;
        y: number;
    }

    interface LineToCommand {
        code: 'l' | 'L';
        command: 'lineto';
        relative?: boolean;
        x: number;
        y: number;
    }

    interface HorizontalLineToCommand {
        code: 'h' | 'H';
        command: 'horizontal lineto';
        relative?: boolean;
        x: number;
    }

    interface VerticalLineToCommand {
        code: 'v' | 'V';
        command: 'vertical lineto';
        relative?: boolean;
        y: number;
    }

    interface ClosePathCommand {
        code: 'z' | 'Z';
        command: 'closepath';
        relative?: boolean;
    }

    interface CurveToCommand {
        code: 'c' | 'C';
        command: 'curveto';
        relative?: boolean;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        x: number;
        y: number;
    }

    interface SmoothCurveToCommand {
        code: 's' | 'S';
        command: 'smooth curveto';
        relative?: boolean;
        x2: number;
        y2: number;
        x: number;
        y: number;
    }

    interface QuadraticCurveToCommand {
        code: 'q' | 'Q';
        command: 'quadratic curveto';
        relative?: boolean;
        x1: number;
        y1: number;
        x: number;
        y: number;
    }

    interface SmoothQuadraticCurveToCommand {
        code: 't' | 'T';
        command: 'smooth quadratic curveto';
        relative?: boolean;
        x: number;
        y: number;
    }

    interface EllipticalArcCommand {
        code: 'a' | 'A';
        command: 'elliptical arc';
        relative?: boolean;
        rx: number;
        ry: number;
        xAxisRotation: number;
        largeArc: boolean;
        sweep: boolean;
        x: number;
        y: number;
    }
}
