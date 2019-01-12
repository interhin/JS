
/*
 Самовызывайка чтобы сразу вернуть конструтор Person(который уже будет в замыкании хранить переменную instance))
*/
var Person = (function() {
  var instance; /* Объект который будет всегда подставляться при повторном создании экземпляра
  (вместо создания нового обьекта) с помощью конструктора ниже. */
  
  return function Person(){
    if (!instance)
      instance = this; // Если мы первый раз вызываем конструктор, то сохраняем его в instance
    else
      return instance; // И при каждом новом вызове конструктора будет не создаваться новый объект,
                       // а возвращаться объект созданный при первом вызове конструтора
  }
})();

var p1 = new Person(); // Этот объект запишется в instance и будет "единым" для всех экземпляров
var p2 = new Person(); 

console.log(p1==p2); // true



// Без Singleton'a соответственно код ниже не выдал бы true
// т.к. будут создаваться новые обьекты и они не будут равны 

function Person() {
  
}

var p1 = new Person();
var p2 = new Person(); 

console.log(p1==p2); // false

