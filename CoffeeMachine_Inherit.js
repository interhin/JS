

function Machine(power) {  // Родительский класс Machine
  
  this._power = power;
  
  this._enabled = false; // Защищенное свойство (protected)

  this.enable = function() { // Публичные методы
    this._enabled = true;
  };

  this.disable = function() {
    this._enabled = false;
  };
}


function CoffeeMachine(power) {
  
  Machine.apply(this,arguments); // Наследуемся от Machine, и передаем все аргументы

  var waterAmount = 0;

  this.setWaterAmount = function(amount) {
    waterAmount = amount;
  };
  
  // Переопределение метода enable для нашей кофе-машины
  var parentEnable = this.enable; // Запоминаем метод enable родителя
  this.enable = function() { // Создаем свой метод enable
      parentEnable.call(this); // Если хотим сохранить оставить реализацию родительского и добавить к ней свои действия
      console.log("Have enabled!");
    }

}

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.enable(); // Здесь мы вызываем уже переопределенный метод который выведет "Have enabled!"
                        // и также он выполнит включение как в родительском методе

/*
  Типы доступа свойств

  var name; - локальное свойство (private)
  
  this.name; - публичное свойство (public)
  
  this._name; - защищенное свойство (protected) 
               (технически ничем не отличается от public,
                но так мы показываем что не хотим чтобы его испольовали как внешнее)
*/
