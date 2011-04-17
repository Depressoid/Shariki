$().ready(function(){

var canvas = Raphael(0,0, $(window).width(), $(window).height());


ballManager.options.step = 0.02;
ballManager.init({
   ballFactory : ballFactory, 
   ballOptions : {
      canvas : canvas
   }
});


ballManager.addRandomBall();
ballManager.addRandomBall();
ballManager.addRandomBall();
ballManager.addRandomBall();
ballManager.addRandomBall();
ballManager.addRandomBall();
ballManager.addRandomBall();
ballManager.addRandomBall();
ballManager.addRandomBall();



ballManager.recalc();

var start = false;
var timer;
var moveBalls = function(){
   ballManager.nextPosition();
}

$(document.body).click(function(){

   start = !start;
   
   if (start)
      timer = setInterval(moveBalls, 20);
   else
      clearInterval(timer);
});


});