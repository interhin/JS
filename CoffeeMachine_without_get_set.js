function CoffeeMachine(power) {
  this.waterAmount = 0;
  
  var WATER_HEAT_CAPACITY = 4200;
  
  var getBoilTime = (function() {
    return this.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }).bind(this); // Биндим эту функцию к текущему объекту 
                 // (если не забиндить, то при вызове этой функции как ниже getBoilTime() - this будет указывать на Window)
  
  /* 
    //Или можно сохранить this в замыкании вот так:
  
    var that = this; // в переменной that сохранится ссылка на текущий объект при создании конструктором
    
    function getBoilTime() {
      return that.waterAmount * WATER_HEAT_CAPACITY * 80 / power; // И тут that будет винда через замыкание
                                                                  // и не будет указывать на Window
    }
  */
  
  function onReady() {
    console.log("Кофе готов!");
  }
  
  this.run = function() {
    setTimeout(onReady,getBoilTime()); // Если бы мы не забиндили выше, то здесь бы результатом getBoilTime() был undefined
                                       // т.к. this внутри функции указывал бы на window а у него нету свойства waterAmount
                                       // или можно вызвать эту функцию через call или apply, getBoilTime.call(this)
  }
}

var coffeeMachine = new CoffeeMachine(10000);

coffeeMachine.run();
