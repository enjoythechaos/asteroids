(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = function() {};
  Asteroids.Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Asteroids.Util.randomVec = function(length) {
    /* take sqrt of random x value, the corrects the bias of using
       an unsquared random number for x */
    x_squared = Math.random() * length;
    x = Math.sqrt(x_squared);
    if (Math.random() > 0.5) {
      x = -1 * x;
    }
    y = Math.sqrt(Math.pow(length, 2) - x_squared);
    if (Math.random() > 0.5) {
      y = -1 * y;
    }
    return [x, y];
  }
})();
