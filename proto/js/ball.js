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
      start    : new vector(100, 100)
   },
   _init : function(){
      var opt        = this.options;
      this.radius    = opt.radius;
      this.velocity  = opt.velocity;
      this.mass      = opt.mass;
      this.start = this.center = opt.start;
      
   }
};

var ballCollision = function ballCollision(ballOne, ballTwo, timeOfCollision){
   this.ballOne         = ballOne;
   this.ballTwo         = ballTwo;
   this.timeOfCollision = timeOfCollision;
};
window.ballCollision = ballCollision;
ballCollision.prototype = function(){
   
   
};

})(jQuery);