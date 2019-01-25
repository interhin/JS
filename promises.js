var add = function(a,b) {
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      var summ = a+b;
      !isNaN(summ) ? resolve(summ) : reject("Incorrect numbers!");
    },1000);
  });
}

function summCalced(summ) {
  console.log(summ);
  return summ; // summ передается в качестве аргументов следующей функции
}

function multiplyTwo(digit) { // В данном случае digit == summ
  var result = digit * 2;
  console.log(result);
}

add(1,2)
  .then(summCalced)
  .then(multiplyTwo)
  .catch(message => console.log(message));
  
  
//////////////////////////////////////////////////////////////////////////////////////////////



// P.S.
  function summCalced(summ) {
  console.log(summ);
  return summ; // summ передается в качестве аргументов следующей функции
  /*
  // Запись выше аналогична такой:
     return new Promise(function(resolve,reject){
        resolve(summ); // грубо говоря resolve в данном случае == функции multiply(summ);
     });
     
  // Или такой
    return Promise.resolve(summ);
  */
}





// Использование промисов на практике и пример функций Promise.all и Promise.race - https://www.youtube.com/watch?v=raGcH-nhTa4
