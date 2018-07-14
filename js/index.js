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

var patternLineRight = {};
    patternLineRight.coords = [ { x:1, y:0 } ];
    patternLineRight.maxLength = Math.floor( w / ( LINE_WIDTH + LINE_DISTANCE ) ) / 2;
    patternLineRight.currentLength = 0;
    patternLineRight.allowLimit = true;
    patternLineRight.index = 0;
    patternLineRight.indexAscending = false;

var patternRandom = {};
    patternRandom.coords = [ { x:0, y:0 } ];
    patternRandom.maxLength = Math.floor( w / ( LINE_WIDTH + LINE_DISTANCE ) );//15;//Math.floor( w / ( LINE_WIDTH + LINE_DISTANCE ) ) * Math.floor( h / ( LINE_WIDTH + LINE_DISTANCE ) );
    patternRandom.currentLength = 0;
    patternRandom.allowLimit = true;
    patternRandom.index = 0;
    patternRandom.indexAscending = false;

var patternSpiralLeft = {};
		patternSpiralLeft.coords = [ { x:0, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 } ];
    patternSpiralLeft.maxLength = patternSpiralLeft.coords.length;
    patternSpiralLeft.currentLength = 0;
    patternSpiralLeft.allowLimit = false;
    patternSpiralLeft.index = 0;
    patternSpiralLeft.indexAscending = true;

var patternSpiralRight = {};
		patternSpiralRight.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 } ];
    patternSpiralRight.maxLength = patternSpiralRight.coords.length;
    patternSpiralRight.currentLength = 0;
    patternSpiralRight.allowLimit = false;
    patternSpiralRight.index = 0;
    patternSpiralRight.indexAscending = true;

var patternSquare3x3 = {};
    patternSquare3x3.coords = [ { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 } ];
    patternSquare3x3.maxLength = patternSquare3x3.coords.length;
    patternSquare3x3.currentLength = 0;
    patternSquare3x3.allowLimit = true;
    patternSquare3x3.index = 0;
    patternSquare3x3.indexAscending = true;

var patternCross1x1 = {};
    patternCross1x1.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 } ];
    patternCross1x1.maxLength = patternCross1x1.coords.length;
    patternCross1x1.currentLength = 0;
    patternCross1x1.allowLimit = false;
    patternCross1x1.index = 0;
    patternCross1x1.indexAscending = true;

var patternCross2x2 = {};
    patternCross2x2.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 } ];
    patternCross2x2.maxLength = patternCross2x2.coords.length;
    patternCross2x2.currentLength = 0;
    patternCross2x2.allowLimit = false;
    patternCross2x2.index = 0;
    patternCross2x2.indexAscending = true;

var patternCross3x3 = {};
    patternCross3x3.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 } ];
    patternCross3x3.maxLength = patternCross3x3.coords.length;
    patternCross3x3.currentLength = 0;
    patternCross3x3.allowLimit = false;
    patternCross3x3.index = 0;
    patternCross3x3.indexAscending = true;

var patternCross4x4 = {};
    patternCross4x4.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 } ];
    patternCross4x4.maxLength = patternCross4x4.coords.length;
    patternCross4x4.currentLength = 0;
    patternCross4x4.allowLimit = false;
    patternCross4x4.index = 0;
    patternCross4x4.indexAscending = true;

var patternHorseshoeUp1x1 = {};
    patternHorseshoeUp1x1.coords = [ { x:0, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 } ];
    patternHorseshoeUp1x1.maxLength = patternHorseshoeUp1x1.coords.length;
    patternHorseshoeUp1x1.currentLength = 0;
    patternHorseshoeUp1x1.allowLimit = false;
    patternHorseshoeUp1x1.index = 0;
    patternHorseshoeUp1x1.indexAscending = true;

var patternHorseshoeDown1x1 = {};
    patternHorseshoeDown1x1.coords = [ { x:0, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 } ];
    patternHorseshoeDown1x1.maxLength = patternHorseshoeDown1x1.coords.length;
    patternHorseshoeDown1x1.currentLength = 0;
    patternHorseshoeDown1x1.allowLimit = false;
    patternHorseshoeDown1x1.index = 0;
    patternHorseshoeDown1x1.indexAscending = true;

