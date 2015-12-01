(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(params) {
    Asteroids.MovingObject.call(this, {pos: params.pos, vel: Ship.VEL, radius: Ship.RADIUS, color: Ship.COLOR});
  }

  Ship.COLOR = "#0000FF";
  Ship.RADIUS = 20;
  Ship.VEL = [0, 0];

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function(game) {
    this.pos = game.randomPosition();
    this.vel = [0, 0];
  }

  Ship.prototype.power = function(impulse) {
    // impulse is a two-element vector.
    // Right -> [1, 0]
    // Left -> [-1, 0]
    // Up ->
    this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
  }
})();
