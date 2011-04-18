var utils  = {
   randFloat : function(a, b){
      return a +  Math.random() * (b - a);
   },
   randInt  : function(a, b) {
      var intervalLength = b - a + 1;
   
      var randInterval =  Math.floor(Math.random() * intervalLength);   
      
      if (randInterval === intervalLength)
         randInterval -= 1;
         
      return a + randInterval;

   }
};
window.utils = utils;