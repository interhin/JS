

function debounce(f,ms) {
  var timer = null;
  var savedThis;
  var savedArgs;
  return function() {
    savedThis = this;
    savedArgs = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function(){
      f.apply(savedThis,savedArgs);
      timer = null;
    },ms);
  }
}

function f(x) { 
  console.log(x); 
}

f = debounce(f, 1000);

f(1); // вызов отложен на 1000 мс
f(2); // предыдущий отложенный вызов игнорируется, текущий (2) откладывается на 1000 мс

// через 1 секунду будет выполнен вызов f(1)

setTimeout( function() { f(3) }, 1100); // через 1100 мс отложим вызов еще на 1000 мс
setTimeout( function() { f(4) }, 1200); // игнорируем вызов (3)

// через 2200 мс от начала выполнения будет выполнен вызов f(4)
