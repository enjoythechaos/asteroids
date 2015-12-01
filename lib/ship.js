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
    maxDeltaX = 2;
    maxDeltaY = 2;
    newDeltaX = this.vel[0] + (impulse[0] * 0.4);
    if (newDeltaX > maxDeltaX) {
      newDeltaX = maxDeltaX;
    }
    newDeltaY = this.vel[1] + (impulse[1] * 0.4);
    if (newDeltaY > maxDeltaY) {
      newDeltaY = maxDeltaY;
    }
    this.vel = [newDeltaX, newDeltaY];
  }

  Ship.prototype.fire = function(game) {
    var shipVelocity = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    x = (4 * this.vel[0]) / shipVelocity;
    y = (4 * this.vel[1]) / shipVelocity;
    var bullet = new Asteroids.Bullet({pos: this.pos, vel: [x, y]});
    game.bullets.push(bullet)
  }
})();
