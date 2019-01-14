

// Цикл по свойствам объекта (также выведет свойства родителей по __proto__)
for (var prop in obj)
  console.log(prop);
  
  
 // ---------------------------------------------------------------------------------------------------
 
 
  
// Возвращает массив со всеми свойствами объекта (не включает свойства родителей)
Object.keys(obj); // Если какое-то свойство было enumerable = false, то не выведет его
Object.getOwnPropertyNames(obj); // Выводит свойства даже которые enumerable = false 


 // ---------------------------------------------------------------------------------------------------
 
 

// Возвращает true/false если у объекта есть свойство "ob2" (не учитывает свойства родителей)
obj.hasOwnProperty("ob2");


 // ---------------------------------------------------------------------------------------------------

// Сортировка объекта по свойствам
items.sort(function (a, b) {
	  if (a.name > b.name) {
		return 1;
	  }
	  if (a.name < b.name) {
		return -1;
	  }
	  // a должно быть равным b
	  return 0;
	});
  
  
 // ---------------------------------------------------------------------------------------------------
  
	
  
// Дескрипторы объекта (Дескриптор данных)
Object.defineProperty(user, "name", {
  value: "Вася",
  enumerable: false, // свойство не будет выводиться циклом for(var prop in user){}
  writable: false, // запретить присвоение "user.name="
  configurable: false // запретить удаление "delete user.name" и также запретить менять настройки дескриптора
});


 // ---------------------------------------------------------------------------------------------------


// Примеры дескриптора с аксессорами get/set (Дескрипторы доступа)
var obj = {
  _name : "",
  
  get name() {
    return this._name;
  },
    
  set name(value) {
    this._name = value;
  }
}


 // ---------------------------------------------------------------------------------------------------


// Дескрипторы в прототипном стиле
// Есть пример в файле CoffeeMachine_Reworked_To_Prototype_GET_SET.js
// Дескрипторы пишем именно в прототип, а сами поля в конструктор (_waterAmount в конструкторе).
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


// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



// Возвращает целое число (строка должна начинаться с числа, число может быть и вида "0x412")
parseInt(s);
// Возвращает вещественное число (число должно быть через точку(".") )
parseFloat(s);




// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




// Приведение целых чисел к вещественному
num.toFixed(2); // 3 to 3.00 (2 знака после запятой)

num.toPresicion(4); // 123.312 to 123.3 (4 разряда)



// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



// Бибилотека Math

Math.pow(5,2); // 5 в степени 2 (или можно так: 5**2)

Math.sqrt(25); // кв. корень 25

Math.floor(234.76); // Округление вниз (результат: 234)

Math.ceil(234.42); // Округление вверх (результат: 235)

Math.round(234.42); // Обычное округление (результат: 234)

Math.PI // Число PI

Math.max(10,20); // Максимальное (20), можно применить к массиву: Math.max.apply(null,arr)

Math.min(10,20); // Тоже самое только min





// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




// Методы строк (не изменяют исходную строку, а лишь возвращают новую)

s.indexOf('a'); // Вернет номер символа 'a' в строке (если не найдет то вернет -1)

s.substring(5); // Вернет новую строку (от 5 до s.length-1)

s.substring(2,5); // Вернет строку (от 2 до 5-1) (т.е. 2,3,4)

s.substr(5,2); // Начиная с 5го символа (включая его) берем 2 символа (считая 5й, т.е. 5,6)

s.split(' '); // Разделяет строку по пробелам и возвращает массив

s.replace("123",""); // Заменяет "123" на пустоту и возвращает полученную строку

s.toLowerCase(); // Возвращает строку в нижнем регистре

s.toUpperCase(); // Возвращает строку в вверхнем регистре




// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



// Методы массивов

arr.slice(2,5); // Возвращает новый массив (от 2 до 5-1) (т.е. 2,3,4)

arr.join(','); // Возвратит строку которая будет содержать все элементы разделенные ','

// Ниже методы которые МЕНЯЮТ ИСХОДНЫЙ МАССИВ, а не возвращают новый

arr.splice(1,1); // (начиная с 1-го удалить 1 элемент) (т.е. просто удалится 1-й элемент)

arr.reverse(); // расставляет элементы в противоположном порядке

arr.push(10); // Добавляет элемент в конец массива
arr.unshift(0); // Добавляет элемент в начало массива

