# Sejdr

A web-based fragment shader tool built with JavaScript and the HTML5 Canvas. You
can write and run custom fragment shaders directly in your browser. Everything
is just JavaScript on the cpu so the syntax is easy to understand.

**[Website link](https://pesopes.github.io/Sejdr/)**

## Extra features

- **Live Shader Editor**: Write JavaScript code that functions as a fragment
  shader.
- **Interactive Controls**: There are sliders for moving, zooming etc. Of course
  how you use these values is always up to you and the code.
- **Built-in GLSL-like Functions**: I implemented some common shader utility
  functions (`smoothstep`, `clamp`, `distance`, etc.).
- **Custom Function Documentation**: You can see all the predefined functions
  here.
- **Filters**: You can easily apply filters to the canvas (Invert colours,
  Greyscale, Flip X, Flip Y)
- **ASCII Art Generator**: Convert your shader's visual output into ASCII art.

## How It Works

The core of the project is a `draw()` function that iterates through each
"pixel" (a scaled rectangle) of the canvas. For each pixel, it calls a
`shaderMain(x, y, w, h, time)` function, which is expected to return a colour
`[r, g, b, a]`, and draws this returned colour.

Users can write their own `shaderMain` function in the provided textarea. When
the "Run Custom Shader" button is clicked, this custom code is injected into the
document via a `<script>` tag, overriding the default `shaderMain` function.

The main trick to make this work with Vite is to export all needed variables
(width,xScale,...) to `window` with getters so that the custom script has access
to all these variables.
