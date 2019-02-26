
// Проверка на палиндром
function isPal(s,i=0) {
    const len = s.length-1;
    if (i===Math.floor(s.length/2))
        return "YES";

    if (s[i]===s[len-i])
        return isPal(s,++i);
    
    return "NO";
}

//console.log(isPal("radar"));

// Вывод n-го числа фибоначи
function fib(n) {
    if (n < 4)
        return 1;
    
    return fib(n-2) + fib(n-1);
}

//console.log(fib(8)); // 0 1 1 2 3 5 8 13
                       // 1 2 3 4 5 6 7 8


// Факториал числа
function factorial(n) {
    if (n==1)
        return 1;
    return n*factorial(n-1);
}

//console.log(factorial(5));

// Сумма арифметической последовательности до n
function summ(n) {
    if (n==1)
        return 1;
    return n+summ(n-1);
}

//console.log(summ(100));

// Reverse строки за N/2 операций
function reverseString(s,i=0) {
    const len = s.length-1;
    const sArr = s.split("");
    if (i===Math.floor(s.length/2))
        return s;

    [sArr[len-i],sArr[i]] = [sArr[i],sArr[len-i]];
    let newS = sArr.join("");
    return reverseString(newS,++i);
}

//console.log(reverseString(s1));

// Максимальный разряд числа
function max(s,maxNum=-Infinity,i=0) {
    if (i>s.length-1)
        return maxNum;

    if (+s[i] > maxNum)
        return max(s,+s[i],++i);
    
    return max(s,maxNum,++i);   
}

//console.log(max("11414765"));

// Среднее значение последовательности
function avg(s,summ=0,i=0) {
    if (i>s.length-1)
        return summ/s.length;

    summ+= +s[i++];
    return (avg(s,summ,i));
}

//console.log(avg("1234"));

// Масимальное число введенное с клавиатуры
function max() {
  let n = +prompt();
  if (n == 0) {
        return 0;
  }
  let n2 = max();
  
}

//console.log(max());

// Среднее значение последовательности
function avg(summ=0,count=0) {
  let n = +prompt();
  if (n==0) {
    return summ/count;
  }
  return avg(summ+n,++count);
}

//console.log(avg());
