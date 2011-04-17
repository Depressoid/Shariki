(function(){

var epsilon = 0.000000001;
var point =  function point(x, y){
   this.x = x || 0;
   this.y = y || 0;
};
window.point = point;

var vector = function vector(x, y){
   this.x = x || 0;
   this.y = y || 0;
};
window.vector = vector;

vector.prototype = {
   abs : function(){
      var x = this.x,
          y = this.y;
          
      return Math.sqrt(x*x + y*y);
   },
   getUnitVector : function(){
      var abs = this.abs();
      return new vector(this.x / abs, this.y / abs);
   },
   rotate : function(rad) {
   
      if (!this.x && !this.y) 
         return this
      
      var angle = Math.abs(this.x) < epsilon 
         ? this.y > 0 ? Math.PI / 2 : -Math.PI / 2
         : Math.atan(this.y / this.x);
      
      angle += this.y < 0 ? Math.PI : 0; 
      angle += rad;
      
      var abs = this.abs();
      
      return new vector(abs * Math.cos(angle), abs * Math.sin(angle));
   },
   multiply : function(v) {
      return vector.scalarMultiply(this, v);
   },
   multiplyNumber : function(number){
      return new vector(this.x * number, this.y * number);
   },
   summ : function(v) {
      return vector.summ(this, v);
   },
   negate : function(){
      return this.multiplyNumber(-1);
   },
   reflectByHorizontal : function(){
      return new vector(this.x, -this.y);
   },
   reflectByVertical : function(){
      return new vector(-this.x, this.y);
   }
};
vector.fromTwoPoints = function(startPoint, endPoint){
   return new vector(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
};
vector.scalarMultiply = function(v1, v2){
   return v1.x * v2.x + v1.y * v2.y;
};
vector.summ = function(v1, v2){
   return new vector(v1.x + v2.x, v1.y + v2.y);
};

})();