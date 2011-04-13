$().ready(function(){

var ballOne = new ball({
   radius   : 100,
   velocity : new vector(0, 1),
   start    : new vector(20, 20)
});

var ballTwo = new ball({
   radius   : 10,
   velocity : new vector(-10, 0),
   start    : new vector(300, 50)
});

alert(ballManager.timeOfCollision(ballOne, ballTwo));

});