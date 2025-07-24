//
// SHADER FUNCTIONS
//
//I wont explain what these do just go to thebookofshaders.com lol

export function stepVec2(xy: [number, number], edge: number) {

    if (xy[0] > edge && xy[1] > edge)
        return 1
    else return 0
}

export function step(x, edge: number) {

    if (x > edge)
        return 1
    else return 0
}

export function smoothstep(x, edge0, edge1) {
    let t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}

export function distance(xy1: [number, number], xy2: [number, number]) {
    return Math.sqrt((xy1[0] - xy2[0]) * (xy1[0] - xy2[0]) + (xy1[1] - xy2[1]) * (xy1[1] - xy2[1]))
}

export function fract(x: number) {
    return x - Math.floor(x)
}

export function fractVec2(xy: [number, number]): [number, number] {
    return [xy[0] - Math.floor(xy[0]), xy[1] - Math.floor(xy[1])]
}

export function clamp(x: number, minVal: number, maxVal: number) {
    return Math.min(Math.max(x, minVal), maxVal)
}
export function clampVec2(xy: [number, number], minVal: [number, number], maxVal: [number, number]) {
    return [Math.min(Math.max(xy[0], minVal[0]), maxVal[0]), Math.min(Math.max(xy[1], minVal[1]), maxVal[1])]
}
export function lengthVec2(xy: [number, number]) {
    return Math.sqrt(xy[0] * xy[0] + xy[1] * xy[1])
}

//I dont even remember adding this here
export function plot(st: [number, number], pct: number) {
    return smoothstep(pct - 0.02, pct, st[1]) -
        smoothstep(pct, pct + 0.02, st[1]);
}
//does not work (obviously)
export function rectangle(uv: [number, number], w: number, h: number) {

    console.log("IDK");
}


//smooth circle TODO: add how much SMOOTH hmmmm
export function circle(uv: [number, number], pos: [number, number], radius: number) {
    //let st: [number,number] = [uv[0]-pos[0],uv[1]-pos[1]]
    return smoothstep(distance(uv, pos), radius - 0.008, radius)
}

//things for mandelbrot (i have no idea)
export function squareImaginary(number: [number, number]) {
    return [
        Math.pow(number[0], 2) - Math.pow(number[1], 2),
        2 * number[0] * number[1]
    ]
}

export function iterateMandelbrot(coord: [number, number], maxIterations: number) {
    let z: [number, number] = [0, 0];
    for (let i = 0; i < maxIterations; i++) {
        z = [squareImaginary(z)[0] + coord[0], squareImaginary(z)[1] + coord[1]];
        if (lengthVec2(z) > 2) return i / maxIterations;
    }
    return 1;
}

//zooms ...
export function zoom(uv: [number, number], num: number): [number, number] {
    return [uv[0] * num, uv[1] * num]
}

//translates by pos
export function move(uv: [number, number], pos: [number, number]): [number, number] {
    return [uv[0] + pos[0], uv[1] + pos[1]]
}