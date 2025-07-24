//
//  SHADER
//
//  TODO: make them general but typescript (js) overloading kinda sucks

import { zoom, move, iterateMandelbrot, circle } from "./shaderFunctions";
import { zoomScale, xScale, yScale } from "./canvas";



// THE shader
export const shaderMain = (x: number, y: number, w: number, h: number, time: number): [number, number, number, number] => {
    //you can write code here! All vectors work like arrays (well they are arrays), there are some built in functions but you can make your own
    //w - width of screen, h - width of screen, time (currently not working properly)
    let fragColor: [number, number, number, number] = [1, 1, 1, 1];
    let uv: [number, number] = [x / w, y / h]


    uv = [uv[0] - 0.5, uv[1] - 0.5]
    uv = zoom(uv, zoomScale)
    uv = [uv[0] + 0.5, uv[1] + 0.5]
    uv = move(uv, [xScale, yScale])

    fragColor[0] = (1 - iterateMandelbrot(uv, 25))
    fragColor[1] = fragColor[0]
    fragColor[2] = circle(uv, [0.5, 0.5], 0.01) // Try chaging the radius (the last parameter), refresh the shader and see what happens
    return fragColor;
}

