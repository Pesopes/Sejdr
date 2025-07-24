import * as shaderFns from './shaderFunctions';
import { zoomScale, xScale, yScale } from './canvas';
import { shaderMain } from './shader';

// This is needed so that the custom shader has access to these functions and variables

// Expose all shader functions
Object.keys(shaderFns).forEach(key => {
    (window as any)[key] = (shaderFns as any)[key];
});

// Expose state using getters
Object.defineProperty(window, 'zoomScale', {
    get() { return zoomScale; },
    configurable: true
});
Object.defineProperty(window, 'xScale', {
    get() { return xScale; },
    configurable: true
});
Object.defineProperty(window, 'yScale', {
    get() { return yScale; },
    configurable: true
});

(window as any).shaderMain = shaderMain;
