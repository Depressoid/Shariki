window.raphaelBall = function raphaelBall(options) {
   this.options = $.extend({}, this.options, options || {});
   this._init();
};
raphaelBall.prototype = $.extend(true, {}, ball.prototype, {
   _init : function(){
      ball.prototype._init.apply(this, arguments);
      this.canvas = this.options.canvas;
      this.render();
   },
   move : function(deltaT){
      var self = this;
      ball.prototype.move.apply(self, arguments);
      
      self.renderBall.attr({
         cx    : self.center.x,
         cy    : self.center.y
      });
   },
   render : function(){
      var self = this;
      
      if (!self.renderBall)
      {
         self.renderBall = this.canvas.circle(self.center.x, self.center.y, self.radius);
         self.renderBall.attr({
            fill           : 'r(0.5, 0.5)#ff0-#aa0',
            'fill-opacity' : 0.7,
            stroke         : "#aa0"
         });
      }
   }
});