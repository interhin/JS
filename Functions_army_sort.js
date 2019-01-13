

function makeArmy() {

  var shooters = [];

  for (var i = 0; i < 10; i++) {
    var shooter = function me() {
      return me.x;
    };
    shooter.x = i;
    shooters.push(shooter);
  }

  return shooters;
}

var army = makeArmy();

army.sort(function(a,b){
  return b() > a() ? 1 : -1;
});
// Теперь
console.log(army[0]()); // 9 
console.log(army[9]()); // 0

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

var army = makeArmy();

army.sort(function(a,b){
  return b.x > a.x ? 1 : -1;
});
// Теперь
army[0](); // 9 
army[9](); // 0

