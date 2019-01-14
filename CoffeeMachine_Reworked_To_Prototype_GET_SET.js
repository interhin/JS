

function CoffeeMachine(power, capacity) {
  // capacity - максимальная вместимость (waterAmount)
  this._waterAmount = 0;

  this._power = power;

  this._capacity = capacity;
}

Object.defineProperties(CoffeeMachine.prototype, {
  "waterAmount": {
    get: function() {
      return this._waterAmount;
    },
    set: function(amount) {
      if (amount < 0) {
        throw new Error("Значение не может быть меньше 0");
      } else if (amount > this._capacity) {
        throw new Error("Значение превышает максимальное");
      } else {
        this._waterAmount = amount;
      }
    }
  }
});

CoffeeMachine.prototype.onReady = function() {
    alert("Кофе готов!");
  };

CoffeeMachine.prototype._WATER_HEAT_CAPACITY = 4200; // Константа одна для всех поэтому в прототипе

CoffeeMachine.prototype.getBoilTime = function() {
  return this._waterAmount * this._WATER_HEAT_CAPACITY * 80 / this._power;
};

CoffeeMachine.prototype.run = function() {
  setTimeout(this.onReady, this.getBoilTime());
};

var coffeeMachine = new CoffeeMachine(105445000, 500);
var coffeeMachine2 = new CoffeeMachine(105445000, 500);
coffeeMachine.waterAmount = 450;
coffeeMachine.onReady = function() {
  alert("Переопределенный для первой машины вывод");
}
coffeeMachine.run();
coffeeMachine2.run();
console.log(coffeeMachine);


