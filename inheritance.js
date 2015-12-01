Function.prototype.inherits = function(superClass) {
  var fn = this;
  function Surrogate () {};
  Surrogate.prototype = superClass.prototype;
  fn.prototype = new Surrogate();
  fn.prototype.constructor = fn;
}

function Animal(name) {};

Animal.prototype.setName = function(name) {
  this.name = name;
}

Animal.prototype.sayHello = function() {
  console.log("Hello, my name is " + this.name);
}

function Cat() {};

// Moonshine = new Cat();
//
// console.log(Moonshine.sayHello());

Cat.inherits(Animal);

Marbles = new Cat();
Marbles.setName("Marbles");
Marbles.sayHello();