var patternHorseshoeLeft1x1 = {};
    patternHorseshoeLeft1x1.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 } ];
    patternHorseshoeLeft1x1.maxLength = patternHorseshoeLeft1x1.coords.length;
    patternHorseshoeLeft1x1.currentLength = 0;
    patternHorseshoeLeft1x1.allowLimit = false;
    patternHorseshoeLeft1x1.index = 0;
    patternHorseshoeLeft1x1.indexAscending = true;

var patternHorseshoeRight1x1 = {};
    patternHorseshoeRight1x1.coords = [ { x:0, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 } ];
    patternHorseshoeRight1x1.maxLength = patternHorseshoeRight1x1.coords.length;
    patternHorseshoeRight1x1.currentLength = 0;
    patternHorseshoeRight1x1.allowLimit = false;
    patternHorseshoeRight1x1.index = 0;
    patternHorseshoeRight1x1.indexAscending = true;

var patternHorseshoeUp2x2 = {};
    patternHorseshoeUp2x2.coords = [ { x:0, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 } ];
    patternHorseshoeUp2x2.maxLength = patternHorseshoeUp2x2.coords.length;
    patternHorseshoeUp2x2.currentLength = 0;
    patternHorseshoeUp2x2.allowLimit = true;
    patternHorseshoeUp2x2.index = 0;
    patternHorseshoeUp2x2.indexAscending = true;

var patternHorseshoeDown2x2 = {};
    patternHorseshoeDown2x2.coords = [ { x:0, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 } ];
    patternHorseshoeDown2x2.maxLength = patternHorseshoeDown2x2.coords.length;
    patternHorseshoeDown2x2.currentLength = 0;
    patternHorseshoeDown2x2.allowLimit = true;
    patternHorseshoeDown2x2.index = 0;
    patternHorseshoeDown2x2.indexAscending = true;

var patternHorseshoeLeft2x2 = {};
    patternHorseshoeLeft2x2.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 } ];
    patternHorseshoeLeft2x2.maxLength = patternHorseshoeLeft2x2.coords.length;
    patternHorseshoeLeft2x2.currentLength = 0;
    patternHorseshoeLeft2x2.allowLimit = true;
    patternHorseshoeLeft2x2.index = 0;
    patternHorseshoeLeft2x2.indexAscending = true;

var patternHorseshoeRight2x2 = {};
    patternHorseshoeRight2x2.coords = [ { x:0, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:1, y:0 } ];
    patternHorseshoeRight2x2.maxLength = patternHorseshoeRight2x2.coords.length;
    patternHorseshoeRight2x2.currentLength = 0;
    patternHorseshoeRight2x2.allowLimit = true;
    patternHorseshoeRight2x2.index = 0;
    patternHorseshoeRight2x2.indexAscending = true;

var patternHorseshoeUp3x3 = {};
    patternHorseshoeUp3x3.coords = [ { x:0, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 } ];
    patternHorseshoeUp3x3.maxLength = patternHorseshoeUp3x3.coords.length;
    patternHorseshoeUp3x3.currentLength = 0;
    patternHorseshoeUp3x3.allowLimit = true;
    patternHorseshoeUp3x3.index = 0;
    patternHorseshoeUp3x3.indexAscending = true;

var patternHorseshoeDown3x3 = {};
    patternHorseshoeDown3x3.coords = [ { x:0, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 } ];
    patternHorseshoeDown3x3.maxLength = patternHorseshoeDown3x3.coords.length;
    patternHorseshoeDown3x3.currentLength = 0;
    patternHorseshoeDown3x3.allowLimit = true;
    patternHorseshoeDown3x3.index = 0;
    patternHorseshoeDown3x3.indexAscending = true;

var patternHorseshoeLeft3x3 = {};
    patternHorseshoeLeft3x3.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 } ];
    patternHorseshoeLeft3x3.maxLength = patternHorseshoeLeft3x3.coords.length;
    patternHorseshoeLeft3x3.currentLength = 0;
    patternHorseshoeLeft3x3.allowLimit = true;
    patternHorseshoeLeft3x3.index = 0;
    patternHorseshoeLeft3x3.indexAscending = true;

var patternHorseshoeRight3x3 = {};
    patternHorseshoeRight3x3.coords = [ { x:0, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 } ];
    patternHorseshoeRight3x3.maxLength = patternHorseshoeRight3x3.coords.length;
    patternHorseshoeRight3x3.currentLength = 0;
    patternHorseshoeRight3x3.allowLimit = true;
    patternHorseshoeRight3x3.index = 0;
    patternHorseshoeRight3x3.indexAscending = true;

