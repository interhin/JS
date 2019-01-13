

function User() {
  this.sayHi = function() {
    console.log(this.name)
  };
}

User.createAnonymous = function() {
  var user = new User;
  user.name = "Аноним";
  return user;
}

User.createFromData = function(userData) {
  var user = new User;
  user.name = userData.name;
  user.age = userData.age;
  return user;
}

// Использование

var guest = User.createAnonymous();
guest.sayHi(); // Аноним

var knownUser = User.createFromData({
  name: 'Вася',
  age: 25
});
knownUser.sayHi(); // Вася



/*
User.createFromData и User.createAnonymous являются статическими фабричными методами класса(конструктора) User

1) Лучшая читаемость кода. Как конструктора – вместо одной большой функции несколько маленьких,
так и вызывающего кода – явно видно, что именно создаётся.

2) Лучший контроль ошибок, т.к. если в createFromData ничего не передали,
то будет ошибка, а полиморфный конструктор создал бы анонимного посетителя.

3) Удобная расширяемость. Например, нужно добавить создание администратора, без аргументов.
Фабричный метод сделать легко: User.createAdmin = function() { ... }. 
А для полиморфного конструктора вызов без аргумента создаст анонима,
так что нужно добавить параметр – «тип посетителя» и усложнить этим код.

Пример полиморфного конструктора

function User(userData) {
  if (userData) { // если указаны данные -- одна ветка if
    this.name = userData.name;
    this.age = userData.age;
  } else { // если не указаны -- другая
    this.name = 'Аноним';
  }

  this.sayHi = function() {
    alert(this.name)
  };
  // ...
}

Здесь в зависимости от переданных аргументов меняется логика конструктора поэтому его называют "Полиморфным"

*/
