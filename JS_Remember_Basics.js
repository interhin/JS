

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


// DOM - модель - это внутреннее представление HTML страницы в виде дерева

// Все элементы страницы, включая теги, текст, комментарии, являются узлами DOM.



document.documentElement // доступ к <html>

document.body // доступ к <body>



// -------------------------------------Поиск элементов-----------------------------------------

// Только к document

document.getElementById("testid"); // Возвращает элемент с id="testid" (работает немного быстрее querySelector)



// К document или любой elem

document.getElementsByTagName("div"); // Вернет коллекцию div'ов

document.getElementsByClassName("cName"); // Вернет коллекцию элементов с классом "cName"

document.querySelector(".class1"); // Вернет элемент с классом "class1" (можно написать любой css selector)

document.querySelectorAll(".sameClass"); // Вернет коллекцию элементов с классом "sameClass" (можно написать любой css selector)

elem.matches("css selector"); // true/false удовлетворяет ли элемент указанному css селектору

elem.closest("css selector"); // Идет вверх по дереву от элемента, ищет соответствующий указанному css селектору и возвращает первый
							  // (ВНИМАНИЕ! Так же проверяет и сам себя)


/* 

getElements... Возвращает "живую" коллекцию (если изменится сам документ то значение обновится и в переменной,
в которую возвратил значение этот метод

с querySelector - наоборот, если документ изменился это никак не повлияет на переменную в которую вернул значение данный метод

*/


// --------------------------Свойства и методы элементов--------------------------



elem.children // Коллекция детей элемента

elem.firstElementChild // Первый ребенок элемента
elem.lastElementChild  // Последний ребенок элемента

elem.previousElementSubling // Предыдущий элемент от elem
elem.nextElementSubling // Следующий элемент после elem

elem.parentElement // Элемент родитель

parentElem.contains(childElem); // true/false содержит ли parentElem элемент childElem

elem.tagName // Название тега элемента (в верхнем регистре например: "DIV")






elem.innerHTML // Задает или возвращает HTML содержимое элемента
// elem.innerHTML+="some" - сначала удалится старое содержимое затем установится новое, если внутри была картинка
// или много текста, то они будут грузиться заного (также спадет выделение мышкой с элемента)
// !!! также если внутри были элементы на которые были ссылки то они станут неверны.

// Хорошая "альтернатива" innerHTML у которой нету таких недостатков:
elem.insertAdjacentHTML(where,html); // ВСТАВЛЯЕТ (не заменяет а именно вставляет) html
									 // поэтому проблем как с innerHTML нету
// where - куда по отношению к элементу вставить html
	// beforeBegin – перед elem.
	// afterBegin – внутрь elem, в самое начало.
	// beforeEnd – внутрь elem, в конец.
	// afterEnd – после elem.

// Такие же Adjacent методы только для вставки элемента и текста
elem.insertAdjacentElement(where, newElem);
elem.insertAdjacentText(where, text);


// Современные методы (через запятую можно указывать несколько)
elem.append(elem1); // Вставляет внутрь в конец
elem.prepend(elem1); // Вставляет внутрь в начало

elem.after(elem1); // Вставляет elem1 после elem
elem.before(elem1); // Вставляет elem1 перед elem

elem.replaceWith(elem1); // Вставляет elem1 вместо elem (заменяет)






elem.outerHTML // Возвращает HTML элемента включая сам элемент (его тег и тд...). Лучше не менять это св-во
			   // т.к. после изменения переменные продолжат указывать на старый элемент (с innerHTML нет такого)
			   
			   

elem.textContent = "some text<div></div>"; // Вставляет текст в elem (даже если мы напишем тег - он вставит его как текст)	   
			   
			   
elem.className = "class1 class2"; // Задает или получает имена классов

elem.remove() // Удалить текущий элемент

elem.classList // Псевдо-массив классов

// Через запятую можно указать несколько
elem.classList.add("className"); // Добавить класс
elem.classList.remove("className"); // Удалить класс

elem.classList.toggle("className"); // Переключатель класса (если есть такой класс то удалит, если нет - добавит)

elem.classList.contains("className"); // true/false содержит ли элемент указанный класс

// ------------------------------------------------------------------------------------------------------------------------------

