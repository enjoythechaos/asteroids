(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function(xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;

    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.ship = new Asteroids.Ship ({pos: this.randomPosition() });
    //this.movingObjects.push(this.ship);
    // var mo1 = new Asteroids.MovingObject({ pos: [0, 0], vel: [1.5, 1.8], radius: 10, color: "#00FF00" });
    // this.movingObjects.push(mo1);
  };

  Game.NUM_ASTEROIDS = 35;

  Game.prototype.remove = function(movingObject) {

  }

  Game.prototype.checkCollisions = function() {
    var garbageAsteroids = [];
    var garbageBullets = [];
    for(var i = 0; i < this.asteroids.length; i++) {
      var asteroid = this.asteroids[i];
      for(var j = 0; j < this.bullets.length; j++) {

        var bullet = this.bullets[j];

        var asteroidX = asteroid.pos[0];
        var asteroidY = asteroid.pos[1];

        var bulletX = bullet.pos[0];
        var bulletY = bullet.pos[1];

        var distance = Math.sqrt(Math.pow(asteroidX - bulletX, 2) + Math.pow(asteroidY - bulletY, 2));

        if (distance < (asteroid.radius + bullet.radius)) {
          garbageAsteroids.push(i);
          garbageBullets.push(j);
        }
      }
      var shipDistance = (Math.sqrt(Math.pow(this.ship.pos[0] - asteroidX, 2) + Math.pow(this.ship.pos[1] - asteroidY, 2)));
      if (shipDistance < (this.ship.radius + asteroid.radius)) {
        this.ship.relocate(this);
      }
    }
    var that = this;
    garbageAsteroids.forEach(function(indexInAsteroids){
      that.asteroids[indexInAsteroids] = null;
    });

    garbageBullets.forEach(function(indexInBullets) {
      that.bullets[indexInBullets] = null;
    });

    var newAsteroids = [];
    that.asteroids.forEach(function(asteroid){
      if (asteroid !== null) {
        newAsteroids.push(asteroid);
      } else {
        newAsteroids.push(new Asteroids.Asteroid({ pos: that.randomPosition() }))
      }
    });
    that.asteroids = newAsteroids;

    var newBullets = [];
    that.bullets.forEach(function(bullet){
      if (bullet !== null) {
        newBullets.push(bullet)
      }
    });
    that.bullets = newBullets;
  }

  Game.prototype.wrap = function(pos) {
    var x = pos[0];
    var y = pos[1];

    if (x < 0) {
      x = this.xDim;
    } else if (x > this.xDim) {
        x = 0;
    }

    if (y < 0) {
      y = this.yDim;
    } else if (y > this.yDim) {
      y = 0;
    }

    return [x, y];
  }

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    that = this;
    this.asteroids.forEach(function(asteroid){
      asteroid.pos = that.wrap(asteroid.pos);
      asteroid.draw(ctx);
    });
    this.bullets.forEach(function(bullet){
      bullet.draw(ctx);
    });
    this.ship.draw(ctx);
  };

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var pos = this.randomPosition()
      var asteroid = new Asteroids.Asteroid({ pos: pos });
      this.asteroids.push(asteroid);
    }
  }

  Game.prototype.randomPosition = function() {
    var x = Math.random() * this.xDim;
    var y = Math.random() * this.yDim;
    return [x, y];
  }

  Game.prototype.moveObjects = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
    this.bullets.forEach(function(bullet){
      bullet.move();
    });
    this.ship.move();
  };

  Game.prototype.start = function(canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.bindKeyHandlers();
    var animateCallback = function() {
      this.moveObjects();
      this.checkCollisions();
      this.draw(ctx);
      requestAnimationFrame(animateCallback);
    }.bind(this);
    animateCallback();
  }

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    var ship = this.ship;
    key('left', function() { ship.power([-1, 0])});
    key('right', function() { ship.power([1, 0])});
    key('up', function() { ship.power([0, -1])});
    key('down', function() { ship.power([0, 1])});
    key('a', function() { ship.fire(that) });
  }

})();
