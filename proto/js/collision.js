var baseCollision = {
   isCollision : function(time){
      return time >= this.timeOfCollision;
   },
   after : function(){},
   dispose : function(){}
};

var ballCollision = function ballCollision(ballOne, ballTwo, timeOfCollision){
   this.ballOne         = ballOne;
   this.ballTwo         = ballTwo;
   this.timeOfCollision = timeOfCollision;
};
window.ballCollision = ballCollision;
ballCollision.prototype = $.extend({}, baseCollision, {
   dispose : function(){
      this.ballOne = undefined;
      this.ballTwo = undefined;
   },
   after : function(){
      var m1 = this.ballOne.mass;
      var m2 = this.ballTwo.mass;
      var v1 = this.ballOne.velocity;
      var v2 = this.ballTwo.velocity;
      var x1 = this.ballOne.start;
      var x2 = this.ballTwo.start;
   
      var centerOne = this.ballOne.center;
      var centerTwo = this.ballTwo.center;
      
      var normalUnitVector    = centerOne.summ(centerTwo.negate()).getUnitVector();
      var tangentUnitVector   = normalUnitVector.rotate(Math.PI / 2);
      
      var normalVelocityOne   = v1.multiply(normalUnitVector);
      var tangentVelocityOne  = v1.multiply(tangentUnitVector);
      
      var normalVelocityTwo   = v2.multiply(normalUnitVector);
      var tangentVelocityTwo  = v2.multiply(tangentUnitVector);
      
      var normalVelocityOneAfter = (normalVelocityOne * (m1 - m2) + 2 * m2 * normalVelocityTwo) / (m1 + m2);
      var normalVelocityTwoAfter = (normalVelocityTwo * (m2 - m1) + 2 * m1 * normalVelocityOne) / (m1 + m2);
      
      var v1After = vector.summ(normalUnitVector.multiplyNumber(normalVelocityOneAfter), tangentUnitVector.multiplyNumber(tangentVelocityOne));
      var v2After = vector.summ(normalUnitVector.multiplyNumber(normalVelocityTwoAfter), tangentUnitVector.multiplyNumber(tangentVelocityTwo));
      
      this.ballOne.velocity = v1After;
      this.ballTwo.velocity = v2After;
   }
});

var wallCollision = function wallCollision(ball, isHorizontal, timeOfCollision){
   this.ball            = ball;
   this.isHorizontal    = isHorizontal;
   this.timeOfCollision = timeOfCollision;
};
window.wallCollision = wallCollision;
wallCollision.prototype = $.extend({}, baseCollision, {
   dispose : function(){
      this.ball = undefined;
   },
   after : function(){
      this.ball.velocity   = this.ball.velocity[this.isHorizontal ? 'reflectByHorizontal' : 'reflectByVertical']();
   }
});
