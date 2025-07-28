(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function q(e,t){return e[0]>t&&e[1]>t?1:0}function A(e,t){return e>t?1:0}function B(e,t,n){let a=N((e-t)/(n-t),0,1);return a*a*(3-2*a)}function H(e,t){return Math.sqrt((e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1]))}function U(e){return e-Math.floor(e)}function _(e){return[e[0]-Math.floor(e[0]),e[1]-Math.floor(e[1])]}function N(e,t,n){return Math.min(Math.max(e,t),n)}function G(e,t,n){return[Math.min(Math.max(e[0],t[0]),n[0]),Math.min(Math.max(e[1],t[1]),n[1])]}function Y(e){return Math.sqrt(e[0]*e[0]+e[1]*e[1])}function $(e,t){return B(t-.02,t,e[1])-B(t,t+.02,e[1])}function J(e,t,n,a){const o=Math.abs(e[0]-t[0]),r=Math.abs(e[1]-t[1]);return o<=n/2&&r<=a/2?1:0}function z(e,t,n){return B(H(e,t),n-.008,n)}function C(e){return[Math.pow(e[0],2)-Math.pow(e[1],2),2*e[0]*e[1]]}function F(e,t){let n=[0,0];for(let a=0;a<t;a++)if(n=[C(n)[0]+e[0],C(n)[1]+e[1]],Y(n)>2)return a/t;return 1}function R(e,t){return[e[0]*t,e[1]*t]}function P(e,t){return[e[0]+t[0],e[1]+t[1]]}const D=Object.freeze(Object.defineProperty({__proto__:null,circle:z,clamp:N,clampVec2:G,distance:H,fract:U,fractVec2:_,iterateMandelbrot:F,lengthVec2:Y,move:P,plot:$,rectangle:J,smoothstep:B,squareImaginary:C,step:A,stepVec2:q,zoom:R},Symbol.toStringTag,{value:"Module"})),K=`// You can write code here! All vectors work like arrays (well they are arrays), there are some built in functions but you can make your own
// This text gets added in full as a script so you can define functions and do whatever your browser supports


//w - width of screen, h - width of screen, time (currently not working properly)
function shaderMain(x, y, w, h) {
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
<p>Translates a 2D vector by another 2D vector.</p>`,I=12,Z=400;let ee=800,te=800,h=3,O=3,S=null,j=!1,X=!1,V=!1,W=!1,E=3,T=0,L=0;function k(e,t,n,a=o=>o){return function(){S&&clearTimeout(S),h!==I&&(O=h,h<I&&(h=I),u());const o=a(parseFloat(e.value));n(o),t.innerHTML="  "+(Math.round(parseFloat(e.value)*100)/100).toFixed(2),u(),S=window.setTimeout(()=>{h=O,u()},Z)}}function ne(){console.log("%c My bad shader","font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"),console.log("%c It works but barely! Yay!","font-size: 20px;font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;");let e=document.getElementById("canvas");e.width=te,e.height=ee;let t=document.getElementById("resSlider");t.oninput=function(){h=parseFloat(t.value);let p=document.getElementById("resNum");p.innerHTML="  "+t.value,u()};let n=document.getElementById("zoomSlider");n.oninput=function(){E=parseFloat(n.value),u()};let a=document.getElementById("xSlider"),o=document.getElementById("xNum");a.oninput=k(a,o,p=>T=p);let r=document.getElementById("ySlider"),d=document.getElementById("yNum");r.oninput=k(r,d,p=>L=p,p=>-p);for(var g=document.getElementsByTagName("input"),m=0;m<g.length;m++)g[m].type=="checkbox"&&(g[m].checked=!1);var l=document.getElementById("code");l&&(l.innerHTML=K),u();const i=document.getElementById("invert");i&&(i.onchange=()=>{X=i.checked,u()});const s=document.getElementById("greyscale");s&&(s.onchange=()=>{j=s.checked,u()});const c=document.getElementById("flipX");c&&(c.onchange=()=>{V=c.checked,u()});const y=document.getElementById("flipY");y&&(y.onchange=()=>{W=y.checked,u()});const w=document.getElementById("refreshShaderBtn");w&&(w.onclick=()=>u());const b=document.getElementById("runCustomShaderBtn");b&&(b.onclick=()=>re());const x=document.getElementById("asciiDrawBtn");x&&(x.onclick=()=>ie());const f=document.getElementById("toggleDocsBtn"),v=document.getElementById("docsContainer");f&&v&&(v.innerHTML=Q,f.addEventListener("click",()=>{v.classList.toggle("hidden"),f.textContent=v.classList.contains("hidden")?"Show Docs":"Hide Docs"}))}function u(){const e=window.performance.now();ae();let t=document.getElementById("canvas");if(t.getContext){let o=t.getContext("2d");if(!o)return;const r=o.createImageData(t.width,t.height),d=r.data,g=t.width/h,m=t.height/h,l=Date.now();for(let i=0;i<m;i++)for(let s=0;s<g;s++){let c=window.shaderMain(V?g-s:s,W?m-i:i,g,m,l);if(X&&(c=[1-c[0],1-c[1],1-c[2],c[3]]),j){let f=ce([c[0],c[1],c[2]]);c=[f[0],f[1],f[2],c[3]]}const y=c[0]*255,w=c[1]*255,b=c[2]*255,x=c[3]*255;for(let f=0;f<h;f++)for(let v=0;v<h;v++){const p=s*h+v,M=((i*h+f)*t.width+p)*4;d[M]=y,d[M+1]=w,d[M+2]=b,d[M+3]=x}}o.putImageData(r,0,0)}let a=window.performance.now()-e;console.log(`The draw method took ${a} milliseconds.`)}function oe(e=20){const t="$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";let n="",a=document.getElementById("canvas"),o=a.getContext("2d");if(!o)return"Couldn't get canvas context.";const r=a.width,d=a.height;for(let l=0;l<d/e;l++){for(let i=0;i<r/e;i++)n+=g(m(o.getImageData(i*e,l*e,e,e).data))+" ";n+=`
`}return n;function g(l){return t[Math.round((t.length-1)*l)]}function m(l){let i=[];for(let c=0;c<l.length;c+=4){let y=(l[c]+l[c+1]+l[c+2]+l[c+3])/4;i.push(y)}let s=0;for(let c=0;c<i.length;c++)s+=i[c];return Math.round(s/i.length)/255}}function re(){let e=document.getElementsByTagName("head")[0],t=document.getElementById("customShader");t!==null&&t.remove();const n=document.createElement("script");n.id="customShader",n.type="text/javascript";const a=document.getElementById("code");n.innerHTML=a?a.value:"",e.appendChild(n),u()}function ce(e){let t=e[0]*.299+e[1]*.587+e[2]*.144;return[t,t,t]}function ae(){let e=document.getElementById("canvas");if(e.getContext){let t=e.getContext("2d");if(!t)return;t.clearRect(0,0,e.width,e.height)}}function ie(){let e=parseFloat(document.getElementById("asciiRes").value);e<7&&console.warn(`THIS WILL BE SLOW 
 It may not even finish 
 You have been warned (well you already clicked it so this isn't really a warning)`);let t=oe(e);console.log(t);let n=document.getElementById("asciiOut");n&&(n.innerHTML=t)}const le=(e,t,n,a)=>{let o=[1,1,1,1],r=[e/n,t/a];return r=[r[0]-.5,r[1]-.5],r=R(r,E),r=[r[0]+.5,r[1]+.5],r=P(r,[T,L]),o[0]=1-F(r,25),o[1]=o[0],o[2]=z(r,[.5,.5],.01),o};Object.keys(D).forEach(e=>{window[e]=D[e]});Object.defineProperty(window,"zoomScale",{get(){return E},configurable:!0});Object.defineProperty(window,"xScale",{get(){return T},configurable:!0});Object.defineProperty(window,"yScale",{get(){return L},configurable:!0});window.shaderMain=le;window.addEventListener("DOMContentLoaded",()=>{ne()});
