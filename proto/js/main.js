$().ready(function(){

var canvas = Raphael(0,0, $(window).width(), $(window).height());
var quantity = utils.randInt(1, 20);

ballManager.options.step = 0.02;
ballManager.init({
   ballFactory : ballFactory, 
   ballOptions : {
      canvas : canvas
   }
});

for (var i = 0; i < quantity; ++i)
   ballManager.addRandomBall();


var text = canvas.text(100, 100, 'Ебать, колотить.');
text.attr({
   x              : $(window).width() / 2,
   y              : $(window).height() / 2,
   font           : '52px "Times New Roman"',
   fill           : '#fff',
   'text-anchor'  : 'center'
});
text.toFront();
   
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