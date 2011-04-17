$().ready(function(){

var canvas = Raphael(0,0, $(window).width(), $(window).height());

var quantity = 10;

ballManager.options.step = 0.02;
ballManager.init({
   ballFactory : ballFactory, 
   ballOptions : {
      canvas : canvas
   }
});

for (var i = 0; i < quantity; ++i)
   ballManager.addRandomBall();
   
ballManager.recalc();

var start = false;
var timer;
var moveBalls = function(){
   ballManager.nextPosition();
};
toggleMovie = function(){

   start = !start;
   
   if (start)
      timer = setInterval(moveBalls, 20);
   else
      clearInterval(timer);
};

$(document.body).click(toggleMovie);
toggleMovie();

});