document.body.style.backgroundColor = "red"; // Изменение цвета (css свойство переводится в camelCase (убирается тире))

div.style.cssText="color: red !important; \
    background-color: yellow; \
    width: 100px; \
    text-align: center; \
    blabla: 5; \
  ";
  
  // При установке style.cssText все предыдущие свойства style удаляются.
  
  
  // Вот так style уже ничего не увидит:
  
  <head>
  <style> body { color: red; margin: 5px } </style> // 
</head>
<body>

  Красный текст
  <script>
    alert(document.body.style.color); //в большинстве браузеров
    alert(document.body.style.marginTop); //  ничего не выведет
  </script>
</body>

  // Итак, свойство style дает доступ только к той информации, которая хранится в elem.style.
  
  // Вот как получить св-ва прописанные в css
  var computedStyle = getComputedStyle(document.body);
    alert( computedStyle.marginTop ); // выведет отступ в пикселях
    alert( computedStyle.color ); // выведет цвет
	
	// Для правильного получения значения нужно указать точное свойство. Например: paddingLeft, marginTop, borderLeftWidth.

	// При обращении к сокращенному: padding, margin, border – правильный результат не гарантируется.

// ------------------------------------------------------------------------------------------------------------------------------

document.createElement("div"); // Создает элемент с тегом "div"	
	
parentElem.appendChild(elem); // Добавляет в конец parentElem элемент elem

parentElem.insertBefore(elem, nextSibling); // Вставляет elem внутрь parentElem перед элементом nextSibling
// Например parentElem.insertBefore(elem, parentElem.firstElementChild); вставит элемент в самое начало

var div2 = div.cloneNode(true); // Возвращает полную копию элемента если true (не лезет рекурсивно внутрь если false)


// Вставка элемента слева от элемента
div.parentNode.insertBefore(div2, div.nextSibling); // parentNode, а не parentElement чтобы он учитывал комментарии и текст
// Вставка элемента справа от элемента 
div.parentNode.insertBefore(div2, div.previousSibling); // Аналогично только previousSibling
	
	
// Удаление элемента в родителе
parentElem.removeChild(elem); // Также возвращает удаленный элемент

// Замена элемента в родителе
parentElem.replaceChild(newElem, elem); // Также возвращает удаленный элемент


// Поменять местами элементы !!!!
document.body.insertBefore(secondElem, firstElem);
	

// ------------------------- Атрибуты -------------------------	


elem.attributes // Возвращает коллекцию атрибутов элемента

elem.hasAttribute("attrName"); // true/false есть ли у элемента атрибут с таким именем

elem.getAttribute("attrName"); // Получает значение атрибута

elem.setAttribute("attrName","value"); // Задает значение атрибуту

elem.removeAttribute("attrName"); // Удаляет атрибут


// Имена атрибутов НЕ регистрозависимы.

// Значение атрибутов - всегда строка, а свойств нет. (имеется ввиду св-ва соответствующие названиям атрибутов)

input.checked = true; // Задает или получает значение checkbox



// ------- Пользовательские атрибуты

elem.dataset.userLocation // Получит значение пользовательского атрибута "data-user-location".
	// В коде название преобразуется в стиле camelCase и получить к нему доступ можно через dataset.


// ---------------Важно------------------

// !! Изменение некоторых свойств обновляет атрибут, но почти всегда связь односторонняя
//    т.е. атрибут изменяет св-во, но св-во не изменяет атрибут.

// Например
input.value = "someNew"; // Мы изменили тут св-во
input.getAttribute("value"); // Но тут оно не изменится, (НО В САМОМ ОКНЕ ПОЛЬЗОВАТЕЛЬ И ФАКТИЧЕСКИ ВСЕ ИЗМЕНИТСЯ)

// Проще говоря input.getAttribute(); ВСЕГДА хранит первоначальное значение атрибута.

// --------------------------------------


			
// ------------------------Таблица----------------------


// У каждого тега table внутри есть обертка <tbody> !!!!!!!!!!!

table.rows // Список строк таблицы

tr.cells // Список ячеек строки "tr"

tr.rowIndex // Номер строки в таблице

td.cellIndex // Номер ячейки в строке

// Пример
table.rows[0].cells[0]



// ---------------------------------------- Метрика ---------------------------------------------



