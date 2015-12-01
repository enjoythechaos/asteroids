(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(params) {
    Asteroids.MovingObject.call(this, {pos: params.pos, vel: Asteroids.Util.randomVec(Asteroid.VELOCITY), radius: Asteroid.RADIUS, color: Asteroid.COLOR});
  }

  Asteroid.COLOR = "#00FF00";
  Asteroid.RADIUS = 20;
  Asteroid.VELOCITY = 1;

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

})();
