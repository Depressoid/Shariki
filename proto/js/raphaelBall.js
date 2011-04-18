var raphaelBall = function raphaelBall(options) {
   this.options = $.extend({}, this.options, options || {});
   this._init();
};

window.raphaelBall = raphaelBall;

raphaelBall.prototype = $.extend(true, {}, ball.prototype, {
   options : {
      minColor : 50,
      maxColor : 255
   },
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
   _randGradient : function(){
      var max = this.options.maxColor;
      var min = this.options.minColor;
      var numberPartsOfColor = 3;
      
      var minColor = '';
      var maxColor = '';
      
      for (var i = 0; i < numberPartsOfColor; ++i)
      {
         var color1 = utils.randInt(min, max);
         var color2 = utils.randInt(min, max);
         
         minColor += Math.min(color1, color2).toString(16);
         maxColor += Math.max(color1, color2).toString(16);
      }
      return '#' + maxColor + '-#' + minColor;
   },
   render : function(){
      var self = this;
      
      if (!self.renderBall)
      {
         self.renderBall = this.canvas.circle(self.center.x, self.center.y, self.radius);
         self.renderBall.attr({
            fill           : 'r(0.5, 0.5)' + self._randGradient(),
            'fill-opacity' : 0.8,
            'stroke-width' : 0
         });
      }
   }
});