elem.offsetWidth // Полная ширина элемента включая border
elem.offsetHeight // Полная высота элемента включая border

elem.clientLeft // Ширина левого border
elem.clientTop // Ширина верхнего border (грубо говоря высота)

elem.clientWidth // Ширина блока внутри border, включая padding (НЕ ВКЛЮЧАЕТСЯ ШИРИНА ПОЛОСЫ ПРОКРУТКИ)
elem.clientHeight // Высота блока внутри border, включая padding (Также не включается ширина верхней полосы прокрутки)

elem.scrollWidth // Правила как у clientWidth, также добавляется ширина скрытого scroll'ом контента
				 // т.е. будто полная ширина без scroll'a
elem.scrollHeight // Правила как у clientHeight, также добавляется высота скрытого scroll'ом контента
				 // т.е. будто полная высота без scroll'a
				 
				 
// Эти свойства можно изменять (elem.scrollTop += 10)
elem.scrollLeft // Ширина невидимой прокрученной области слева (для горизонтального scroll'a)
elem.scrollTop // Высота невидимой прокрученной области сверху (для вертикального scroll'a)



// -----------------------------

document.documentElement.clientWidth // Ширина видимой области окна
document.documentElement.clientHeight // Высота видимой области окна

document.documentElement.scrollLeft/Top // Размеры прокрученной области (Высота для горизонтального scroll'a)
										// грубо говоря отступ сверху/слева с помощью scroll'a
										// Аналогичные св-ва только для чтения pageYOffset, pageXOffset (можно window.pageYOffset)
										
window.scrollBy(x,y) // Прокручивает страницу относительно текущих координат
					 // window.scrollBy(0,10) прокрутит страницу вниз на 10
					 
window.scrollTo(pageX,pageY) // Прокручивает страницу к указанным координатам относительно документа
							 // window.scrollTo(0,0) кнопка вверх
							 
							 
elem.scrollIntoView(top) // Прокручивает документ к элементу elem (если top == true то элемент будет сверху страницы и наоборот)



// -------------------------------


var elCoords = elem.getBoundingClientRect(); // Координаты относительно окна браузера
	elCoords.top – Y-координата верхней границы элемента,
	elCoords.left – X-координата левой границы,
	elCoords.right – X-координата правой границы,
	elCoords.bottom – Y-координата нижней границы.
	
	
	
// -------- Пример с координатами (ставит el сверху,снизу и тд... от anc) ---------



var anc = document.querySelector(".anc");
var el = document.querySelector(".el");

function positionAt(anchor, position, elem) {
  var elCoords = elem.getBoundingClientRect();
  var anCoords = anchor.getBoundingClientRect();
  
  elem.style.position = "absolute";
  
  switch (position) {
    case "top":
        elem.style.top = anCoords.top-elem.clientHeight+"px";
        elem.style.left = anCoords.left+"px";
      break;
    case "left":
        elem.style.top = anCoords.top+"px";
        elem.style.left = anCoords.left-elem.clientWidth+"px";
      break;
    case "right":
        elem.style.top = anCoords.top+"px";
        elem.style.left = anCoords.right+"px";
      break;
    case "bot":
        elem.style.top = anCoords.bottom+"px";
        elem.style.left = anCoords.left+"px";
      break;
  }
}

positionAt(anc,"bot",el);


// ------------------------- Координаты эл-та относительно док-та а не окна (с учетом scroll'a ---------------------------------

function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}


// ------------------------------------------------------------------------
	
	
	
var elem = document.elementFromPoint(x, y);


window.screenX,window.screenY // Координаты браузера относительно экрана (редко используется)

// -------------------------------


// Высота с учетом scroll'а (эта функция нужна т.к. в хроме и мозиле разные значения для разных св-в)

var scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert( 'Высота с учетом прокрутки: ' + scrollHeight );



// ----------------------------------------------------------------------------------------------


// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||




// ||||||||||||||||||||||||||||||||||   Работа с событиями    |||||||||||||||||||||||||||||||||||||





// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


// ||||||||||||||||||||||||||||||||||   AJAX    |||||||||||||||||||||||||||||||||||||





// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


// ||||||||||||||||||||||||||||||||||   Регулярные выражения    |||||||||||||||||||||||||||||||||||||





// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
