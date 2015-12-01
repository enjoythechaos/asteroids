(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(params) {
    Asteroids.MovingObject.call(this, {pos: params.pos, vel: params.vel, radius: Bullet.RADIUS, color: Bullet.COLOR});
  }

  Bullet.COLOR = "#FF0000";
  Bullet.RADIUS = 3;

  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject);

})();
