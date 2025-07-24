(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();function X(e,t){return e[0]>t&&e[1]>t?1:0}function _(e,t){return e>t?1:0}function b(e,t,n){let r=z((e-t)/(n-t),0,1);return r*r*(3-2*r)}function N(e,t){return Math.sqrt((e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1]))}function G(e){return e-Math.floor(e)}function $(e){return[e[0]-Math.floor(e[0]),e[1]-Math.floor(e[1])]}function z(e,t,n){return Math.min(Math.max(e,t),n)}function J(e,t,n){return[Math.min(Math.max(e[0],t[0]),n[0]),Math.min(Math.max(e[1],t[1]),n[1])]}function F(e){return Math.sqrt(e[0]*e[0]+e[1]*e[1])}function K(e,t){return b(t-.02,t,e[1])-b(t,t+.02,e[1])}function Q(e,t,n,r){const o=Math.abs(e[0]-t[0]),c=Math.abs(e[1]-t[1]);return o<=n/2&&c<=r/2?1:0}function P(e,t,n){return b(N(e,t),n-.008,n)}function B(e){return[Math.pow(e[0],2)-Math.pow(e[1],2),2*e[0]*e[1]]}function j(e,t){let n=[0,0];for(let r=0;r<t;r++)if(n=[B(n)[0]+e[0],B(n)[1]+e[1]],F(n)>2)return r/t;return 1}function Y(e,t){return[e[0]*t,e[1]*t]}function V(e,t){return[e[0]+t[0],e[1]+t[1]]}const O=Object.freeze(Object.defineProperty({__proto__:null,circle:P,clamp:z,clampVec2:J,distance:N,fract:G,fractVec2:$,iterateMandelbrot:j,lengthVec2:F,move:V,plot:K,rectangle:Q,smoothstep:b,squareImaginary:B,step:_,stepVec2:X,zoom:Y},Symbol.toStringTag,{value:"Module"})),Z=`// You can write code here! All vectors work like arrays (well they are arrays), there are some built in functions but you can make your own
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
`,ee=`<h4><code>shaderMain(x, y, w, h, time)</code></h4>
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
<p>Translates a 2D vector by another 2D vector.</p>`,k=20,R=7,te=400;let ne=800,oe=800,s=3,M=3,w=!0,S=null,p=null,W=!1,q=!1,A=!1,U=!1,I=3,C=0,E=0;function H(e,t,n,r=o=>o){return function(){S&&clearTimeout(S),S=setTimeout(()=>{p=setInterval(()=>{M<s?(s-R<M?s-=1:s-=R,h(),w=!1):(w=!0,p&&clearTimeout(p),p=null)},50),h()},te),w&&(M=s,s=k,w=!1),p!=null&&(s=k,clearTimeout(p),p=null);const o=r(parseFloat(e.value));n(o),t.innerHTML="  "+(Math.round(parseFloat(e.value)*100)/100).toFixed(2),h()}}function re(){console.log("%c My bad shader","font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"),console.log("%c It works but barely! Yay!","font-size: 20px;font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;");let e=document.getElementById("canvas");e.width=oe,e.height=ne;let t=document.getElementById("resSlider");t.oninput=function(){s=parseFloat(t.value);let g=document.getElementById("resNum");g.innerHTML="  "+t.value,h()};let n=document.getElementById("zoomSlider");n.oninput=function(){I=parseFloat(n.value),h()};let r=document.getElementById("xSlider"),o=document.getElementById("xNum");r.oninput=H(r,o,g=>C=g);let c=document.getElementById("ySlider"),l=document.getElementById("yNum");c.oninput=H(c,l,g=>E=g,g=>-g);for(var m=document.getElementsByTagName("input"),u=0;u<m.length;u++)m[u].type=="checkbox"&&(m[u].checked=!1);var i=document.getElementById("code");i&&(i.innerHTML=Z),h();const a=document.getElementById("invert");a&&(a.onchange=()=>{q=a.checked,h()});const f=document.getElementById("greyscale");f&&(f.onchange=()=>{W=f.checked,h()});const d=document.getElementById("flipX");d&&(d.onchange=()=>{A=d.checked,h()});const v=document.getElementById("flipY");v&&(v.onchange=()=>{U=v.checked,h()});const T=document.getElementById("refreshShaderBtn");T&&(T.onclick=()=>h());const L=document.getElementById("runCustomShaderBtn");L&&(L.onclick=()=>ae());const D=document.getElementById("asciiDrawBtn");D&&(D.onclick=()=>se());const x=document.getElementById("toggleDocsBtn"),y=document.getElementById("docsContainer");x&&y&&(y.innerHTML=ee,x.addEventListener("click",()=>{y.classList.toggle("hidden"),x.textContent=y.classList.contains("hidden")?"Show Docs":"Hide Docs"}))}function h(){const e=window.performance.now();de();let t=document.getElementById("canvas");if(t.getContext){let o=t.getContext("2d");if(!o)return;const c=t.width/s,l=t.height/s,m=Date.now();for(let u=0;u<l;u++)for(let i=0;i<c;i++){let a=window.shaderMain(A?l-u:u,U?c-i:i,c,l,m);if(q&&(a=[1-a[0],1-a[1],1-a[2],a[3]]),W){let f=ie([a[0],a[1],a[2]]);a=[f[0],f[1],f[2],a[3]]}o.fillStyle=le([a[0],a[1],a[2]],a[3]),o.fillRect(u*s,i*s,s,s)}}let r=window.performance.now()-e;console.log(`The draw method took ${r} milliseconds.`)}function ce(e=20){const t="$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";let n="",r=document.getElementById("canvas"),o=r.getContext("2d");if(!o)return"Couldn't get canvas context.";const c=r.width,l=r.height;for(let i=0;i<l/e;i++){for(let a=0;a<c/e;a++)n+=m(u(o.getImageData(a*e,i*e,e,e).data))+" ";n+=`
`}return n;function m(i){return t[Math.round((t.length-1)*i)]}function u(i){let a=[];for(let d=0;d<i.length;d+=4){let v=(i[d]+i[d+1]+i[d+2]+i[d+3])/4;a.push(v)}let f=0;for(let d=0;d<a.length;d++)f+=a[d];return Math.round(f/a.length)/255}}function ae(){let e=document.getElementsByTagName("head")[0],t=document.getElementById("customShader");t!==null&&t.remove();const n=document.createElement("script");n.id="customShader",n.type="text/javascript";const r=document.getElementById("code");n.innerHTML=r?r.value:"",e.appendChild(n),h()}function le(e,t=1){return"rgba("+e[0]*255+","+e[1]*255+","+e[2]*255+","+t+")"}function ie(e,t=1){let n=e[0]*.299+e[1]*.587+e[2]*.144;return[n,n,n]}function de(){let e=document.getElementById("canvas");if(e.getContext){let t=e.getContext("2d");if(!t)return;t.clearRect(0,0,e.width,e.height)}}function se(){let e=parseFloat(document.getElementById("asciiRes").value);e<7&&console.warn(`THIS WILL BE SLOW 
 It may not even finish 
 You have been warned (well you already clicked it so this isn't really a warning)`);let t=ce(e);console.log(t);let n=document.getElementById("asciiOut");n&&(n.innerHTML=t)}const ue=(e,t,n,r,o)=>{let c=[1,1,1,1],l=[e/n,t/r];return l=[l[0]-.5,l[1]-.5],l=Y(l,I),l=[l[0]+.5,l[1]+.5],l=V(l,[C,E]),c[0]=1-j(l,25),c[1]=c[0],c[2]=P(l,[.5,.5],.01),c};Object.keys(O).forEach(e=>{window[e]=O[e]});Object.defineProperty(window,"zoomScale",{get(){return I},configurable:!0});Object.defineProperty(window,"xScale",{get(){return C},configurable:!0});Object.defineProperty(window,"yScale",{get(){return E},configurable:!0});window.shaderMain=ue;window.addEventListener("DOMContentLoaded",()=>{re()});