var patternZigZagTop1x1 = {};
    patternZigZagTop1x1.coords = [ { x:0, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 } ];
    patternZigZagTop1x1.maxLength = patternZigZagTop1x1.coords.length;
    patternZigZagTop1x1.currentLength = 0;
    patternZigZagTop1x1.allowLimit = true;
    patternZigZagTop1x1.index = 0;
    patternZigZagTop1x1.indexAscending = true;

var patternZigZagDown1x1 = {};
    patternZigZagDown1x1.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }  ];
    patternZigZagDown1x1.maxLength = patternZigZagDown1x1.coords.length;
    patternZigZagDown1x1.currentLength = 0;
    patternZigZagDown1x1.allowLimit = true;
    patternZigZagDown1x1.index = 0;
    patternZigZagDown1x1.indexAscending = true;

var patternZigZagLeft1x1 = {};
    patternZigZagLeft1x1.coords = [ { x:0, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 } ];
    patternZigZagLeft1x1.maxLength = patternZigZagLeft1x1.coords.length;
    patternZigZagLeft1x1.currentLength = 0;
    patternZigZagLeft1x1.allowLimit = true;
    patternZigZagLeft1x1.index = 0;
    patternZigZagLeft1x1.indexAscending = true;

var patternZigZagRightt1x1 = {};
    patternZigZagRightt1x1.coords = [ { x:0, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 } ];
    patternZigZagRightt1x1.maxLength = patternZigZagRightt1x1.coords.length;
    patternZigZagRightt1x1.currentLength = 0;
    patternZigZagRightt1x1.allowLimit = true;
    patternZigZagRightt1x1.index = 0;
    patternZigZagRightt1x1.indexAscending = true;

var patternSpiralLeftXXL = {};
		patternSpiralLeftXXL.coords = [ { x:0, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }  ];
    patternSpiralLeftXXL.maxLength = patternSpiralLeftXXL.coords.length;
    patternSpiralLeftXXL.currentLength = 0;
    patternSpiralLeftXXL.allowLimit = false;
    patternSpiralLeftXXL.index = 0;
    patternSpiralLeftXXL.indexAscending = true;

var patternSpiralRightXL = {};
		patternSpiralRightXL.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:-1, y:0 } ];
    patternSpiralRightXL.maxLength = patternSpiralRightXL.coords.length;
    patternSpiralRightXL.currentLength = 0;
    patternSpiralRightXL.allowLimit = false;
    patternSpiralRightXL.index = 0;
    patternSpiralRightXL.indexAscending = true;

var patternEagle = {};
		patternEagle.coords = [ { x:0, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:-1, y:0 } ];
    patternEagle.maxLength = patternEagle.coords.length;
    patternEagle.currentLength = 0;
    patternEagle.allowLimit = false;
    patternEagle.index = 0;
    patternEagle.indexAscending = true;

var patternDiagonalTopLeft = {};
		patternDiagonalTopLeft.coords = [ { x:0, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:0, y:-1 }  ];
    patternDiagonalTopLeft.maxLength = patternDiagonalTopLeft.coords.length;
    patternDiagonalTopLeft.currentLength = 0;
    patternDiagonalTopLeft.allowLimit = true;
    patternDiagonalTopLeft.index = 0;
    patternDiagonalTopLeft.indexAscending = true;

var patternDiagonalTopRight = {};
		patternDiagonalTopRight.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:-1 } , { x:1, y:0 }, { x:0, y:-1 } , { x:1, y:0 }, { x:0, y:-1 } , { x:1, y:0 }, { x:0, y:-1 } , { x:1, y:0 }, { x:0, y:-1 } , { x:1, y:0 }, { x:0, y:-1 } , { x:1, y:0 }, { x:0, y:-1 } , { x:1, y:0 }, { x:0, y:-1 } , { x:1, y:0 }, { x:0, y:-1 } , { x:1, y:0 }, { x:0, y:-1 }   ];
    patternDiagonalTopRight.maxLength = patternDiagonalTopRight.coords.length;
    patternDiagonalTopRight.currentLength = 0;
    patternDiagonalTopRight.allowLimit = true;
    patternDiagonalTopRight.index = 0;
    patternDiagonalTopRight.indexAscending = true;

