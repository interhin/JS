

function CoffeeMachine(power, capacity) { // capacity - максимальная вместимость (waterAmount)
  var waterAmount = 0;
  
  this.waterAmount = function(amount) { // "Дескриптор" для свойства waterAmount (и get и set в одном)
    
    if (!arguments.length) // Если параметры не были переданы то возвращаем
      return waterAmount;
    
    // Если переданы то обрабатываем и если нет ошибок меняем значение waterAmount
    if (amount < 0) {
      throw new Error("Значение не может быть меньше 0");
    }
    else if (amount > capacity) {
      throw new Error("Значение превышает максимальное");
    }
    else {
      waterAmount = amount;
    }
  }
  
  var WATER_HEAT_CAPACITY = 4200;
  
  function getBoilTime() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }
  
  function onReady() {
    console.log("Кофе готов!");
  }
  
  this.run = function() {
    setTimeout(onReady,getBoilTime());
  }
}

var coffeeMachine = new CoffeeMachine(10000,500);

coffeeMachine.waterAmount(450);
console.log(coffeeMachine.waterAmount());


