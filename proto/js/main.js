(function($){

$().ready(function(){

var $window = $(window);

var getWindowSize = function(){
   return {width : $window.width(), height : $window.height()};
};

var windowSize = getWindowSize();

var panel = new Raphael(0, 0, windowSize.width, windowSize.height);


var radius = 24;
var dx = 8;
var dy = 5;
var x = 100;
var y = 100;

var c = new circle({
   panel    : panel,
   x        : x,
   y        : y,
   radius   : radius
});

var move = function(){
   x += dx;
   y += dy;
   var size = getWindowSize();
   if (x - radius < 0 || x + radius > size.width)
   {
      dx = -dx;
      x = x < radius 
         ? 2 * radius - x 
         : 2 * size.width - x - 2 * radius;
   }
      
   if (y - radius < 0 || y + radius > size.height)
   {
      dy = -dy;
      y = y < radius 
         ? 2 * radius - y
         : 2 * size.height - y - 2 * radius;
   }
   
   c.setPosition(x, y);
};

var start = function(){
   window.interval = setInterval(move, 30);
};

var stop = function(){
   clearInterval(window.interval);
};
var isStart = false;

$(document.body).click(function(){
   isStart = !isStart;
   isStart ? start() : stop();
});

});

var circle = function(options){
   this.options = $.extend({}, this.options, options || {});
   this._init();
};
circle.prototype = {
   options : {},
   _init : function(){
      this._render();
   },
   _render : function(){
      var self = this;
      var opt  = self.options;
      self.circle = opt.panel.circle(opt.x, opt.y, opt.radius);
      self.circle.attr({fill: "#393",  opacity: 0.9});
      self.circle.toFront();
   },
   run : function(){
      
   },
   move : function(x, y){
      this.circle.translate(x, y);
   },
   setPosition : function(x, y){
      this.circle.attr({
         cx : x,
         cy : y
      });
   },
   setPositionAnimate : function(x, y, timespan, callback){
      
   }
};

})(jQuery);