

/* 
Декоратор – приём программирования, который позволяет взять существующую функцию и изменить/расширить ее поведение.
Декоратор получает функцию и возвращает обертку, которая делает что-то своё «вокруг» вызова основной функции.
*/

//Декоратор проверки типов

// вспомогательная функция для проверки на число
function checkNumber(value) {
  return typeof value == 'number';
}

// декоратор, проверяющий типы для f
// второй аргумент checks - массив с функциями для проверки
function typeCheck(f, checks) {
  return function() {
    for (var i = 0; i < arguments.length; i++) {
      if (!checks[i](arguments[i])) {
        alert( "Некорректный тип аргумента номер " + i );
        return;
      }
    }
    return f.apply(this, arguments);
  }
}

function sum(a, b) {
  return a + b;
}

// обернём декоратор для проверки
sum = typeCheck(sum, [checkNumber, checkNumber]); // оба аргумента - числа

// пользуемся функцией как обычно
alert( sum(1, 2) ); // 3, все хорошо

// а вот так - будет ошибка
sum(true, null); // некорректный аргумент номер 0
sum(1, ["array", "in", "sum?!?"]); // некорректный аргумент номер 1


/*

//Еще примеры декораторов:

// Декоратор который логирует значения аргументов (добавляет их в массив log)

function work(a) {
  // work - произвольная функция, один аргумент
}

function makeLogging(f, log) {

  function wrapper(a) {
      log.push(a);
      return f.call(this, a);
    }

  return wrapper;
}

var log = [];
work = makeLogging(work, log);

work(1); // 1
work(5); // 5

for (var i = 0; i < log.length; i++) {
  alert( 'Лог:' + log[i] ); // "Лог:1", затем "Лог:5"
} */

/*

// Декоратор который кэширует значения

// При первом вызове обертки с определенным значением аргумента – она вызывает f и запоминает её результат.
// При втором и последующих вызовах с тем же значением аргумента – возвращается сохраненное значение результата.

function f(x) {
  return Math.random()*x;
}

function makeCaching(f) {
  var cache = {};

  return function(x) {
    if (!(x in cache)) {
      cache[x] = f.call(this, x);
    }
    return cache[x];
  };

}

f = makeCaching(f);

var a = f(1);
var b = f(1);
alert( a == b ); // true (значение закешировано)

b = f(2);
alert( a == b ); // false, другой аргумент => другое значение

*/

