(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[89],{"5hat":function(e,t,n){"use strict";n.r(t);var i=n("nKUr"),s=n("q1tI");n("NJvF");t.default=function(){var e=n("SiYH");return Object(s.useEffect)((function(){(new e).init()}),[]),Object(i.jsx)("div",{className:"bodyFooter footerBlock",children:Object(i.jsxs)("div",{className:"footerTitle wow slideInLeft","data-wow-duration":"3s","data-wow-delay":"0.3s",children:[Object(i.jsxs)("div",{className:"d-flex flex-column ",children:[Object(i.jsx)("div",{className:"univers",children:"l'univers"}),Object(i.jsx)("div",{className:"infini",children:"est infini..."}),Object(i.jsx)("div",{className:"contact text_Stroke",children:"contactez-nous !"})]}),Object(i.jsxs)("div",{className:"contactBlock",children:[Object(i.jsx)("div",{className:"address",children:"place vendome, 75001 paris, france"}),Object(i.jsx)("div",{className:"tel",children:"+33 9 70 44 64 22"}),Object(i.jsx)("div",{className:"email",children:" info@agence-inspire.com"})]})]})})}},SiYH:function(e,t,n){var i,s,o;s=[e,t],void 0===(o="function"===typeof(i=function(e,t){"use strict";var n,i;function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();function a(e,t){return t.indexOf(e)>=0}function r(e,t){for(var n in t)if(null==e[n]){var i=t[n];e[n]=i}return e}function l(e){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)}function c(e){var t=!(arguments.length<=1||void 0===arguments[1])&&arguments[1],n=!(arguments.length<=2||void 0===arguments[2])&&arguments[2],i=arguments.length<=3||void 0===arguments[3]?null:arguments[3],s=void 0;return null!=document.createEvent?(s=document.createEvent("CustomEvent")).initCustomEvent(e,t,n,i):null!=document.createEventObject?(s=document.createEventObject()).eventType=e:s.eventName=e,s}function u(e,t){null!=e.dispatchEvent?e.dispatchEvent(t):t in(null!=e)?e[t]():"on"+t in(null!=e)&&e["on"+t]()}function h(e,t,n){null!=e.addEventListener?e.addEventListener(t,n,!1):null!=e.attachEvent?e.attachEvent("on"+t,n):e[t]=n}function d(e,t,n){null!=e.removeEventListener?e.removeEventListener(t,n,!1):null!=e.detachEvent?e.detachEvent("on"+t,n):delete e[t]}function f(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight}var v=window.WeakMap||window.MozWeakMap||function(){function e(){s(this,e),this.keys=[],this.values=[]}return o(e,[{key:"get",value:function(e){for(var t=0;t<this.keys.length;t++)if(this.keys[t]===e)return this.values[t]}},{key:"set",value:function(e,t){for(var n=0;n<this.keys.length;n++)if(this.keys[n]===e)return this.values[n]=t,this;return this.keys.push(e),this.values.push(t),this}}]),e}(),m=window.MutationObserver||window.WebkitMutationObserver||window.MozMutationObserver||(i=n=function(){function e(){s(this,e),"undefined"!==typeof console&&null!==console&&(console.warn("MutationObserver is not supported by your browser."),console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))}return o(e,[{key:"observe",value:function(){}}]),e}(),n.notSupported=!0,i),y=window.getComputedStyle||function(e){var t=/(\-([a-z]){1})/g;return{getPropertyValue:function(n){"float"===n&&(n="styleFloat"),t.test(n)&&n.replace(t,(function(e,t){return t.toUpperCase()}));var i=e.currentStyle;return(null!=i?i[n]:void 0)||null}}},b=function(){function e(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];s(this,e),this.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null},this.animate="requestAnimationFrame"in window?function(e){return window.requestAnimationFrame(e)}:function(e){return e()},this.vendors=["moz","webkit"],this.start=this.start.bind(this),this.resetAnimation=this.resetAnimation.bind(this),this.scrollHandler=this.scrollHandler.bind(this),this.scrollCallback=this.scrollCallback.bind(this),this.scrolled=!0,this.config=r(t,this.defaults),null!=t.scrollContainer&&(this.config.scrollContainer=document.querySelector(t.scrollContainer)),this.animationNameCache=new v,this.wowEvent=c(this.config.boxClass)}return o(e,[{key:"init",value:function(){this.element=window.document.documentElement,a(document.readyState,["interactive","complete"])?this.start():h(document,"DOMContentLoaded",this.start),this.finished=[]}},{key:"start",value:function(){var e=this;if(this.stopped=!1,this.boxes=[].slice.call(this.element.querySelectorAll("."+this.config.boxClass)),this.all=this.boxes.slice(0),this.boxes.length)if(this.disabled())this.resetStyle();else for(var t=0;t<this.boxes.length;t++){var n=this.boxes[t];this.applyStyle(n,!0)}this.disabled()||(h(this.config.scrollContainer||window,"scroll",this.scrollHandler),h(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live&&new m((function(t){for(var n=0;n<t.length;n++)for(var i=t[n],s=0;s<i.addedNodes.length;s++){var o=i.addedNodes[s];e.doSync(o)}})).observe(document.body,{childList:!0,subtree:!0})}},{key:"stop",value:function(){this.stopped=!0,d(this.config.scrollContainer||window,"scroll",this.scrollHandler),d(window,"resize",this.scrollHandler),null!=this.interval&&clearInterval(this.interval)}},{key:"sync",value:function(){m.notSupported&&this.doSync(this.element)}},{key:"doSync",value:function(e){if("undefined"!==typeof e&&null!==e||(e=this.element),1===e.nodeType)for(var t=(e=e.parentNode||e).querySelectorAll("."+this.config.boxClass),n=0;n<t.length;n++){var i=t[n];a(i,this.all)||(this.boxes.push(i),this.all.push(i),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(i,!0),this.scrolled=!0)}}},{key:"show",value:function(e){return this.applyStyle(e),e.className=e.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(e),u(e,this.wowEvent),h(e,"animationend",this.resetAnimation),h(e,"oanimationend",this.resetAnimation),h(e,"webkitAnimationEnd",this.resetAnimation),h(e,"MSAnimationEnd",this.resetAnimation),e}},{key:"applyStyle",value:function(e,t){var n=this,i=e.getAttribute("data-wow-duration"),s=e.getAttribute("data-wow-delay"),o=e.getAttribute("data-wow-iteration");return this.animate((function(){return n.customStyle(e,t,i,s,o)}))}},{key:"resetStyle",value:function(){for(var e=0;e<this.boxes.length;e++)this.boxes[e].style.visibility="visible"}},{key:"resetAnimation",value:function(e){if(e.type.toLowerCase().indexOf("animationend")>=0){var t=e.target||e.srcElement;t.className=t.className.replace(this.config.animateClass,"").trim()}}},{key:"customStyle",value:function(e,t,n,i,s){return t&&this.cacheAnimationName(e),e.style.visibility=t?"hidden":"visible",n&&this.vendorSet(e.style,{animationDuration:n}),i&&this.vendorSet(e.style,{animationDelay:i}),s&&this.vendorSet(e.style,{animationIterationCount:s}),this.vendorSet(e.style,{animationName:t?"none":this.cachedAnimationName(e)}),e}},{key:"vendorSet",value:function(e,t){for(var n in t)if(t.hasOwnProperty(n)){var i=t[n];e[""+n]=i;for(var s=0;s<this.vendors.length;s++)e[""+this.vendors[s]+n.charAt(0).toUpperCase()+n.substr(1)]=i}}},{key:"vendorCSS",value:function(e,t){for(var n=y(e),i=n.getPropertyCSSValue(t),s=0;s<this.vendors.length;s++){var o=this.vendors[s];i=i||n.getPropertyCSSValue("-"+o+"-"+t)}return i}},{key:"animationName",value:function(e){var t=void 0;try{t=this.vendorCSS(e,"animation-name").cssText}catch(n){t=y(e).getPropertyValue("animation-name")}return"none"===t?"":t}},{key:"cacheAnimationName",value:function(e){return this.animationNameCache.set(e,this.animationName(e))}},{key:"cachedAnimationName",value:function(e){return this.animationNameCache.get(e)}},{key:"scrollHandler",value:function(){this.scrolled=!0}},{key:"scrollCallback",value:function(){if(this.scrolled){this.scrolled=!1;for(var e=[],t=0;t<this.boxes.length;t++){var n=this.boxes[t];if(n){if(this.isVisible(n)){this.show(n);continue}e.push(n)}}this.boxes=e,this.boxes.length||this.config.live||this.stop()}}},{key:"offsetTop",value:function(e){for(;void 0===e.offsetTop;)e=e.parentNode;for(var t=e.offsetTop;e.offsetParent;)t+=(e=e.offsetParent).offsetTop;return t}},{key:"isVisible",value:function(e){var t=e.getAttribute("data-wow-offset")||this.config.offset,n=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,i=n+Math.min(this.element.clientHeight,f())-t,s=this.offsetTop(e),o=s+e.clientHeight;return s<=i&&o>=n}},{key:"disabled",value:function(){return!this.config.mobile&&l(navigator.userAgent)}}]),e}();t.default=b,e.exports=t.default})?i.apply(t,s):i)||(e.exports=o)}}]);