var patternDiagonalBottomLeft = {};
		patternDiagonalBottomLeft.coords = [ { x:0, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:0, y:1 }  ];
    patternDiagonalBottomLeft.maxLength = patternDiagonalBottomLeft.coords.length;
    patternDiagonalBottomLeft.currentLength = 0;
    patternDiagonalBottomLeft.allowLimit = true;
    patternDiagonalBottomLeft.index = 0;
    patternDiagonalBottomLeft.indexAscending = true;

var patternDiagonalBottomRight = {};
		patternDiagonalBottomRight.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:1 }  ];
    patternDiagonalBottomRight.maxLength = patternDiagonalBottomRight.coords.length;
    patternDiagonalBottomRight.currentLength = 0;
    patternDiagonalBottomRight.allowLimit = true;
    patternDiagonalBottomRight.index = 0;
    patternDiagonalBottomRight.indexAscending = true;

var patternZigZagTop2x2 = {};
    patternZigZagTop2x2.coords = [ { x:0, y:0 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 } ];
    patternZigZagTop2x2.maxLength = patternZigZagTop2x2.coords.length;
    patternZigZagTop2x2.currentLength = 0;
    patternZigZagTop2x2.allowLimit = true;
    patternZigZagTop2x2.index = 0;
    patternZigZagTop2x2.indexAscending = true;

var patternZigZagLeft2x2 = {};
    patternZigZagLeft2x2.coords = [ { x:0, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:-1, y:0 } ];
    patternZigZagLeft2x2.maxLength = patternZigZagLeft2x2.coords.length;
    patternZigZagLeft2x2.currentLength = 0;
    patternZigZagLeft2x2.allowLimit = true;
    patternZigZagLeft2x2.index = 0;
    patternZigZagLeft2x2.indexAscending = true;

var patternZigZagTop2x1 = {};
    patternZigZagTop2x1.coords = [ { x:0, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:-1, y:0 }, { x:-1, y:0 }, { x:0, y:-1 }, { x:1, y:0 }, { x:1, y:0 }, { x:0, y:-1 }  ];
    patternZigZagTop2x1.maxLength = patternZigZagTop2x1.coords.length;
    patternZigZagTop2x1.currentLength = 0;
    patternZigZagTop2x1.allowLimit = true;
    patternZigZagTop2x1.index = 0;
    patternZigZagTop2x1.indexAscending = true;

var patternZigZagRight2x1 = {};
    patternZigZagRight2x1.coords = [ { x:0, y:0 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }, { x:1, y:0 }, { x:0, y:1 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:-1 }, { x:0, y:-1 }   ];
    patternZigZagRight2x1.maxLength = patternZigZagRight2x1.coords.length;
    patternZigZagRight2x1.currentLength = 0;
    patternZigZagRight2x1.allowLimit = true;
    patternZigZagRight2x1.index = 0;
    patternZigZagRight2x1.indexAscending = true;

var patterns = [

	patternLineTop,
  patternLineDown,
  patternLineLeft,
  patternLineRight,
  patternRandom,
  patternSpiralLeft,
  patternSpiralRight,
  patternSquare3x3,
  patternCross1x1,
  patternCross2x2,
  patternCross3x3,
  patternCross4x4,
  patternHorseshoeUp1x1,
  patternHorseshoeDown1x1,
  patternHorseshoeLeft1x1,
  patternHorseshoeRight1x1,
  patternHorseshoeUp2x2,
  patternHorseshoeDown2x2,
  patternHorseshoeLeft2x2,
  patternHorseshoeRight2x2,
  patternHorseshoeUp3x3,
  patternHorseshoeDown3x3,
  patternHorseshoeLeft3x3,
  patternHorseshoeRight3x3,
  patternZigZagTop1x1,
  patternZigZagDown1x1,
  patternZigZagLeft1x1,
  patternZigZagRightt1x1,
  patternSpiralRightXL,
  patternSpiralLeftXXL,
  patternEagle,
  patternDiagonalTopLeft,
  patternDiagonalTopRight,
  patternDiagonalBottomLeft,
  patternDiagonalBottomRight,
  patternZigZagTop2x2,
  patternZigZagLeft2x2,
  patternZigZagTop2x1,
  patternZigZagRight2x1

];

