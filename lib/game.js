(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function(xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;

    this.movingObjects = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship ({pos: this.randomPosition() });
    this.movingObjects.push(this.ship);
    // var mo1 = new Asteroids.MovingObject({ pos: [0, 0], vel: [1.5, 1.8], radius: 10, color: "#00FF00" });
    // this.movingObjects.push(mo1);
  };

  Game.NUM_ASTEROIDS = 35;

  Game.prototype.remove = function(movingObject) {

  }

  Game.prototype.checkCollisions = function() {
    var garbage = [];
    for(var i = 0; i < this.movingObjects.length - 1; i++) {
      for(var j = i + 1; j < this.movingObjects.length; j++) {
        obj1 = this.movingObjects[i];
        obj2 = this.movingObjects[j];
        obj1_x = obj1.pos[0];
        obj1_y = obj1.pos[1];

        obj2_x = obj2.pos[0];
        obj2_y = obj2.pos[1];

        distance = Math.sqrt(Math.pow(obj2_x - obj1_x, 2) + Math.pow(obj2_y - obj1_y, 2));
        if (distance < (obj1.radius + obj2.radius)) {
          if (obj1 instanceof Asteroids.Ship) {
            obj1.relocate(this);
            garbage.push(j);
          } else if (obj2 instanceof Asteroids.Ship) {
            obj2.relocate(this)
            garbage.push(i);
          } else {
            garbage.push(i);
            garbage.push(j);
          }
        }
      }
    }
    var that = this
    garbage.forEach(function(element) {
      that.movingObjects[element] = null
    })
    newMovingObjects = []
    this.movingObjects.forEach(function(element) {
      if (element !== null) {
        newMovingObjects.push(element);
      }
    })
    this.movingObjects = newMovingObjects;
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
    this.movingObjects.forEach(function(movingObject) {
      movingObject.pos = that.wrap(movingObject.pos);
      movingObject.draw(ctx);
    });
  };

  Game.prototype.addAsteroids = function() {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var pos = this.randomPosition()
      var asteroid = new Asteroids.Asteroid({ pos: pos });
      this.movingObjects.push(asteroid);
    }
  }

  Game.prototype.randomPosition = function() {
    var x = Math.random() * this.xDim;
    var y = Math.random() * this.yDim;
    return [x, y];
  }

  Game.prototype.moveObjects = function() {
    this.movingObjects.forEach(function(movingObject) {
      movingObject.move();
    });
  };

  Game.prototype.start = function(canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.bindKeyHandlers()
    var animateCallback = function() {
      this.moveObjects();
      this.checkCollisions();
      this.draw(ctx);
      requestAnimationFrame(animateCallback);
    }.bind(this);
    animateCallback();
  }

  Game.prototype.bindKeyHandlers = function() {
    var ship = this.ship
    key('left', function() { ship.power([-1, 0])});
    key('right', function() { ship.power([1, 0])});
    key('up', function() { ship.power([0, -1])});
    key('down', function() { ship.power([0, 1])});
  }

})();
