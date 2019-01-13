function Animal(name) {
  this.name = name;
  this.speed = 0;
}

Animal.prototype.run = function(speed) {
  this.speed += speed;
  console.log(this.name + " бежи со скоростью " + this.speed);
}

Animal.prototype.stop = function() {
  this.speed = 0;
  console.log(this.name + " остановился");
}


function Rabbit(name) {
  Animal.apply(this,arguments); // Копируем все свойства из родителя и передаем аргументы
}

// Создаем новый пустой объект с помощью Object.create() у которого __proto__ будет указывать на Animal.prototype
Rabbit.prototype = Object.create(Animal.prototype);
// Так как мы создали новый объект, constructor у него будет пустой поэтому меняем его на правильный
Rabbit.prototype.constructor = Rabbit;

// Добавляем свой метод для класса Rabbit
Rabbit.prototype.jump = function() {
  this.speed++;
  console.log(this.name + "прыгает со скоростью" + this.speed);
}

// Можно переопределить метод run() для Rabbit
Rabbit.prototype.run = function() {
  // вызвать метод родителя, передав ему текущие аргументы и контекст
  Animal.prototype.run.apply(this, arguments);
  console.log("Переопределнный метод run для зайца");
  // Можно еще добавить сюда например this.jump(); чтобы он и бегал и прыгал при вызове метода run()
}

var rabbit = new Rabbit("заяц");

console.log(rabbit);