arr.pop(); // Удаляет последний элемент массива
arr.shift(); // Удаляет первый элемент массива

 // ---------------------------------------------------------------------------------------------------

// Сортировка массива
numbers.sort(function(a, b) {
	  return a - b; // ( a - b по возрастанию) , (b - a по убыванию)
	});

// Аналогичная но более громоздкая запись	
numbers.sort(function(a, b) {
	  return a > b ? 1 : -1; // по возрастанию
	});
	
	
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||	

	
// Классы в ECMAScript 2015


class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // геттер
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // сеттер
  set fullName(newValue) {
    [this.firstName, this.lastName] = newValue.split(' '); // Тут деструктуризация
  }

  // вычисляемое название метода
  ["test".toUpperCase()]() {
    alert("PASSED!");
  }

};

let user = new User("Вася", "Пупков");
alert( user.fullName ); // Вася Пупков
user.fullName = "Иван Петров";
alert( user.fullName ); // Иван Петров
user.TEST(); // PASSED!



// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||



// Статические свойства (фабричные методы)

class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static createGuest() {
    return new User("Гость", "Сайта");
  }
};

let user = User.createGuest();

alert( user.firstName ); // Гость

alert( User.createGuest ); // createGuest ... (функция)


 // ---------------------------------------------------------------------------------------------------


// Статическая константа

class Menu {
  static get elemClass() {
    return "menu"
  }
}

alert( Menu.elemClass ); // menu




// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


// Наследование и переопределение

class Animal {
  constructor(name) {
    this.name = name;
  }

  walk() {
    alert("I walk: " + this.name);
  }
}

class Rabbit extends Animal {
  walk() { // Переопределние родительского метода
    super.walk(); // Вызов сначала родительского метода
    alert("...and jump!");
  }
}

new Rabbit("Вася").walk();
// I walk: Вася
// and jump!



// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// Изменение конструктора

class Animal {
  constructor(name) {
    this.name = name;
  }

  walk() {
    alert("I walk: " + this.name);
  }
}

class Rabbit extends Animal {
  constructor() {
    // вызвать конструктор Animal с аргументом "Кроль"
    super("Кроль"); // то же, что и Animal.call(this, "Кроль")
  }
}

new Rabbit().walk(); // I walk: Кроль

 // ---------------------------------------------------------------------------------------------------


// Есть такая особенность:

class Rabbit extends Animal {
  constructor() {
    alert(this); // ошибка, this не определён!
    // обязаны вызвать super() до обращения к this
    super();
    // а вот здесь уже можно использовать this
  }
}


// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// Полезные фичи ES-2015


// Цикл for of (также можно пройтись по NodeList)

let arr = [1, 2, 3]; // массив — пример итерируемого объекта

for (let value of arr) {
  alert(value); // 1, затем 2, затем 3
}

 // ---------------------------------------------------------------------------------------------------
 
 // Копирование свойств
 
 let user = { name: "Вася", isAdmin: false };

// clone = пустой объект + все свойства user
let clone = Object.assign({}, user); // Можно через запятую указать еще объекты


 // ---------------------------------------------------------------------------------------------------

// Вычисляемые свойства

let propName = "firstName";

let user = {
  [propName]: "Вася"
};

alert( user.firstName ); // Вася

 // ---------------------------------------------------------------------------------------------------
 
// Геттер и сеттер для прототипа

Object.getPrototypeOf(obj);
Object.setPrototypeOf(obj, newProto);

 // ---------------------------------------------------------------------------------------------------
 
 // super в объектах
 
 let animal = {
  walk() {
    alert("I'm walking");
  }
};

let rabbit = {
  __proto__: animal,
  walk() {
    alert(super.walk); // walk() { … }
    super.walk(); // I'm walking
  }
};

rabbit.walk();


 // ---------------------------------------------------------------------------------------------------



// ||||||||||||||||||||||||||||||||||   Работа с DOM    |||||||||||||||||||||||||||||||||||||




// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




// ||||||||||||||||||||||||||||||||||   Работа с событиями    |||||||||||||||||||||||||||||||||||||





// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


// ||||||||||||||||||||||||||||||||||   AJAX    |||||||||||||||||||||||||||||||||||||





// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


// ||||||||||||||||||||||||||||||||||   Регулярные выражения    |||||||||||||||||||||||||||||||||||||





// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
