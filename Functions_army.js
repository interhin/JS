

function makeArmy() {

  var shooters = [];

  for (var i = 0; i < 10; i++) {
    var shooter = function() { // функция-стрелок
      alert( i ); // выводит свой номер
    };
    shooters.push(shooter);
  }

  return shooters;
}

var army = makeArmy();

army[0](); // стрелок выводит 10, а должен 0
army[5](); // стрелок выводит 10...
// .. все стрелки выводят 10 вместо 0,1,2...9


// Все стрелки выводят 10 потому-что alert(i) ссылается на глобальную i, а она после конца цикла будет равна 10

// Чтобы это исправить можно сохранить i в замыкании

function makeArmy() {
  var shooters = [];

  for (var i = 0; i < 10; i++) {
    (function(x) {
      var shooter = function() {
        console.log(x);
      };
      shooters.push(shooter);
    })(i);
  }

  return shooters;
}

// Или так

function makeArmy() {
  var shooters = [];

  for (var i = 0; i < 10; i++) {
    var shooter = (function(x) {
      return function() {
        console.log(x);
      };
    })(i);
    shooters.push(shooter);
  }

  return shooters;
}

// Или так

function makeArmy() {

  var shooters = [];

  for (var i = 0; i < 10; i++) {
    var shooter = function me() {
      console.log(me.x); 
    };
    shooter.x = i;
    shooters.push(shooter);
  }

  return shooters;
}

// Выводить нужно именно не shooter.x а me.x, потому-что shooter когда цикл кончится будет равен последней функции
// Соответственно вывелось бы две 9
