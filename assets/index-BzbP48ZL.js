(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();function q(e,t){return e[0]>t&&e[1]>t?1:0}function A(e,t){return e>t?1:0}function B(e,t,n){let c=N((e-t)/(n-t),0,1);return c*c*(3-2*c)}function H(e,t){return Math.sqrt((e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1]))}function U(e){return e-Math.floor(e)}function _(e){return[e[0]-Math.floor(e[0]),e[1]-Math.floor(e[1])]}function N(e,t,n){return Math.min(Math.max(e,t),n)}function G(e,t,n){return[Math.min(Math.max(e[0],t[0]),n[0]),Math.min(Math.max(e[1],t[1]),n[1])]}function Y(e){return Math.sqrt(e[0]*e[0]+e[1]*e[1])}function $(e,t){return B(t-.02,t,e[1])-B(t,t+.02,e[1])}function J(e,t,n,c){const o=Math.abs(e[0]-t[0]),a=Math.abs(e[1]-t[1]);return o<=n/2&&a<=c/2?1:0}function z(e,t,n){return B(H(e,t),n-.008,n)}function C(e){return[Math.pow(e[0],2)-Math.pow(e[1],2),2*e[0]*e[1]]}function F(e,t){let n=[0,0];for(let c=0;c<t;c++)if(n=[C(n)[0]+e[0],C(n)[1]+e[1]],Y(n)>2)return c/t;return 1}function R(e,t){return[e[0]*t,e[1]*t]}function P(e,t){return[e[0]+t[0],e[1]+t[1]]}const D=Object.freeze(Object.defineProperty({__proto__:null,circle:z,clamp:N,clampVec2:G,distance:H,fract:U,fractVec2:_,iterateMandelbrot:F,lengthVec2:Y,move:P,plot:$,rectangle:J,smoothstep:B,squareImaginary:C,step:A,stepVec2:q,zoom:R},Symbol.toStringTag,{value:"Module"})),K=`// You can write code here! All vectors work like arrays (well they are arrays), there are some built in functions but you can make your own
// This text gets added in full as a script so you can define functions and do whatever your browser supports


//w - width of screen, h - width of screen, time (currently not working properly)
function shaderMain(x, y, w, h, time) {
  let fragColor = [1, 1, 1, 1]
  let uv = [x / w, y / h]

  uv = [uv[0] - 0.5, uv[1] - 0.5]
  uv = zoom(uv, zoomScale)
  uv = [uv[0] + 0.5, uv[1] + 0.5]
  uv = move(uv, [xScale, yScale])

  fragColor[0] = 1 - iterateMandelbrot(uv, 25)
  fragColor[1] = fragColor[0]

  // Try chaging the radius (the last parameter), refresh the shader and see what happens
  fragColor[2] = circle(uv, [0.5, 0.5], 0.01) 
  return fragColor
}
`,Q=`<h4><code>shaderMain(x, y, w, h, time)</code></h4>
<p>The main function your code must override. It's called for every pixel.
    <br> - <code>x, y</code>: The coordinate of the current pixel.
    <br> - <code>w, h</code>: The width and height of the canvas.
    <br> - <code>time</code>: The time in milliseconds since the page loaded.
    <br> Must return a color as <code>[r, g, b, a]</code> with values from 0.0 to 1.0.
</p>

<hr>
<h4>Global Variables</h4>
<p>These variables are available globally and reflect the current slider values.</p>
<p><code>zoomScale</code>: The current zoom level (number).</p>
<p><code>xScale</code>: The current X-axis translation (number).</p>
<p><code>yScale</code>: The current Y-axis translation (number).</p>

<hr>
<h4>Utility Functions</h4>

<h4><code>circle(uv, center, radius)</code></h4>
<p>Draws a smooth-edged circle. Returns 1.0 inside and 0.0 outside.</p>

<h4><code>rectangle(uv, center, width, height)</code></h4>
<p>Draws a hard-edged rectangle. Returns 1.0 inside and 0.0 outside.</p>

<h4><code>smoothstep(edge0, edge1, x)</code></h4>
<p>Performs smooth Hermite interpolation between 0 and 1 when <code>edge0 < x < edge1</code>.</p>

<h4><code>distance(vec1, vec2)</code></h4>
<p>Calculates the Euclidean distance between two points (e.g., <code>[x1, y1]</code> and <code>[x2, y2]</code>).</p>

<h4><code>clamp(value, min, max)</code></h4>
<p>Constrains a value to be within a specified range.</p>

<h4><code>lengthVec2(vec)</code></h4>
<p>Calculates the length of a 2D vector.</p>

<h4><code>fract(x)</code></h4>
<p>Returns the fractional part of a number (e.g., <code>fract(3.14)</code> returns <code>0.14</code>).</p>

<h4><code>step(edge, x)</code></h4>
<p>Generates a step function by comparing x to edge. Returns 0.0 if <code>x < edge</code> and 1.0 otherwise.</p>

<h4><code>plot(uv, percentage)</code></h4>
<p>Useful for plotting 2D functions. Creates a line at the given percentage of the height.</p>

<h4><code>iterateMandelbrot(coord, maxIterations)</code></h4>
<p>Calculates the Mandelbrot set value for a given coordinate.</p>

<h4><code>zoom(uv, amount)</code></h4>
<p>Scales a 2D vector (e.g., your UV coordinates) by a given amount.</p>

<h4><code>move(uv, amountVec)</code></h4>
<p>Translates a 2D vector by another 2D vector.</p>`,I=12,Z=400;let ee=800,te=800,h=3,O=3,S=null,j=!1,X=!1,V=!1,W=!1,E=3,T=0,L=0;function k(e,t,n,c=o=>o){return function(){S&&clearTimeout(S),h!==I&&(O=h,h<I&&(h=I),u());const o=c(parseFloat(e.value));n(o),t.innerHTML="  "+(Math.round(parseFloat(e.value)*100)/100).toFixed(2),u(),S=window.setTimeout(()=>{h=O,u()},Z)}}function ne(){console.log("%c My bad shader","font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"),console.log("%c It works but barely! Yay!","font-size: 20px;font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;");let e=document.getElementById("canvas");e.width=te,e.height=ee;let t=document.getElementById("resSlider");t.oninput=function(){h=parseFloat(t.value);let p=document.getElementById("resNum");p.innerHTML="  "+t.value,u()};let n=document.getElementById("zoomSlider");n.oninput=function(){E=parseFloat(n.value),u()};let c=document.getElementById("xSlider"),o=document.getElementById("xNum");c.oninput=k(c,o,p=>T=p);let a=document.getElementById("ySlider"),i=document.getElementById("yNum");a.oninput=k(a,i,p=>L=p,p=>-p);for(var g=document.getElementsByTagName("input"),m=0;m<g.length;m++)g[m].type=="checkbox"&&(g[m].checked=!1);var d=document.getElementById("code");d&&(d.innerHTML=K),u();const l=document.getElementById("invert");l&&(l.onchange=()=>{X=l.checked,u()});const s=document.getElementById("greyscale");s&&(s.onchange=()=>{j=s.checked,u()});const r=document.getElementById("flipX");r&&(r.onchange=()=>{V=r.checked,u()});const y=document.getElementById("flipY");y&&(y.onchange=()=>{W=y.checked,u()});const w=document.getElementById("refreshShaderBtn");w&&(w.onclick=()=>u());const b=document.getElementById("runCustomShaderBtn");b&&(b.onclick=()=>re());const x=document.getElementById("asciiDrawBtn");x&&(x.onclick=()=>ie());const f=document.getElementById("toggleDocsBtn"),v=document.getElementById("docsContainer");f&&v&&(v.innerHTML=Q,f.addEventListener("click",()=>{v.classList.toggle("hidden"),f.textContent=v.classList.contains("hidden")?"Show Docs":"Hide Docs"}))}function u(){const e=window.performance.now();ae();let t=document.getElementById("canvas");if(t.getContext){let o=t.getContext("2d");if(!o)return;const a=o.createImageData(t.width,t.height),i=a.data,g=t.width/h,m=t.height/h,d=Date.now();for(let l=0;l<m;l++)for(let s=0;s<g;s++){let r=window.shaderMain(V?g-s:s,W?m-l:l,g,m,d);if(X&&(r=[1-r[0],1-r[1],1-r[2],r[3]]),j){let f=ce([r[0],r[1],r[2]]);r=[f[0],f[1],f[2],r[3]]}const y=r[0]*255,w=r[1]*255,b=r[2]*255,x=r[3]*255;for(let f=0;f<h;f++)for(let v=0;v<h;v++){const p=s*h+v,M=((l*h+f)*t.width+p)*4;i[M]=y,i[M+1]=w,i[M+2]=b,i[M+3]=x}}o.putImageData(a,0,0)}let c=window.performance.now()-e;console.log(`The draw method took ${c} milliseconds.`)}function oe(e=20){const t="$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";let n="",c=document.getElementById("canvas"),o=c.getContext("2d");if(!o)return"Couldn't get canvas context.";const a=c.width,i=c.height;for(let d=0;d<i/e;d++){for(let l=0;l<a/e;l++)n+=g(m(o.getImageData(l*e,d*e,e,e).data))+" ";n+=`
`}return n;function g(d){return t[Math.round((t.length-1)*d)]}function m(d){let l=[];for(let r=0;r<d.length;r+=4){let y=(d[r]+d[r+1]+d[r+2]+d[r+3])/4;l.push(y)}let s=0;for(let r=0;r<l.length;r++)s+=l[r];return Math.round(s/l.length)/255}}function re(){let e=document.getElementsByTagName("head")[0],t=document.getElementById("customShader");t!==null&&t.remove();const n=document.createElement("script");n.id="customShader",n.type="text/javascript";const c=document.getElementById("code");n.innerHTML=c?c.value:"",e.appendChild(n),u()}function ce(e,t=1){let n=e[0]*.299+e[1]*.587+e[2]*.144;return[n,n,n]}function ae(){let e=document.getElementById("canvas");if(e.getContext){let t=e.getContext("2d");if(!t)return;t.clearRect(0,0,e.width,e.height)}}function ie(){let e=parseFloat(document.getElementById("asciiRes").value);e<7&&console.warn(`THIS WILL BE SLOW 
 It may not even finish 
 You have been warned (well you already clicked it so this isn't really a warning)`);let t=oe(e);console.log(t);let n=document.getElementById("asciiOut");n&&(n.innerHTML=t)}const le=(e,t,n,c,o)=>{let a=[1,1,1,1],i=[e/n,t/c];return i=[i[0]-.5,i[1]-.5],i=R(i,E),i=[i[0]+.5,i[1]+.5],i=P(i,[T,L]),a[0]=1-F(i,25),a[1]=a[0],a[2]=z(i,[.5,.5],.01),a};Object.keys(D).forEach(e=>{window[e]=D[e]});Object.defineProperty(window,"zoomScale",{get(){return E},configurable:!0});Object.defineProperty(window,"xScale",{get(){return T},configurable:!0});Object.defineProperty(window,"yScale",{get(){return L},configurable:!0});window.shaderMain=le;window.addEventListener("DOMContentLoaded",()=>{ne()});