var patternCurrent;

//---

function init() {

	canvas = createCanvas( w , h , 'container' );

	lineHolderWidth = Math.floor( w / ( LINE_WIDTH + LINE_DISTANCE ) );
  lineHolderHeight = Math.floor( h / ( LINE_WIDTH + LINE_DISTANCE ) );

	//---

	restart();

  //---

  btSaveSVG = document.getElementById( 'btSaveSVG' );
  btSaveSVG.addEventListener( 'mousedown', btSaveSVGHandler, false );

  btSavePNG = document.getElementById( 'btSavePNG' );
  btSavePNG.addEventListener( 'mousedown', btSavePNGHandler, false );

  btRestart = document.getElementById( 'btRestart' );
  btRestart.addEventListener( 'mousedown', btRestartHandler, false );

};

//---

function restart() {

	if ( interval ) {

  	clearInterval( interval );

  }

	canvas.innerHTML = '';

	pathCoordinates = '';

  color.r = Math.random() * ( Math.PI * 2 );
  color.g = Math.random() * ( Math.PI * 2 );
  color.b = Math.random() * ( Math.PI * 2 );

  bg = createRect( 0, 0, w, h, BG_COLOR );

  canvas.appendChild( bg );

  path = createPath( getRGBColor( color ), LINE_WIDTH, LINE_CAP );

  canvas.appendChild( path );

	counter = 0;
  halftime = false;

	for ( var x = 0; x < lineHolderWidth; x++ ) {

  	lineHolder[ x ] = [];

    for ( var y = 0; y < lineHolderHeight; y++ ) {

      lineHolder[ x ][ y ] = 0;

    }

  }

  var newArrayPositionObject = getRandomDir( getRandomStartPos() );

  drawLine( 'M', newArrayPositionObject.position );

  interval = setInterval( function() {

  	drawLine( 'L', posHolder );

    counter++;

    if ( counter > ( lineHolder.length * lineHolder[ 0 ].length ) / 2 ) {
    //if ( counter > ( lineHolder.length * lineHolder[ 0 ].length ) - ( ( lineHolder.length * lineHolder[ 0 ].length ) / 4 ) ) {

  		halftime = true;

    }

    if ( counter >= lineHolder.length * lineHolder[ 0 ].length - 2 ) {//-2 because of the line at the beginning

    	console.log( 'checkEnd: ', checkEnd(), ' - ', counter, ' - ', lineHolder.length * lineHolder[ 0 ].length );

    	if ( checkEnd() ) {

      	clearInterval( interval );
        closePath();

      }

    }

  }, SPEED );

};

//---

function btSaveSVGHandler( e ) {

	saveSvg( canvas, 'Doodle.svg' );

};

function saveSvg( svgEl, name ) {

    svgEl.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );

    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob( [ preface, svgData ], { type:'image/svg+xml;charset=utf-8' } );
    var svgUrl = URL.createObjectURL( svgBlob );
    var downloadLink = document.createElement( 'a' );
        downloadLink.href = svgUrl;
        downloadLink.download = name;

    document.body.appendChild( downloadLink );
    downloadLink.click();
    document.body.removeChild( downloadLink );

}

function btSavePNGHandler( e ) {

	savePNG( canvas, 'Doodle.png' );

};

function savePNG( svgEl, name ) {

  var img = document.createElement('img');

	img.src = 'data:image/svg+xml;charset=utf-8,' + ( new XMLSerializer ).serializeToString( svgEl );
  img.onload = function() {

  	var canvas = document.createElement( 'canvas' );
    		canvas.width = w;
        canvas.height = h;

    var context = canvas.getContext( '2d' );

    context.drawImage( img, 0, 0 );

    canvas.toBlob( function( pngBlob ) {

      var pngUrl = URL.createObjectURL( pngBlob );

      var downloadLink = document.createElement( 'a' );
          downloadLink.href = pngUrl;
          downloadLink.download = name;

      document.body.appendChild( downloadLink );
      downloadLink.click();
      document.body.removeChild( downloadLink );

  	} );

  }

}

function btRestartHandler( e ) {

	restart();

};

//---

function checkEnd() {

	for ( var x = 0; x < lineHolderWidth; x++ ) {

    for ( var y = 0; y < lineHolderHeight; y++ ) {

      if ( lineHolder[ x ][ y ] === 0 ) {

      	return false;

      }

    }

  }

  return true;

};

