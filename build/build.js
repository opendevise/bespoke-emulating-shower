!function e(t,n,r){function i(s,a){if(!n[s]){if(!t[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return i(n?n:e)},c,c.exports,e,t,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t){var n="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},r=function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=n.Prism={util:{encode:function(e){return e instanceof r?new r(e.type,t.util.encode(e.content),e.alias):"Array"===t.util.type(e)?e.map(t.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.map&&e.map(function(e){return t.util.clone(e)})}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var o=i[e];if(2==arguments.length){r=arguments[1];for(var s in r)r.hasOwnProperty(s)&&(o[s]=r[s]);return o}var a={};for(var l in o)if(o.hasOwnProperty(l)){if(l==n)for(var s in r)r.hasOwnProperty(s)&&(a[s]=r[s]);a[l]=o[l]}return t.languages.DFS(t.languages,function(t,n){n===i[e]&&t!=e&&(this[t]=a)}),i[e]=a},DFS:function(e,n,r){for(var i in e)e.hasOwnProperty(i)&&(n.call(e,i,e[i],r||i),"Object"===t.util.type(e[i])?t.languages.DFS(e[i],n):"Array"===t.util.type(e[i])&&t.languages.DFS(e[i],n,i))}},highlightAll:function(e,n){for(var r,i=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),o=0;r=i[o++];)t.highlightElement(r,e===!0,n)},highlightElement:function(i,o,s){for(var a,l,c=i;c&&!e.test(c.className);)c=c.parentNode;c&&(a=(c.className.match(e)||[,""])[1],l=t.languages[a]),i.className=i.className.replace(e,"").replace(/\s+/g," ")+" language-"+a,c=i.parentNode,/pre/i.test(c.nodeName)&&(c.className=c.className.replace(e,"").replace(/\s+/g," ")+" language-"+a);var u=i.textContent,p={element:i,language:a,grammar:l,code:u};if(!u||!l)return t.hooks.run("complete",p),void 0;if(t.hooks.run("before-highlight",p),o&&n.Worker){var d=new Worker(t.filename);d.onmessage=function(e){p.highlightedCode=r.stringify(JSON.parse(e.data),a),t.hooks.run("before-insert",p),p.element.innerHTML=p.highlightedCode,s&&s.call(p.element),t.hooks.run("after-highlight",p),t.hooks.run("complete",p)},d.postMessage(JSON.stringify({language:p.language,code:p.code}))}else p.highlightedCode=t.highlight(p.code,p.grammar,p.language),t.hooks.run("before-insert",p),p.element.innerHTML=p.highlightedCode,s&&s.call(i),t.hooks.run("after-highlight",p),t.hooks.run("complete",p)},highlight:function(e,n,i){var o=t.tokenize(e,n);return r.stringify(t.util.encode(o),i)},tokenize:function(e,n){var r=t.Token,i=[e],o=n.rest;if(o){for(var s in o)n[s]=o[s];delete n.rest}e:for(var s in n)if(n.hasOwnProperty(s)&&n[s]){var a=n[s];a="Array"===t.util.type(a)?a:[a];for(var l=0;l<a.length;++l){var c=a[l],u=c.inside,p=!!c.lookbehind,d=0,f=c.alias;c=c.pattern||c;for(var v=0;v<i.length;v++){var m=i[v];if(i.length>e.length)break e;if(!(m instanceof r)){c.lastIndex=0;var g=c.exec(m);if(g){p&&(d=g[1].length);var h=g.index-1+d,g=g[0].slice(d),b=g.length,y=h+b,k=m.slice(0,h+1),w=m.slice(y+1),x=[v,1];k&&x.push(k);var E=new r(s,u?t.tokenize(g,u):g,f);x.push(E),w&&x.push(w),Array.prototype.splice.apply(i,x)}}}}}return i},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[],r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(r&&r.length)for(var i,o=0;i=r[o++];)i(n)}}},r=t.Token=function(e,t,n){this.type=e,this.content=t,this.alias=n};if(r.stringify=function(e,n,i){if("string"==typeof e)return e;if("Array"===t.util.type(e))return e.map(function(t){return r.stringify(t,n,e)}).join("");var o={type:e.type,content:r.stringify(e.content,n,i),tag:"span",classes:["token",e.type],attributes:{},language:n,parent:i};if("comment"==o.type&&(o.attributes.spellcheck="true"),e.alias){var s="Array"===t.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(o.classes,s)}t.hooks.run("wrap",o);var a="";for(var l in o.attributes)a+=l+'="'+(o.attributes[l]||"")+'"';return"<"+o.tag+' class="'+o.classes.join(" ")+'" '+a+">"+o.content+"</"+o.tag+">"},!n.document)return n.addEventListener?(n.addEventListener("message",function(e){var r=JSON.parse(e.data),i=r.language,o=r.code;n.postMessage(JSON.stringify(t.util.encode(t.tokenize(o,t.languages[i])))),n.close()},!1),n.Prism):n.Prism;var i=document.getElementsByTagName("script");return i=i[i.length-1],i&&(t.filename=i.src,document.addEventListener&&!i.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll)),n.Prism}();"undefined"!=typeof t&&t.exports&&(t.exports=r),r.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},r.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),r.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},r.languages.css.atrule.inside.rest=r.util.clone(r.languages.css),r.languages.markup&&(r.languages.insertBefore("markup","tag",{style:{pattern:/<style[\w\W]*?>[\w\W]*?<\/style>/i,inside:{tag:{pattern:/<style[\w\W]*?>|<\/style>/i,inside:r.languages.markup.tag.inside},rest:r.languages.css},alias:"language-css"}}),r.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:r.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:r.languages.css}},alias:"language-css"}},r.languages.markup.tag)),r.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,operator:/[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},r.languages.javascript=r.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/(?!\d)[a-z0-9_$]+(?=\()/i}),r.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),r.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\`|\\?[^`])*`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:r.languages.javascript}},string:/[\s\S]+/}}}),r.languages.markup&&r.languages.insertBefore("markup","tag",{script:{pattern:/<script[\w\W]*?>[\w\W]*?<\/script>/i,inside:{tag:{pattern:/<script[\w\W]*?>|<\/script>/i,inside:r.languages.markup.tag.inside},rest:r.languages.javascript},alias:"language-javascript"}}),function(){self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",html:"markup",svg:"markup",xml:"markup",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell"};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,i=t.getAttribute("data-src"),o=t,s=/\blang(?:uage)?-(?!\*)(\w+)\b/i;o&&!s.test(o.className);)o=o.parentNode;if(o&&(n=(t.className.match(s)||[,""])[1]),!n){var a=(i.match(/\.(\w+)$/)||[,""])[1];n=e[a]||a}var l=document.createElement("code");l.className="language-"+n,t.textContent="",l.textContent="Loading…",t.appendChild(l);var c=new XMLHttpRequest;c.open("GET",i,!0),c.onreadystatechange=function(){4==c.readyState&&(c.status<400&&c.responseText?(l.textContent=c.responseText,r.highlightElement(l)):l.textContent=c.status>=400?"✖ Error "+c.status+" while fetching file: "+c.statusText:"✖ Error: File does not exist or is empty")},c.send(null)})},self.Prism.fileHighlight())}()},{}],2:[function(e,t){t.exports=function(){return function(e){function t(t){var n=t.getAttribute("data-bespoke-backdrop");if(n){var r=document.createElement("div");return r.className=n,r.classList.add("bespoke-backdrop"),e.parent.appendChild(r),r}}function n(t){if(t){var n=o.indexOf(t),s=e.slide();r(t,"active"),r(t,"inactive"),r(t,"before"),r(t,"after"),n!==s?(i(t,"inactive"),i(t,s>n?"before":"after")):i(t,"active")}}function r(e,t){e.classList.remove("bespoke-backdrop-"+t)}function i(e,t){e.classList.add("bespoke-backdrop-"+t)}var o;o=e.slides.map(t),e.on("activate",function(){o.forEach(n)})}}},{}],3:[function(e,t){t.exports=function(e){return function(t){var n,r,i=t.slides.map(function(t){return[].slice.call(t.querySelectorAll("string"==typeof e?e:"[data-bespoke-bullet]"),0)}),o=function(){var e=n+1;return l(1)?(a(n,r+1),!1):(i[e]&&a(e,0),void 0)},s=function(){var e=n-1;return l(-1)?(a(n,r-1),!1):(i[e]&&a(e,i[e].length-1),void 0)},a=function(e,t){n=e,r=t,i.forEach(function(n,r){n.forEach(function(n,i){n.classList.add("bespoke-bullet"),e>r||r===e&&t>=i?(n.classList.add("bespoke-bullet-active"),n.classList.remove("bespoke-bullet-inactive")):(n.classList.add("bespoke-bullet-inactive"),n.classList.remove("bespoke-bullet-active")),r===e&&i===t?n.classList.add("bespoke-bullet-current"):n.classList.remove("bespoke-bullet-current")})})},l=function(e){return void 0!==i[n][r+e]};t.on("next",o),t.on("prev",s),t.on("slide",function(e){a(e.index,0)}),a(0,0)}}},{}],4:[function(e,t){t.exports=function(){return function(e){var t=function(e,t){e.classList.add("bespoke-"+t)},n=function(e,t){e.className=e.className.replace(new RegExp("bespoke-"+t+"(\\s|$)","g")," ").trim()},r=function(r,i){var o=e.slides[e.slide()],s=i-e.slide(),a=s>0?"after":"before";["before(-\\d+)?","after(-\\d+)?","active","inactive"].map(n.bind(null,r)),r!==o&&["inactive",a,a+"-"+Math.abs(s)].map(t.bind(null,r))};t(e.parent,"parent"),e.slides.map(function(e){t(e,"slide")}),e.on("activate",function(i){e.slides.map(r),t(i.slide,"active"),n(i.slide,"inactive")})}}},{}],5:[function(e,t){t.exports=function(){return function(e){e.slides.forEach(function(e){e.addEventListener("keydown",function(e){(/INPUT|TEXTAREA|SELECT/.test(e.target.nodeName)||"true"===e.target.contentEditable)&&e.stopPropagation()})})}}},{}],6:[function(e,t){t.exports=function(){return function(e){var t=70,n=122,r="keydown",i=function(){var e,t;t=document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement?(e=document).exitFullscreen||e.webkitExitFullscreen||e.mozCancelFullScreen||e.msExitFullscreen:(e=document.documentElement).requestFullscreen||e.webkitRequestFullscreen||e.mozRequestFullScreen||e.msRequestFullscreen,t.apply(e)},o=function(e){return!!(e.ctrlKey||e.shiftKey||e.altKey||e.metaKey)},s=function(e){var r=e.which;r!==t&&r!==n||o(e)||(i(),r===n&&e.preventDefault())};(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled)&&(e.on("destroy",function(){document.removeEventListener(r,s)}),e.on("fullscreen.toggle",i),document.addEventListener(r,s))}}},{}],7:[function(e,t){t.exports=function(){return function(e){var t=function(){var t=window.location.hash.slice(1),r=parseInt(t,10);t&&(r?n(r-1):e.slides.forEach(function(e,r){e.getAttribute("data-bespoke-hash")===t&&n(r)}))},n=function(t){var n=t>-1&&t<e.slides.length?t:0;n!==e.slide()&&e.slide(n)};setTimeout(function(){t(),e.on("activate",function(e){var t=e.slide.getAttribute("data-bespoke-hash");window.location.hash=t||e.index+1}),window.addEventListener("hashchange",t)},0)}}},{}],8:[function(e,t){t.exports=function(t){t=t||{};var n=e("bespoke-nav-kbd")(t.kbd),r=e("bespoke-nav-touch")(t.touch);return function(e){n(e),r(e)}}},{"bespoke-nav-kbd":9,"bespoke-nav-touch":10}],9:[function(e,t){t.exports=function(){return function(e){var t=32,n=33,r=34,i=35,o=36,s=37,a=39,l=72,c=76,u=function(e,n){return e.ctrlKey||e.shiftKey&&n!==t||e.altKey||e.metaKey},p=function(p){if(!u(p,p.which))switch(p.which){case t:return p.shiftKey?e.prev():e.next();case a:case r:case c:return e.next();case s:case n:case l:return e.prev();case o:return e.slide(0);case i:return e.slide(e.slides.length-1)}};e.on("destroy",function(){document.removeEventListener("keydown",p)}),document.addEventListener("keydown",p)}}},{}],10:[function(e,t){t.exports=function(e){return function(t){e=e||{};var n="touchstart",r="touchmove",i=null,o="page"+(e.axis&&-1!==["x","y"].indexOf(e.axis)?e.axis.toUpperCase():"X"),s="number"==typeof e.threshold?Math.abs(e.threshold):Math.ceil(50/window.devicePixelRatio),a=function(e){1===e.touches.length&&(i=e.touches[0][o])},l=function(e){if(null!==i){var n=e.touches[0][o]-i;Math.abs(n)>s&&(t[n>0?"prev":"next"](),i=null)}};t.on("destroy",function(){t.parent.removeEventListener(n,a),t.parent.removeEventListener(r,l)}),t.parent.addEventListener(n,a),t.parent.addEventListener(r,l)}}},{}],11:[function(e,t){t.exports=function(t){return e("insert-css")(".bespoke-parent.bespoke-overview{pointer-events:auto}.bespoke-overview :not(img){pointer-events:none}.bespoke-overview .bespoke-slide{opacity:1;visibility:visible;cursor:pointer;pointer-events:auto}.bespoke-overview .bespoke-active{outline:6px solid #cfd8dc;outline-offset:-3px;-moz-outline-radius:3px}.bespoke-overview .bespoke-bullet{opacity:1;visibility:visible}.bespoke-overview-counter{counter-reset:overview}.bespoke-overview-counter .bespoke-slide::after{counter-increment:overview;content:counter(overview);position:absolute;right:.75em;bottom:.5em;font-size:1.25rem;line-height:1.25}.bespoke-title{visibility:hidden;position:absolute;top:0;left:0;width:100%;pointer-events:auto}.bespoke-title h1{margin:0;font-size:1.6em;line-height:1.2;text-align:center}.bespoke-overview:not(.bespoke-overview-to) .bespoke-title{visibility:visible}.bespoke-overview-to .bespoke-active,.bespoke-overview-from .bespoke-active{z-index:1}",{prepend:!0}),function(e){t="object"==typeof t?t:{};var n,r={o:79,enter:13,up:38,down:40},i={csv:/, */,none:/^none(?:, ?none)*$/,transform:/^translate\((.+?)px, ?(.+?)px\) scale\((.+?)\)$/},o=!("transition"in document.body.style)&&"webkitTransition"in document.body.style?"webkitTransitionEnd":"transitionend",s=["webkit","Moz","ms"],a="number"==typeof t.columns?parseInt(t.columns):3,l="number"==typeof t.margin?parseFloat(t.margin):15,c=!1,u=!1,p=function(e,t){if(!(t in e.style))for(var n=t.charAt(0).toUpperCase()+t.substr(1),r=0,i=s.length;i>r;r++)if(s[r]+n in e.style)return s[r]+n;return t},d=function(e,t){return parseFloat(e.style[t].slice(6,-1))},f=function(e){return"zoom"in e.style?parseFloat(e.style.zoom)||void 0:void 0},v=function(e){var t=[],n=getComputedStyle(e),r=n[p(e,"transitionProperty")];if(!r||i.none.test(r))return t;r=r.split(i.csv);var o=n[p(e,"transitionDuration")].split(i.csv),s=n[p(e,"transitionDelay")].split(i.csv);return r.forEach(function(e,n){("0s"!==o[n]||"0s"!==s[n])&&t.push(e)}),t},m=function(e,t,n,r){t&&(e.style[t]=n),e.offsetHeight,t&&(e.style[t]=r)},g=function(){E(e.slides.indexOf(this))},h=function(t,n){if(c){var r=n.index+t;return r>-1&&r<e.slides.length&&e.slide(r,{preview:!0}),!1}},b=function(n){return u?(c&&n.scrollIntoView!==!1&&y(n.slide,n.index,f(n.slide)),void 0):(u=!0,e.parent.scrollLeft=e.parent.scrollTop=0,t.autostart&&setTimeout(x,100),void 0)},y=function(t,n,r){e.parent.scrollTop=a>n?0:e.parent.scrollTop+t.getBoundingClientRect().top*(r||1)},k=function(e,t,r,i){r.removeEventListener(o,n,!1),i&&i!==r&&i.removeEventListener(o,n,!1),n=void 0,t.remove("bespoke-overview-"+e)},w=function(e){var t=e.firstElementChild;if(t.classList.contains("bespoke-title"))return t.style.width="",t;var n=document.createElement("header");n.className="bespoke-title",n.style[p(n,"transformOrigin")]="0 0";var r=document.createElement("h1");return r.appendChild(document.createTextNode(e.getAttribute("data-title")||document.title)),n.appendChild(r),m(e.insertBefore(n,t)),n},x=function(){var r,i,s=e.slides,u=e.parent,h=u.classList,b=s.length-1,x=e.slide(),E=x>0?s[0]:s[b],L=p(E,"transform"),A=u.querySelector(".bespoke-scale-parent"),S=1,N=0,C=c,T="webkitAppearance"in u.style;A?S=d(A,L):(r=f(E))&&(S=r),n&&k("from",h,s[0],s[b]),t.title&&(i=w(u)),C||(e.slide(x,{preview:!0}),h.add("bespoke-overview"),c=!0,t.counter&&h.add("bespoke-overview-counter"),h.add("bespoke-overview-to"),N=b>0?v(E).length:v(E).indexOf("transform")>=0?1:0,u.style.overflowY="scroll",u.style.scrollBehavior="smooth",T&&s.forEach(function(e){m(e,"marginBottom","0%","")}));var W=u.clientWidth/S,z=u.clientHeight/S,O=(A||u).offsetWidth-u.clientWidth,F=A?O/2/S:0,B=E.offsetWidth,P=E.offsetHeight,q=W/(a*B+(a+1)*l),j=S*q,K=B*q,H=P*q,M=(W-K)/2,D=(z-H)/2,$=l*q,R=0,I=0,_=0;i&&(t.scaleTitle!==!1?(i.style[r?"zoom":L]=r?j:"scale("+j+")",i.style.width=u.clientWidth/j+"px",R=i.offsetHeight*q):(O>0&&(i.style.width=u.clientWidth+"px"),R=i.offsetHeight/S)),s.forEach(function(e){var t=_*K+(_+1)*$-F-M,n=I*H+(I+1)*$+R-D;e.style[L]="translate("+(t.toString().indexOf("e-")>=0?0:t)+"px, "+(n.toString().indexOf("e-")>=0?0:n)+"px) scale("+q+")",I*a+_===b&&(e.style.marginBottom=l+"px"),e.addEventListener("click",g,!1),_===a-1?(I+=1,_=0):_+=1}),C?y(s[x],x,r):N>0?E.addEventListener(o,n=function(e){e.target===this&&0===(N-=1)&&(k("to",h,this),T&&u.scrollHeight>u.clientHeight&&m(u,"overflowY","auto","scroll"),y(s[x],x,r))},!1):(s.forEach(function(e){m(e)}),h.remove("bespoke-overview-to"),y(s[x],x,r))},E=function(r){e.slide("number"==typeof r?r:e.slide(),{scrollIntoView:!1});var s,a=e.slides,l=e.parent,u=l.classList,h=a.length-1,b=e.slide()>0?a[0]:a[h],y=p(b,"transform"),w=p(b,"transition"),x=l.querySelector(".bespoke-scale-parent"),E="webkitAppearance"in l.style;x?s=d(x,y):(s=f(b))||(s=1),n&&k("to",u,a[0],a[h]);var L=l.scrollTop/s,A=(l.offsetWidth-(x||l).clientWidth)/2/s;l.style.scrollBehavior=l.style.overflowY="",a.forEach(function(e){E&&m(e,"marginBottom","0%",""),e.removeEventListener("click",g,!1)}),(L||A)&&a.forEach(function(e){var t=e.style[y].match(i.transform);e.style[y]="translate("+(parseFloat(t[1])-A)+"px, "+(parseFloat(t[2])-L)+"px) scale("+t[3]+")",m(e,w,"none","")}),l.scrollTop=0,u.remove("bespoke-overview"),c=!1,t.counter&&u.remove("bespoke-overview-counter"),u.add("bespoke-overview-from");var S=h>0?v(b).length:v(b).indexOf("transform")>=0?1:0;a.forEach(function(e){e.style[y]=""}),S>0?b.addEventListener(o,n=function(e){e.target===this&&0===(S-=1)&&k("from",u,this)},!1):(a.forEach(function(e){m(e)}),u.remove("bespoke-overview-from"))},L=function(){c?E():x()},A=function(){c&&x()},S=function(t){if(t.which===r.o)t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||L();else if(c)switch(t.which){case r.enter:t.altKey||t.ctrlKey||t.metaKey||t.shiftKey||E();break;case r.up:return h(-a,{index:e.slide()});case r.down:return h(a,{index:e.slide()})}};e.on("activate",b),e.on("next",h.bind(null,1)),e.on("prev",h.bind(null,-1)),e.on("destroy",function(){removeEventListener("resize",A,!1),document.removeEventListener("keydown",S,!1)}),addEventListener("resize",A,!1),document.addEventListener("keydown",S,!1)}}},{"insert-css":15}],12:[function(e,t){t.exports=function(e){return function(t){var n=t.parent,r=t.slides[0],i=r.offsetHeight,o=r.offsetWidth,s="zoom"===e||"zoom"in n.style&&"transform"!==e,a=function(e){var t=document.createElement("div");return t.className="bespoke-scale-parent",e.parentNode.insertBefore(t,e),t.appendChild(e),t},l=s?t.slides:t.slides.map(a),c=function(e){var t="Moz Webkit O ms".split(" ");return t.reduce(function(t,r){return r+e in n.style?r+e:t},e.toLowerCase())}("Transform"),u=s?function(e,t){t.style.zoom=e}:function(e,t){t.style[c]="scale("+e+")"},p=function(){var e=n.offsetWidth/o,t=n.offsetHeight/i;l.forEach(u.bind(null,Math.min(e,t)))};window.addEventListener("resize",p),p()}}},{}],13:[function(e,t){t.exports=function(e){return function(t){e=e||{};var n="string"==typeof e.separator?e.separator:" — ",r=document.title,i="string"==typeof e.title?e.title:r,o=function(e){var t=e.getAttribute("data-title");return null===t&&null!==(t=e.querySelector("h1,h2"))&&(t=t.textContent),null===t||0===t.length?null:t},s=function(e){var t=o(e.slide);document.title=null!==t?t+n+i:i};t.on("destroy",function(){document.title=r}),t.on("activate",s)}}},{}],14:[function(e,t){var n=function(e,t){var n=1===(e.parent||e).nodeType?e.parent||e:document.querySelector(e.parent||e),r=[].filter.call("string"==typeof e.slides?n.querySelectorAll(e.slides):e.slides||n.children,function(e){return"SCRIPT"!==e.nodeName}),i=r[0],o={},s=function(e,t){r[e]&&(p("deactivate",d(i,t)),i=r[e],p("activate",d(i,t)))},a=function(e,t){return arguments.length?(p("slide",d(r[e],t))&&s(e,t),void 0):r.indexOf(i)},l=function(e,t){var n=r.indexOf(i)+e;p(e>0?"next":"prev",d(i,t))&&s(n,t)},c=function(e,t){return(o[e]||(o[e]=[])).push(t),u.bind(null,e,t)},u=function(e,t){o[e]=(o[e]||[]).filter(function(e){return e!==t})},p=function(e,t){return(o[e]||[]).reduce(function(e,n){return e&&n(t)!==!1},!0)},d=function(e,t){return t=t||{},t.index=r.indexOf(e),t.slide=e,t},f={on:c,off:u,fire:p,slide:a,next:l.bind(null,1),prev:l.bind(null,-1),parent:n,slides:r};return(t||[]).forEach(function(e){e(f)}),s(0),f};t.exports={from:n}},{}],15:[function(e,t){var n={};t.exports=function(e,t){if(!n[e]){n[e]=!0;var r=document.createElement("style");r.setAttribute("type","text/css"),"textContent"in r?r.textContent=e:r.styleSheet.cssText=e;var i=document.getElementsByTagName("head")[0];t&&t.prepend?i.insertBefore(r,i.childNodes[0]):i.appendChild(r)}}},{}],16:[function(e){var t=e("bespoke"),n=e("bespoke-backdrop"),r=e("bespoke-bullets"),i=e("bespoke-classes"),o=e("bespoke-forms"),s=e("bespoke-fullscreen"),a=e("bespoke-hash"),l=e("bespoke-nav"),c=e("bespoke-overview"),u=e("bespoke-scale"),p=e("bespoke-title");t.from(".deck",[i(),l(),s(),n(),u("transform"),c({margin:300,autostart:!0,title:!0,numbers:!0}),r(".bullet"),p(),a(),o()]),e("./../../bower_components/prism/prism.js")},{"./../../bower_components/prism/prism.js":1,bespoke:14,"bespoke-backdrop":2,"bespoke-bullets":3,"bespoke-classes":4,"bespoke-forms":5,"bespoke-fullscreen":6,"bespoke-hash":7,"bespoke-nav":8,"bespoke-overview":11,"bespoke-scale":12,"bespoke-title":13}]},{},[16]);