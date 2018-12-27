"use strict";var DEBOUNCE_INTERVAL=100,INDICATOR_CLASSES={normal:"indicator__link--normal",line:"indicator__link--line",current:"indicator__link--current"},DIRECTIONS={down:"DOWN",up:"UP",stopped:"STOPPED"},getCurrentClassName=function(){return INDICATOR_CLASSES.current},getNotCurrentClassName=function(e){return 2<=e&&e<=4?INDICATOR_CLASSES.line:INDICATOR_CLASSES.normal},replaceClassName=function(e,n,t){e&&(removeAlternatives(e,t),addClassName(e,n))},removeClassName=function(e,n){e&&e.classList.contains(n)&&e.classList.remove(n)},addClassName=function(e,n){e&&!e.classList.contains(n)&&e.classList.add(n)},removeAlternatives=function(n,t){Array.isArray(t)?t.forEach(function(e){removeClassName(n,e)}):Object.keys(t).map(function(e){return e}).forEach(function(e){removeClassName(n,t[e])})},debounce=function(n){var t=null;return function(){var e=arguments;t&&window.clearTimeout(t),t=window.setTimeout(function(){n.apply(null,e)},DEBOUNCE_INTERVAL)}},onIndicatorClick=function(e){var n=e.target;if("A"!==n.tagName)return!1;if(n.hasAttribute("id")){var t=indicators.indexOf(indicators.filter(function(e){return e.id===n.getAttribute("id")})[0]);direction=DIRECTIONS.stopped,changeIndicatorState(t)}return!1},checkFirstVisible=function(){for(var e=0;e<elements.length;e++){var n=elements[e].getBoundingClientRect(),t=Math.max(document.documentElement.clientHeight,window.innerHeight);if(!(n.bottom<0||0<=n.top-t)){var r=e;if(e<elements.length-1){var i=elements[e+1].getBoundingClientRect();i.bottom<0||0<=i.top-t||(r=direction===DIRECTIONS.down?e+1:e)}return r}}return-1},getCurrentScroll=function(){return document.documentElement.scrollTop},changeIndicatorState=function(e){replaceClassName(indicators[e],getCurrentClassName(),INDICATOR_CLASSES),replaceClassName(indicators[currentIndex],getNotCurrentClassName(currentIndex),INDICATOR_CLASSES),currentIndex=e},onWindowScroll=debounce(function(){if(direction!==DIRECTIONS.stopped){var e=getCurrentScroll();if(0===e)var n=0;else if(totalYScroll<=e)n=elements.length-1;else n=checkFirstVisible();0<=n&&currentIndex!==n&&changeIndicatorState(n)}}),onDocumentWheel=function(e){direction=0<e.deltaY?DIRECTIONS.down:DIRECTIONS.up},blockLinks=document.querySelectorAll("header, .about, .service__item, .reviews, .faq, footer"),indicatorLinks=document.querySelectorAll(".indicator__link"),indicatorArea=document.querySelector(".indicator"),elements=blockLinks?Array.prototype.slice.call(blockLinks):[],indicators=indicatorLinks?Array.prototype.slice.call(indicatorLinks):[],currentIndex=0,direction=DIRECTIONS.down,totalYScroll=document.documentElement.scrollHeight-window.innerHeight;document.documentElement.scrollTop=0,removeClassName(indicatorArea,"indicator--nojs"),window.addEventListener("scroll",onWindowScroll),document.addEventListener("wheel",onDocumentWheel,{passive:!0}),indicatorArea&&indicatorArea.addEventListener("click",onIndicatorClick);