//---

function drawLine( command, position ) {

	var oldArrayPosition = position;
  var newArrayPositionObject = getRandomDir( oldArrayPosition );

  var newCanvasPosition = getCanvasPosition( newArrayPositionObject.position );

  if ( newArrayPositionObject.draw ) {

  	if ( command === 'M' ) {



    	changePath( command, getCanvasPosition( oldArrayPosition ) );
      changePath( 'L', newCanvasPosition );

    } else if ( command === 'L' ) {

      changePath( command, newCanvasPosition );

    }

	} else {

  	pathCoordinates = '';
  	path = createPath( getRGBColor( color ), LINE_WIDTH, LINE_CAP );

  	canvas.appendChild( path );

  	changePath( 'M', newCanvasPosition );
    changePath( command, newCanvasPosition );

  }

  posHolder = newArrayPositionObject.position;

};

//---

function getCanvasPosition( position ) {

	return { x:position.x * ( LINE_WIDTH + LINE_DISTANCE ) + LINE_WIDTH, y:position.y * ( LINE_WIDTH + LINE_DISTANCE ) + LINE_WIDTH };

};

function getRandomStartPos() {

	var x = Math.floor( Math.random() * lineHolder.length );
  var y = Math.floor( Math.random() * lineHolder[ 0 ].length );

	return { x:x, y:y };

};

function getRandomDir( position ) {

	var newPositionObject = {};
	var newPositions = [];

	if (!patternCurrent) {

  	setRandomPattern();

  }

  //console.log( patternCurrent );

  if ( patternCurrent === patternRandom ) {

  	if ( position.x - 1 > -1 && position.x - 1 < lineHolderWidth && lineHolder[ position.x - 1 ][ position.y ] === 0 ) {

      newPositions.push( { x:position.x - 1, y:position.y } );

    }

    if ( position.x + 1 > -1 && position.x + 1 < lineHolderWidth && lineHolder[ position.x + 1 ][ position.y ] === 0 ) {

      newPositions.push( { x:position.x + 1, y:position.y } );

    }

    if ( position.y - 1 > -1 && position.y - 1 < lineHolderHeight && lineHolder[ position.x ][ position.y - 1 ] === 0 ) {

      newPositions.push( { x:position.x, y:position.y - 1 } );

    }

    if ( position.y + 1 > -1 && position.y + 1 < lineHolderHeight && lineHolder[ position.x ][ position.y + 1 ] === 0 ) {

      newPositions.push( { x:position.x, y:position.y + 1 } );

    }

  } else {

  	var p;

    if ( patternCurrent.indexAscending ) {

    	p = patternCurrent.coords[ patternCurrent.index ];

    } else {

    	p = patternCurrent.coords[ 0 ];

    }

    //patternCurrent.position.x += position.x + p.x;
    //patternCurrent.position.y += position.y + p.x;

    if ( position.x + p.x > -1 && position.x + p.x < lineHolderWidth && position.y + p.y > -1 && position.y + p.y < lineHolderHeight && lineHolder[ position.x + p.x ][ position.y + p.y ] === 0 ) {

      newPositions.push( { x:position.x + p.x, y:position.y + p.y } );

    }

  }

  patternCurrent.index++;

  if ( patternCurrent.index === patternCurrent.currentLength ) {

    patternCurrent.index = 0;
    patternCurrent.currentLength = 0;
  	patternCurrent = null;

    tidyUpPatterns();

  }

  if ( newPositions.length === 0 ) {

    newPositionObject.draw = false;

    if ( halftime ) {

      newPositionObject.position = getPosNearBy( position, lineHolder.length * lineHolder[ 0 ].length );

    } else {

    	newPositionObject.position = getPosRandomly( position, lineHolder.length * lineHolder[ 0 ].length );

    }

  } else {

  	newPositionObject.draw = true;

    if ( newPositions.length === 1 ) {

    	newPositionObject.position = newPositions[ 0 ];

    } else if ( newPositions.length > 1 ) {

      newPositionObject.position = newPositions[ Math.floor( Math.random() * newPositions.length ) ];

    }

  }

  lineHolder[ newPositionObject.position.x ][ newPositionObject.position.y ] = 1;

  return newPositionObject;

};

