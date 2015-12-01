function sum() {
  var nums = Array.prototype.slice.call(arguments)
  var totalSum = 0;
  nums.forEach(function(num) {
    totalSum += num;
  })
  return totalSum;
};
// console.log(sum(1, 2, 3, 4))
// sum(1, 2, 3, 4, 5) == 15

Function.prototype.myBind = function (context) {
  var fn = this;
  var outsideArgs = Array.prototype.slice.call(arguments, 1)
  return function() {
    var insideArgs = Array.prototype.slice.call(arguments)
    return fn.apply(context, outsideArgs.concat(insideArgs));
  }
};

// function Cat(name) {
//   this.name = name;
// };
//
// Cat.prototype.says = function (sound) {
//   console.log(this.name + " says " + sound + "!");
// }
//
// var that = this
// console.log(sum.myBind(that, 3,4)(1,2));
// markov = new Cat("Markov");
// breakfast = new Cat("Breakfast");
//
// markov.says("meow");
// // Markov says meow!
//
// markov.says.myBind(breakfast, "meow")();
// // Breakfast says meow!
//
// markov.says.myBind(breakfast)("meow");
// // Breakfast says meow!
//
// var notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow");

function curriedSum(numArgs) {
  var numbers = [];
  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      var totalSum = 0;
      numbers.forEach(function(int) {totalSum += int});
      return totalSum;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

// var sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56
Function.prototype.curry = function (numArgs) {
  var args = [];
  var fn = this;
  function _curriedFunc(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return fn.apply(null, args);
    } else {
      return _curriedFunc;
    }
  }
  return _curriedFunc;
}

console.log(sum.curry(2)(4)(5))
