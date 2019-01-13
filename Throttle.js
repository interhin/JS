

function throttle(f,ms) {
  var isTrottled = false,savedArgs,savedThis;
  return function me() {
    
    if (isTrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    
    f.apply(this,arguments);
    
    isTrottled = true;
    
    setTimeout(function(){
      isTrottled = false;
      if (savedArgs) {
        me.apply(savedThis,savedArgs);
        savedThis = savedArgs = null;
      }
    },ms);
    
    
  }
}

var f = function(a) {
  console.log(a)
};

// затормозить функцию до одного раза в 1000 мс
var f1000 = throttle(f, 1000);

f1000(1); // выведет 1
f1000(2); // (тормозим, не прошло 1000 мс)
f1000(3); // (тормозим, не прошло 1000 мс)

// когда пройдёт 1000 мс...
// выведет 3, промежуточное значение 2 игнорируется