function getPosRandomly( position ) {

	var newPositions = [];

  for ( var x = 0; x < lineHolderWidth; x++ ) {

    for ( var y = 0; y < lineHolderHeight; y++ ) {

      if ( lineHolder[ x ][ y ] === 0 ) {

      	newPositions.push( { x:x, y:y } );

      }

    }

  }

  return newPositions[ Math.floor( Math.random() * newPositions.length ) ];

};

function getPosNearBy( position, maxRadius = 100 ) {

	for ( var radius = 1; radius < maxRadius; radius++ ) {

  	var newPositions = [];

  	var xs = position.x - radius;
    var ys = position.y - radius;
    var xe = position.x + radius;
    var ye = position.y + radius;

    for ( var x = xs; x < xe; x++ ) {

      for ( var y = ys; y < ye; y++ ) {

        if ( x > -1 && x < lineHolderWidth && y > -1 && y < lineHolderHeight && lineHolder[ x ][ y ] === 0 ) {

          newPositions.push( { x:x, y:y } );

        }

      }

    }

    if ( newPositions.length === 1 ) {

    	return newPositions[ 0 ];

    } else if ( newPositions.length > 1 ) {

      return newPositions[ Math.floor( Math.random() * newPositions.length ) ];

    }

  }

};

//---

function setRandomPattern() {

	if ( halftime ) {

		patternCurrent = patternRandom;

  } else {

  	patternCurrent = patterns[ Math.floor( Math.random() * patterns.length ) ];

  }

  if ( patternCurrent.allowLimit ) {

  	patternCurrent.currentLength = Math.floor( Math.random() * ( patternCurrent.maxLength - 5 ) ) + 5;//min length 5

  } else {

  	patternCurrent.currentLength = patternCurrent.maxLength;

  }

};

function tidyUpPatterns() {

	for ( var i = 0; i < patterns.length; i++ ) {

		var pattern = patterns[ i ];
    		pattern.index = 0;
        pattern.currentLength = 0;

  }

};

//---

function createCanvas( width, height, containerId ) {

  var canvas = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
      canvas.setAttribute( 'width', width );
      canvas.setAttribute( 'height', height );
   		canvas.setAttribute( 'shape-rendering', SHAPE_RENDERING );

  var container = document.getElementById( containerId );
  		container.appendChild( canvas );

  return canvas;

};

function createRect( x, y, width, height, color ) {

  var rect = document.createElementNS( 'http://www.w3.org/2000/svg', 'rect' );
  		rect.setAttribute( 'x', x );
      rect.setAttribute( 'y', y );
      rect.setAttribute( 'width', width );
      rect.setAttribute( 'height', height );
      rect.setAttribute( 'fill', color );

  return rect;

};

function createPath( color, w, lineCap ) {

	var path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
  		path.setAttribute( 'd', '' );
  		path.setAttribute( 'stroke', color );
      path.setAttribute( 'stroke-width', w );
      path.setAttribute( 'stroke-linecap', lineCap );
      path.setAttribute( 'fill', 'transparent' );

  return path;

};

function changePath( command, position ) {

	pathCoordinates += command + ' ' + position.x + ' ' + position.y + ' ';
  path.setAttribute( 'd', pathCoordinates );

};

function closePath() {

	pathCoordinates += 'Z';
  path.setAttribute( 'd', pathCoordinates );

};

//---

function getRGBColor( color ) {

  var r = Math.sin( color.r += COLOR_CICLE_SPEED_R ) * 128 + 127;
  var g = Math.sin( color.g += COLOR_CICLE_SPEED_G ) * 128 + 127;
  var b = Math.sin( color.b += COLOR_CICLE_SPEED_B ) * 128 + 127;

  //return 'rgb(' + r + ',' + g + ',' + b + ')';
  return clampColor( r, g, b, COLOR_BRIGHTNESS_MIN, COLOR_BRIGHTNESS_MAX );

};

function clampColor( cr, cg, cb, min, max ) {

  var r = Math.floor( Math.min( Math.max( min, cr ), max ) );
  var g = Math.floor( Math.min( Math.max( min, cg ), max ) );
  var b = Math.floor( Math.min( Math.max( min, cb ), max ) );

  return 'rgb(' + r + ',' + g + ',' + b + ')';

};

//---

init();
