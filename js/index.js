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
