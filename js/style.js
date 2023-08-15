
// video btn's
$(document).ready(function(){
    $('#video').prop("controls",false);
    $('.about-video-btn').on('click',function(){
    
    if($(this).attr('data-click') == 1) {
        $(this).removeClass('btn-hover')
        $(this).attr('data-click', 0)
        $('#video')[0].pause();
    } 
    else {
        $(this).attr('data-click', 1)
        $(this).addClass('btn-hover')
        $('#video')[0].play();
        $('#video').prop("controls",true);
    }
    
    });

    });

    
    // Wizard form code
    var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  
  if (n == (x.length - 2)) {
    document.getElementsByClassName("wish-to-purchase")[0].style.display = "inline";
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementsByClassName("wish-to-purchase")[0].style.display = "none";
    document.getElementById("prevBtn").style.display = "inline";
  }
 
  if (n == (x.length - 3)) {
    document.getElementsByClassName("call-me-about")[0].style.display = "inline";
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementsByClassName("call-me-about")[0].style.display = "none";
    document.getElementById("prevBtn").style.display = "inline";
  }
  

  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("next2").style.display = "none";
    document.getElementsByClassName("actions_btn_wrap")[0].style.display = "none";
  } else {
    document.getElementById("nextBtn").style.display = "inline";
    document.getElementById("next2").style.display = "inline";
    document.getElementsByClassName("actions_btn_wrap")[0].style.display = "block";
  }
  if (n == (x.length - 4)) {
    document.getElementsByClassName("actions_btn_wrap")[0].style.display = "none";
  } else {
    document.getElementsByClassName("actions_btn_wrap")[0].style.display = "block";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
  fixStepIndicator2(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  // y = x[currentTab].getElementsByTagName("input");
  // // A loop that checks every input field in the current tab:
  // for (i = 0; i < y.length; i++) {
  //   // If a field is empty...
  //   if (y[i].value == "") {
  //     // add an "invalid" class to the field:
  //     y[i].className += " invalid";
  //     // and set the current valid status to false
  //     valid = false;
  //   }
  // }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
    document.getElementsByClassName("step2")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}
function fixStepIndicator2(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step2");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}



//  slider range

const END = 'change';
const START = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
const INPUT = 'input';
const MAX_ROTATION = 35;
const SOFTEN_FACTOR = 3;

class RangeInput {
	
	constructor(el) {
		this.el = el;

		this._handleEnd = this._handleEnd.bind(this);
		this._handleStart = this._handleStart.bind(this);
		this._handleInput = this._handleInput.bind(this);

		//Call the plugin
		$(this.el.querySelector('input[type=range]')).rangeslider({
			polyfill: false, //Never use the native polyfill
			rangeClass: 'rangeslider',
		    disabledClass: 'rangeslider-disabled',
		    horizontalClass: 'rangeslider-horizontal',
		    verticalClass: 'rangeslider-vertical',
		    fillClass: 'rangeslider-fill-lower',
		    handleClass: 'rangeslider-thumb',
		    onInit: function() {
		    	//No args are passed, so we can't change context of this
		    	const pluginInstance = this;

		    	//Move the range-output inside the handle so we can do all the stuff in css
		    	$(pluginInstance.$element)
		    		.parents('.range')
		    		.find('.range-output')
		    		.appendTo(pluginInstance.$handle);
		    }
		});

		this.sliderThumbEl = el.querySelector('.rangeslider-thumb');
		this.outputEl = el.querySelector('.range-output');
		this.inputEl = el.querySelector('input[type=range]');
		this._lastOffsetLeft = 0;
		this._lastTimeStamp = 0;

		this.el.querySelector('.rangeslider').addEventListener(START, this._handleStart);
	}

	_handleStart (e) {
		this._lastTimeStamp = new Date().getTime();
		this._lastOffsetLeft = this.sliderThumbEl.offsetLeft;

		//Wrap in raf because offsetLeft is updated by the plugin after this fires
		requestAnimationFrame(_ => {
			//Bind through jquery because plugin doesn't fire native event
			$(this.inputEl).on(INPUT, this._handleInput);
			$(this.inputEl).on(END, this._handleEnd);
		});
	}

	_handleEnd (e) {
		//Unbind through jquery because plugin doesn't fire native event
		$(this.inputEl).off(INPUT, this._handleInput);
		$(this.inputEl).off(END, this._handleEnd);

		requestAnimationFrame(_ => this.outputEl.style.transform = 'rotate(0deg)')
	}

	_handleInput (e) {
		let now = new Date().getTime();
		let timeElapsed = now - this._lastTimeStamp || 1;
		let distance = this.sliderThumbEl.offsetLeft - this._lastOffsetLeft;
		let direction = distance < 0 ? -1 : 1;
		let velocity = Math.abs(distance) / timeElapsed; //pixels / millisecond
		let targetRotation = Math.min(Math.abs(distance * velocity) * SOFTEN_FACTOR, MAX_ROTATION);

		requestAnimationFrame(_ => this.outputEl.style.transform = 'rotate(' + targetRotation * -direction + 'deg)');

		this._lastTimeStamp = now;
		this._lastOffsetLeft = this.sliderThumbEl.offsetLeft;
	}

}


/*! rangeslider.js - v2.1.1 | (c) 2016 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";function b(){var a=document.createElement("input");return a.setAttribute("type","range"),"text"!==a.type}function c(a,b){var c=Array.prototype.slice.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)}function d(a,b){return b=b||100,function(){if(!a.debouncing){var c=Array.prototype.slice.apply(arguments);a.lastReturnVal=a.apply(window,c),a.debouncing=!0}return clearTimeout(a.debounceTimeout),a.debounceTimeout=setTimeout(function(){a.debouncing=!1},b),a.lastReturnVal}}function e(a){return a&&(0===a.offsetWidth||0===a.offsetHeight||a.open===!1)}function f(a){for(var b=[],c=a.parentNode;e(c);)b.push(c),c=c.parentNode;return b}function g(a,b){function c(a){"undefined"!=typeof a.open&&(a.open=a.open?!1:!0)}var d=f(a),e=d.length,g=[],h=a[b];if(e){for(var i=0;e>i;i++)g[i]=d[i].style.cssText,d[i].style.setProperty?d[i].style.setProperty("display","block","important"):d[i].style.cssText+=";display: block !important",d[i].style.height="0",d[i].style.overflow="hidden",d[i].style.visibility="hidden",c(d[i]);h=a[b];for(var j=0;e>j;j++)d[j].style.cssText=g[j],c(d[j])}return h}function h(a,b){var c=parseFloat(a);return Number.isNaN(c)?b:c}function i(a){return a.charAt(0).toUpperCase()+a.substr(1)}function j(b,e){if(this.$window=a(window),this.$document=a(document),this.$element=a(b),this.options=a.extend({},n,e),this.polyfill=this.options.polyfill,this.orientation=this.$element[0].getAttribute("data-orientation")||this.options.orientation,this.onInit=this.options.onInit,this.onSlide=this.options.onSlide,this.onSlideEnd=this.options.onSlideEnd,this.DIMENSION=o.orientation[this.orientation].dimension,this.DIRECTION=o.orientation[this.orientation].direction,this.DIRECTION_STYLE=o.orientation[this.orientation].directionStyle,this.COORDINATE=o.orientation[this.orientation].coordinate,this.polyfill&&m)return!1;this.identifier="js-"+k+"-"+l++,this.startEvent=this.options.startEvent.join("."+this.identifier+" ")+"."+this.identifier,this.moveEvent=this.options.moveEvent.join("."+this.identifier+" ")+"."+this.identifier,this.endEvent=this.options.endEvent.join("."+this.identifier+" ")+"."+this.identifier,this.toFixed=(this.step+"").replace(".","").length-1,this.$fill=a('<div class="'+this.options.fillClass+'" />'),this.$handle=a('<div class="'+this.options.handleClass+'" />'),this.$range=a('<div class="'+this.options.rangeClass+" "+this.options[this.orientation+"Class"]+'" id="'+this.identifier+'" />').insertAfter(this.$element).prepend(this.$fill,this.$handle),this.$element.css({position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:"0"}),this.handleDown=a.proxy(this.handleDown,this),this.handleMove=a.proxy(this.handleMove,this),this.handleEnd=a.proxy(this.handleEnd,this),this.init();var f=this;this.$window.on("resize."+this.identifier,d(function(){c(function(){f.update(!1,!1)},300)},20)),this.$document.on(this.startEvent,"#"+this.identifier+":not(."+this.options.disabledClass+")",this.handleDown),this.$element.on("change."+this.identifier,function(a,b){if(!b||b.origin!==f.identifier){var c=a.target.value,d=f.getPositionFromValue(c);f.setPosition(d)}})}Number.isNaN=Number.isNaN||function(a){return"number"==typeof a&&a!==a};var k="rangeslider",l=0,m=b(),n={polyfill:!0,orientation:"horizontal",rangeClass:"rangeslider",disabledClass:"rangeslider--disabled",horizontalClass:"rangeslider--horizontal",verticalClass:"rangeslider--vertical",fillClass:"rangeslider__fill",handleClass:"rangeslider__handle",startEvent:["mousedown","touchstart","pointerdown"],moveEvent:["mousemove","touchmove","pointermove"],endEvent:["mouseup","touchend","pointerup"]},o={orientation:{horizontal:{dimension:"width",direction:"left",directionStyle:"left",coordinate:"x"},vertical:{dimension:"height",direction:"top",directionStyle:"bottom",coordinate:"y"}}};return j.prototype.init=function(){this.update(!0,!1),this.onInit&&"function"==typeof this.onInit&&this.onInit()},j.prototype.update=function(a,b){a=a||!1,a&&(this.min=h(this.$element[0].getAttribute("min"),0),this.max=h(this.$element[0].getAttribute("max"),100),this.value=h(this.$element[0].value,Math.round(this.min+(this.max-this.min)/2)),this.step=h(this.$element[0].getAttribute("step"),1)),this.handleDimension=g(this.$handle[0],"offset"+i(this.DIMENSION)),this.rangeDimension=g(this.$range[0],"offset"+i(this.DIMENSION)),this.maxHandlePos=this.rangeDimension-this.handleDimension,this.grabPos=this.handleDimension/2,this.position=this.getPositionFromValue(this.value),this.$element[0].disabled?this.$range.addClass(this.options.disabledClass):this.$range.removeClass(this.options.disabledClass),this.setPosition(this.position,b)},j.prototype.handleDown=function(a){if(this.$document.on(this.moveEvent,this.handleMove),this.$document.on(this.endEvent,this.handleEnd),!((" "+a.target.className+" ").replace(/[\n\t]/g," ").indexOf(this.options.handleClass)>-1)){var b=this.getRelativePosition(a),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=this.getPositionFromNode(this.$handle[0])-c,e="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(e),b>=d&&b<d+this.handleDimension&&(this.grabPos=b-d)}},j.prototype.handleMove=function(a){a.preventDefault();var b=this.getRelativePosition(a),c="vertical"===this.orientation?this.maxHandlePos-(b-this.grabPos):b-this.grabPos;this.setPosition(c)},j.prototype.handleEnd=function(a){a.preventDefault(),this.$document.off(this.moveEvent,this.handleMove),this.$document.off(this.endEvent,this.handleEnd),this.$element.trigger("change",{origin:this.identifier}),this.onSlideEnd&&"function"==typeof this.onSlideEnd&&this.onSlideEnd(this.position,this.value)},j.prototype.cap=function(a,b,c){return b>a?b:a>c?c:a},j.prototype.setPosition=function(a,b){var c,d;void 0===b&&(b=!0),c=this.getValueFromPosition(this.cap(a,0,this.maxHandlePos)),d=this.getPositionFromValue(c),this.$fill[0].style[this.DIMENSION]=d+this.grabPos+"px",this.$handle[0].style[this.DIRECTION_STYLE]=d+"px",this.setValue(c),this.position=d,this.value=c,b&&this.onSlide&&"function"==typeof this.onSlide&&this.onSlide(d,c)},j.prototype.getPositionFromNode=function(a){for(var b=0;null!==a;)b+=a.offsetLeft,a=a.offsetParent;return b},j.prototype.getRelativePosition=function(a){var b=i(this.COORDINATE),c=this.$range[0].getBoundingClientRect()[this.DIRECTION],d=0;return"undefined"!=typeof a["page"+b]?d=a["client"+b]:"undefined"!=typeof a.originalEvent["client"+b]?d=a.originalEvent["client"+b]:a.originalEvent.touches&&a.originalEvent.touches[0]&&"undefined"!=typeof a.originalEvent.touches[0]["client"+b]?d=a.originalEvent.touches[0]["client"+b]:a.currentPoint&&"undefined"!=typeof a.currentPoint[this.COORDINATE]&&(d=a.currentPoint[this.COORDINATE]),d-c},j.prototype.getPositionFromValue=function(a){var b,c;return b=(a-this.min)/(this.max-this.min),c=Number.isNaN(b)?0:b*this.maxHandlePos},j.prototype.getValueFromPosition=function(a){var b,c;return b=a/(this.maxHandlePos||1),c=this.step*Math.round(b*(this.max-this.min)/this.step)+this.min,Number(c.toFixed(this.toFixed))},j.prototype.setValue=function(a){(a!==this.value||""===this.$element[0].value)&&this.$element.val(a).trigger("input",{origin:this.identifier})},j.prototype.destroy=function(){this.$document.off("."+this.identifier),this.$window.off("."+this.identifier),this.$element.off("."+this.identifier).removeAttr("style").removeData("plugin_"+k),this.$range&&this.$range.length&&this.$range[0].parentNode.removeChild(this.$range[0])},a.fn[k]=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),e=d.data("plugin_"+k);e||d.data("plugin_"+k,e=new j(this,b)),"string"==typeof b&&e[b].apply(e,c)})},"rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"});


new RangeInput(document.querySelector('.range'));

// tab4 
$(document).ready(function(e) {
  $('#hearingtest').click(function(e) {
      $('.heard-tone-wrap').addClass('active');
      $(".btn-test-holder").css('display','none');
  });
});

// graph
var label = document.querySelector(".label");
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = 700;
var ch = c.height = 350;
var cx = cw / 2,
cy = ch / 2;
var rad = Math.PI / 180;
var frames = 0;

ctx.lineWidth = 1;
ctx.strokeStyle = "#000";
ctx.fillStyle = "#ccc";
ctx.font = "14px monospace";

var grd = ctx.createLinearGradient(0, 0, 0, cy);
grd.addColorStop(0, "hsla(167,72%,60%,1)");
grd.addColorStop(1, "hsla(167,72%,60%,0)");

var oData = {
"2008": 10,
"2009": 39.9,
"2010": 17,
"2011": 30.0,
"2012": 5.3,
"2013": 38.4,
"2014": 15.7,
"2015": 9.0
};

var valuesRy = [];
var propsRy = [];
for (var prop in oData) {

valuesRy.push(oData[prop]);
propsRy.push(prop);
}


var vData = 4;
var hData = valuesRy.length;
var offset = 50.5; //offset chart axis
var chartHeight = ch - 2 * offset;
var chartWidth = cw - 2 * offset;
var t = 1 / 7; // curvature : 0 = no curvature 
var speed = 2; // for the animation

var A = {
x: offset,
y: offset
}
var B = {
x: offset,
y: offset + chartHeight
}
var C = {
x: offset + chartWidth,
y: offset + chartHeight
}

/*
A  ^
|  |  
+ 25
|
|
|
+ 25  
|__|_________________________________  C
B
*/

// CHART AXIS -------------------------
ctx.beginPath();
ctx.moveTo(A.x, A.y);
ctx.lineTo(B.x, B.y);
ctx.lineTo(C.x, C.y);
ctx.stroke();

// vertical ( A - B )
var aStep = (chartHeight - 50) / (vData);

var Max = Math.ceil(arrayMax(valuesRy) / 10) * 10;
var Min = Math.floor(arrayMin(valuesRy) / 10) * 10;
var aStepValue = (Max - Min) / (vData);
console.log("aStepValue: " + aStepValue); //8 units
var verticalUnit = aStep / aStepValue;

var a = [];
ctx.textAlign = "right";
ctx.textBaseline = "middle";
for (var i = 0; i <= vData; i++) {

if (i == 0) {
a[i] = {
x: A.x,
y: A.y + 25,
val: Max
}
} else {
a[i] = {}
a[i].x = a[i - 1].x;
a[i].y = a[i - 1].y + aStep;
a[i].val = a[i - 1].val - aStepValue;
}
drawCoords(a[i], 3, 0);
}

//horizontal ( B - C )
var b = [];
ctx.textAlign = "center";
ctx.textBaseline = "hanging";
var bStep = chartWidth / (hData + 1);

for (var i = 0; i < hData; i++) {
if (i == 0) {
b[i] = {
x: B.x + bStep,
y: B.y,
val: propsRy[0]
};
} else {
b[i] = {}
b[i].x = b[i - 1].x + bStep;
b[i].y = b[i - 1].y;
b[i].val = propsRy[i]
}
drawCoords(b[i], 0, 3)
}

function drawCoords(o, offX, offY) {
ctx.beginPath();
ctx.moveTo(o.x - offX, o.y - offY);
ctx.lineTo(o.x + offX, o.y + offY);
ctx.stroke();

ctx.fillText(o.val, o.x - 2 * offX, o.y + 2 * offY);
}
//----------------------------------------------------------

// DATA
var oDots = [];
var oFlat = [];
var i = 0;

for (var prop in oData) {
oDots[i] = {}
oFlat[i] = {}

oDots[i].x = b[i].x;
oFlat[i].x = b[i].x;

oDots[i].y = b[i].y - oData[prop] * verticalUnit - 25;
oFlat[i].y = b[i].y - 25;

oDots[i].val = oData[b[i].val];

i++
}



///// Animation Chart ///////////////////////////
//var speed = 3;
function animateChart() {
requestId = window.requestAnimationFrame(animateChart);
frames += speed; //console.log(frames)
ctx.clearRect(60, 0, cw, ch - 60);

for (var i = 0; i < oFlat.length; i++) {
if (oFlat[i].y > oDots[i].y) {
oFlat[i].y -= speed;
}
}
drawCurve(oFlat);
for (var i = 0; i < oFlat.length; i++) {
ctx.fillText(oDots[i].val, oFlat[i].x, oFlat[i].y - 25);
ctx.beginPath();
ctx.arc(oFlat[i].x, oFlat[i].y, 3, 0, 2 * Math.PI);
ctx.fill();
}

if (frames >= Max * verticalUnit) {
window.cancelAnimationFrame(requestId);

}
}
requestId = window.requestAnimationFrame(animateChart);

/////// EVENTS //////////////////////
c.addEventListener("mousemove", function(e) {
label.innerHTML = "";
label.style.display = "none";
this.style.cursor = "default";

var m = oMousePos(this, e);
for (var i = 0; i < oDots.length; i++) {

output(m, i);
}

}, false);

function output(m, i) {
ctx.beginPath();
ctx.arc(oDots[i].x, oDots[i].y, 20, 0, 2 * Math.PI);
if (ctx.isPointInPath(m.x, m.y)) {
//console.log(i);
label.style.display = "block";
label.style.top = (m.y + 10) + "px";
label.style.left = (m.x + 10) + "px";
label.innerHTML = "<strong>" + propsRy[i] + "</strong>: " + valuesRy[i] + "%";
c.style.cursor = "pointer";
}
}

// CURVATURE
function controlPoints(p) {
// given the points array p calculate the control points
var pc = [];
for (var i = 1; i < p.length - 1; i++) {
var dx = p[i - 1].x - p[i + 1].x; // difference x
var dy = p[i - 1].y - p[i + 1].y; // difference y
// the first control point
var x1 = p[i].x - dx * t;
var y1 = p[i].y - dy * t;
var o1 = {
x: x1,
y: y1
};

// the second control point
var x2 = p[i].x + dx * t;
var y2 = p[i].y + dy * t;
var o2 = {
x: x2,
y: y2
};

// building the control points array
pc[i] = [];
pc[i].push(o1);
pc[i].push(o2);
}
return pc;
}

function drawCurve(p) {

var pc = controlPoints(p); // the control points array

ctx.beginPath();
//ctx.moveTo(p[0].x, B.y- 25);
ctx.lineTo(p[0].x, p[0].y);
// the first & the last curve are quadratic Bezier
// because I'm using push(), pc[i][1] comes before pc[i][0]
ctx.quadraticCurveTo(pc[1][1].x, pc[1][1].y, p[1].x, p[1].y);

if (p.length > 2) {
// central curves are cubic Bezier
for (var i = 1; i < p.length - 2; i++) {
ctx.bezierCurveTo(pc[i][0].x, pc[i][0].y, pc[i + 1][1].x, pc[i + 1][1].y, p[i + 1].x, p[i + 1].y);
}
// the first & the last curve are quadratic Bezier
var n = p.length - 1;
ctx.quadraticCurveTo(pc[n - 1][0].x, pc[n - 1][0].y, p[n].x, p[n].y);
}

//ctx.lineTo(p[p.length-1].x, B.y- 25);
ctx.stroke();
ctx.save();
ctx.fillStyle = grd;
ctx.fill();
ctx.restore();
}

function arrayMax(array) {
return Math.max.apply(Math, array);
};

function arrayMin(array) {
return Math.min.apply(Math, array);
};

function oMousePos(canvas, evt) {
var ClientRect = canvas.getBoundingClientRect();
return { //objeto
x: Math.round(evt.clientX - ClientRect.left),
y: Math.round(evt.clientY - ClientRect.top)
}
}
