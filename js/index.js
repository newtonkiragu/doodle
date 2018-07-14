var SPEED = 1;

var LINE_WIDTH = 2;
var LINE_DISTANCE = 2;
//var LINE_COLOR = 'rgb(255,0,0)';
var LINE_CAP = 'square';//square, butt or round

var SHAPE_RENDERING = 'optimizeSpeed';//auto, optimizeSpeed, crispEdges, geometricPrecision

var COLOR_CICLE_SPEED_R = 0.040;
var COLOR_CICLE_SPEED_G = 0.028;
var COLOR_CICLE_SPEED_B = 0.052;
var COLOR_BRIGHTNESS_MIN = 100;
var COLOR_BRIGHTNESS_MAX = 255;

var BG_COLOR = 'rgb(0,0,0)';

var w = (window.innerWidth > 0) ? window.innerWidth : screen.width;;
var h = (window.innerHeight > 0) ? window.innerHeight : screen.height;;

//---

var canvas;

var lineHolder = [];
var lineHolderWidth = 0;
var lineHolderHeight = 0;

var path;
var pathCoordinates = '';

var bg;

var posHolder;

var counter;
var halftime;

var interval;

var btSaveSVG;
var btSavePNG;
var btRestart;

var color = {};

//---

var patternLineTop = {};
		patternLineTop.coords = [ { x:0, y:-1 } ];
    patternLineTop.maxLength = Math.floor( w / ( LINE_WIDTH + LINE_DISTANCE ) ) / 2;
    patternLineTop.currentLength = 0;
    patternLineTop.allowLimit = true;
    patternLineTop.index = 0;
    patternLineTop.indexAscending = false;

var patternLineDown = {};
		patternLineDown.coords = [ { x:0, y:1 } ];
    patternLineDown.maxLength = Math.floor( w / ( LINE_WIDTH + LINE_DISTANCE ) ) / 2;
    patternLineDown.currentLength = 0;
    patternLineDown.allowLimit = true;
    patternLineDown.index = 0;
    patternLineDown.indexAscending = false;

var patternLineLeft = {};
    patternLineLeft.coords = [ { x:-1, y:0 } ];
    patternLineLeft.maxLength = Math.floor( w / ( LINE_WIDTH + LINE_DISTANCE ) ) / 2;
    patternLineLeft.currentLength = 0;
    patternLineLeft.allowLimit = true;
    patternLineLeft.index = 0;
    patternLineLeft.indexAscending = false;
