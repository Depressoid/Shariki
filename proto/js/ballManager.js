var ballManager = {
   options : {
      maxV       : 350,
      minV       : 30,
      minRadius  : 20,
      maxRadius  : 90,
      step       : 0.05
   },
   _time       : 0,
   _epsilon    : 0.0000001,
   _collision  : null,
   _balls      : [],
   init : function(options){
      this.ballFactory = options.ballFactory;
      this.ballOptions = options.ballOptions;
   },
   addRandomBall : function(){
      var self = this;
      var screenHeight = $(window).height();
      var screenWidth  = $(window).width();
      var opt = this.options;
   
      var randomVelocity = function(){
         return utils.randFloat(-opt.maxV, opt.maxV);
      };
      var randomStart = function(R){
         var start, ball, i; 
         var intersect     = true;
         while (intersect)
         {
            start          = new vector(utils.randInt(R, screenWidth - R), utils.randInt(R, screenHeight - R));
            notIntersect   = true;
            for (i = self._balls.length - 1; i >= 0; --i)
            {
               ball = self._balls[i];
               if (ball.start.summ(start.negate()).abs() < ball.radius + R)
               {
                  notIntersect = false;
                  break;
               }
            }
            intersect = !notIntersect;
         }
         return start;
      };
      
      var 
          V     = new vector(randomVelocity(), randomVelocity()),
          R     = utils.randInt(opt.minRadius, opt.maxRadius);
      var Start = randomStart(R);
      
      this._balls.push(
         this.ballFactory.create($.extend({
            radius   : R,
            velocity : V,
            start    : Start
         }, this.ballOptions))
      );
   },
   nextPosition : function(){
      var i, nextTime, timeToStepEnd, timeToNextCollision, step;
      
      step = this.options.step;
      
      nextTime  = this._time + step;
      
      if (this._collision.timeOfCollision > nextTime) {
      
         this.moveBalls(step);
         return;
      }
      
      timeToNextCollision  = this._collision.timeOfCollision -  this._time;
      timeToStepEnd        = step;
      
      while (timeToStepEnd > timeToNextCollision)
      {
         timeToStepEnd  -= timeToNextCollision;
         
         this.moveBalls(timeToNextCollision);
         this.setCurrentStateAsStart();
         this._collision.after();
         this.recalc();
         
         timeToNextCollision   = this._collision.timeOfCollision;
      }
      
      this.moveBalls(timeToStepEnd);
      this.setCurrentStateAsStart();
      this.setCurrentTimeAsStart();
   },
   setCurrentTimeAsStart  : function(){
      this._collision.timeOfCollision -= this._time;
      this._time = 0;
   },
   setCurrentStateAsStart : function(){
      var i, ball;
      for (var i = this._balls.length - 1; i >= 0; --i)
      {
         ball        = this._balls[i];
         ball.start  = ball.velocity.multiplyNumber(this._time).summ(ball.start);
      }
   },
   moveBalls : function(deltaT){
      var i;
      this._time += deltaT;
      for (i = this._balls.length - 1; i >= 0; --i)
            this._balls[i].move(deltaT);
   },
   timeOfCollisionVerticalWall : function(ball){
      var leftWallTime  = (ball.radius - ball.start.x) / ball.velocity.x;
      var rightWallTime = ($(window).width() - ball.radius - ball.start.x) / ball.velocity.x;
      
      return Math.max(leftWallTime, rightWallTime);
   },
   timeOfCollisionHorizontalWall : function(ball){
      var topWallTime      = (ball.radius - ball.start.y) / ball.velocity.y;
      var bottomWallTime   = ($(window).height() - ball.radius -  ball.start.y) / ball.velocity.y;
      
      return Math.max(topWallTime, bottomWallTime);
   },
   timeOfCollisionTwoBalls : function(ballOne, ballTwo){
      var dV = ballOne.velocity.summ(ballTwo.velocity.negate());
      var dX = ballOne.start.summ(ballTwo.start.negate());
      var radiusSumm = ballOne.radius + ballTwo.radius;
    
      var coeffA = vector.scalarMultiply(dV, dV);
      var coeffB = vector.scalarMultiply(dV, dX);
      var coeffC = vector.scalarMultiply(dX, dX) - radiusSumm * radiusSumm;
      
      var discriminant = coeffB * coeffB - coeffA * coeffC;
      if (Math.abs(discriminant) <= this._epsilon)
         discriminant = 0;
      
      if (discriminant < 0) 
         return null;
         
      t1 = (-coeffB + Math.sqrt(discriminant)) / coeffA;
      t2 = (-coeffB - Math.sqrt(discriminant)) / coeffA;
      
      var min = Math.min(t1, t2);
      var max = Math.max(t1, t2);
      
      if (Math.abs(min) < this._epsilon)
         min = 0;
         
      if (Math.abs(max) < this._epsilon)
         max = 0;
      
      return max > 0 && min > 0 
         ? min
         : min < 0 && max > 0 
            ? max 
            : null;
   },
   recalc : function(){
      var t, ballOne, ballTwo, length, minTime, collision;
      length  = this._balls.length;
      minTime = 10000000000;
      
      for (var i = 0; i < length; ++i)
      {
         ballOne = this._balls[i];
         t = this.timeOfCollisionVerticalWall(ballOne);
         if (t < minTime)
         {
            minTime = t;
            collision && collision.dispose();
            collision = new wallCollision(ballOne, false, t);
         }
         
         t = this.timeOfCollisionHorizontalWall(ballOne);
         if (t < minTime)
         {
            minTime = t;
            collision && collision.dispose();
            collision = new wallCollision(ballOne, true, t);
         }
            
         
         for (var j = i + 1; j < length; ++j)
         {
            ballTwo = this._balls[j];
            t = this.timeOfCollisionTwoBalls(ballOne, ballTwo);
            if (t && t < minTime)
            {
               minTime = t;
               collision && collision.dispose();
               collision = new ballCollision(ballOne, ballTwo, t);
            }
         }
      }
      
      this._time = 0;
      this._collision && this._collision.dispose();
      this._collision = collision;
   }
};