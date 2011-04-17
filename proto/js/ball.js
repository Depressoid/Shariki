(function($){

var ball = function ball(options) {
   this.options = $.extend({}, this.options, options || {});
   this._init();
};
window.ball = ball;
ball.prototype = {
   options : {
      radius   : 30,
      velocity : new vector(10, 10),
      mass     : 1,
      density  : 1,
      start    : new vector(100, 100),
      canvas   : null
   },
   _init : function(){
      var opt        = this.options;
      this.radius    = opt.radius;
      this.velocity  = opt.velocity;
      this.mass      = opt.density * this.area();
      this.start = this.center = opt.start;
   },
   area : function(){
      return Math.PI * this.radius * this.radius;
   },
   move : function(deltaT) {
      this.center = this.velocity.multiplyNumber(deltaT).summ(this.center);
   },
   setCenter : function(center){
      this.center = center;
   }
};

})(jQuery);