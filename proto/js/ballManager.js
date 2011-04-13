var ballManager = {
   _balls : [],
   timeOfCollision : function(ballOne, ballTwo){
      var dV = ballOne.velocity.summ(ballTwo.velocity.negate());
      var dX = ballOne.start.summ(ballTwo.start.negate());
      var radiusSumm = ballOne.radius + ballTwo.radius;
    
      var coeffA = dV.x * dV.x + dV.y * dV.y;
      var coeffB = dV.x * dX.x + dV.y * dX.y;
      var coeffC = dX.x * dX.x + dX.y * dX.y - radiusSumm * radiusSumm;
      
      var discriminant = coeffB * coeffB - coeffA * coeffC;
      
      if (discriminant < 0) 
         return null;
         
      t1 = (-coeffB + Math.sqrt(discriminant)) / coeffA;
      t2 = (-coeffB - Math.sqrt(discriminant)) / coeffA;
      
      
      var min = Math.min(t1, t2);
      var max = Math.max(t1, t2);
      
      return max > 0 && min > 0 
         ? min
         : min < 0 && max > 0 
            ? max 
            : null;
   }
};