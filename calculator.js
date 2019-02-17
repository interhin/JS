"use strict";
function calc(ex) {
  console.log(ex)
  ex = ex.replace("+-", "-");
  ex = ex.replace("-+", "-");
  // Сначала ищем знаки умножения и деления
  if (!ex.includes("/") && !ex.includes("*")) {
    // Если умножение или деление не найдено ищем сложение и вычитание
    if (!ex.includes("+") && !ex.includes("-")) {
      //Если ни одной из операций не найдено значит осталось только число, возвращаем его.
      return ex;
    } else {
      // Если "+" или "-" есть, то проверяем что за минус (отрицательное число или операция)
      if (
        ex.indexOf("-") != -1 && // Проверяем есть ли "-" т.к. условие выше могло сработать на "+"
        typeof ex[ex.indexOf("-") - 1] === "undefined" // Проверяем число ли слева от "-"
      ) {
        // Проверяем есть ли еще знаки типа "+" или "-", если нет значит осталось просто отрицательное число
        if (
          ex.indexOf("-") === 0 && // Если "-" под индексом 0 значит "-" точно не операция 
          findAnySign(ex, 1, ex.length - 1)[0] !== -1 // Проверяем есть ли операции не включая "-" (1 индекс)
        ) {
          // Если другие операции есть то узнаем что за операция и под каким она индексом
          let signInfo = findAnySign(ex, 1, ex.length - 1), // -10-12+3
            signSymbol = signInfo[1], // Тип операции
            signIndex = signInfo[0], // Индекс операции
            xLeftInfo = findNumLeft(ex, signIndex), // Число слева от операции
            xRightInfo = findNumRight(ex, signIndex), // Число справа от операции
            xResult;
          switch (signSymbol) { // Считаем результат
            case "-":
              // Если мы дошли до этого места, то первое число отрицательное
              xResult = parseInt(reverseNum(xLeftInfo[0])) - parseInt(xRightInfo[0]);
              break;
            case "+":
              xResult = parseInt(reverseNum(xLeftInfo[0])) + parseInt(xRightInfo[0]);
              break;
          }
          // Если операция только одна ("<=2" - т.к. включая "-" отрицательного числа)
          if (signsCount(ex) <= 2)
            return xResult; // то просто возвращаем рез-тат
          else return calc("" + xResult + ex.slice(xRightInfo[1])); // Иначе считаем рез-тат, прибавляем остальное выражение и продолжаем рекурсию
          // Не пишем xRightInfo[1]+1 (чтобы не включать последнюю цифру правого числа) т.к. в функции funNumRight после выхода из цикла оно и так на 1 больше
        }
        // Если операций нет значит осталось только отрицательное число, возвращаем его.
        return ex;
      }
      // Если условия выше не сработали то просто считаем выражение
      for (let i = 0; i < ex.length; i++) {
        if (ex[i] === "+" || ex[i] === "-") { // Ищем первый попавшийся "+" или "-"
          let leftInfo = findNumLeft(ex, i), // Получаем информацию о левом числе
            rightInfo = findNumRight(ex, i), // Получаем информацию о правом числе
            leftNum = leftInfo[0], // Само левое число
            rightNum = rightInfo[0], // Само правое число
            // Цикл в функциях findNum... добавляет лишнюю единицу поэтому учитываем это
            // Но если число находится на границе, то не меняем его
            leftPos = leftInfo[1] === 0 ? leftInfo[1] : ++leftInfo[1],
            rightPos = rightInfo[1] === ex.length - 1 ? rightInfo[1] : --rightInfo[1];
          leftNum = reverseNum(leftNum); // В функции findNumLeft используется обратный цикл поэтому переворачиваем число

          // Считаем результаты и продолжаем рекурсию до тех пор пока не остается просто число
          switch (ex[i]) {
            case "+":
              return calc(
                ex.substr(0, leftPos) +
                  (parseInt(leftNum) + parseInt(rightNum)) +
                  ex.substr(rightPos + 1)
              );
              break;
            case "-":
              return calc(
                ex.substr(0, leftPos) +
                  (parseInt(leftNum) - parseInt(rightNum)) +
                  ex.substr(rightPos + 1)
              );
              break;
          }
        }
      }
    }
  }
  // Аналогично для умножения деления
  for (let i = 0; i < ex.length; i++) {
    if (ex[i] === "*" || ex[i] === "/") {
      let leftInfo = findNumLeft(ex, i),
        rightInfo = findNumRight(ex, i),
        leftNum = leftInfo[0],
        rightNum = rightInfo[0],
        leftPos = leftInfo[1] === 0 ? leftInfo[1] : ++leftInfo[1],
        rightPos =
          rightInfo[1] === ex.length - 1 ? rightInfo[1] : --rightInfo[1];
      leftNum = reverseNum(leftNum);
      let leftSide = ex.substr(0, leftPos);
      if (!isNaN(parseInt(leftSide[leftSide.length-1])) && (leftNum<0 && rightNum<0))
        leftSide+="+"; //-10+1+20-3*-1 => -10+1+203 (20,3) должен быть плюс между числами
      switch (ex[i]) {
        case "*":
          return calc(leftSide + parseInt(leftNum) * parseInt(rightNum) + ex.substr(rightPos + 1));
          break;
        case "/":
          return calc(leftSide + parseInt(leftNum) / parseInt(rightNum) +ex.substr(rightPos + 1));
          break;
      }
    }
  }
}

function findNumLeft(s, i) {
  let res = "", // Буфер результата
    pos = 0; // Буфер индекса
  for (let n = i - 1; n >= 0; n--) {
    pos = n;
    if (!isNaN(parseInt(s[n]))) { // Формируем число
      res += s[n];
    } else {
      if (s[n]==="-") {
        res = res + "-";
        pos--;
      }
      break;
    } // Как только встретили не цифру, возвращаем полученное число и позицию
  }
  return [res, pos];
}

function findNumRight(s, i) {
  let res = "",
    pos = 0;
  let begin = s[i+1]==="-" ? i+2 : i+1; // Если следующий символ это "-" то пропускаем его чтобы цикл сразу не break'нулся
  for (let n = begin; n < s.length; n++) {
    pos = n;
    if (!isNaN(parseInt(s[n]))) {
      res += s[n];
    } else break;
  }
  if (s[i+1]==="-") { // Исключение для отрицательных чисел (сработает else в условии выше)
    res="-"+res;
  }
  return [res, pos];
}

function findAnySign(s, from, to) {
  for (let i = from; i <= to; i++) {
    if (s[i] === "*" || s[i] === "+" || s[i] === "-" || s[i] === "/")
      return [i, s[i]];
  }
  return [-1, "not_found"];
}

function reverseNum(s) {
  return s
    .split("")
    .reverse()
    .join("");
}

function findOpenSkobka(s, from, to) {
  let index = 0;
  for (let i = from; i <= to; i++) {
    if (s[i] === "(") index = i;
  }
  return index;
}

function findCloseSkobka(s, from, to) {
  for (let i = from; i <= to; i++) {
    if (s[i] === ")") return i;
  }
}

function signsCount(ex) {
  let count = 0;
  for (let i = 0; i < ex.length; i++) {
    if (ex[i] === "*" || ex[i] === "+" || ex[i] === "-" || ex[i] === "/")
      count++;
  }
  return count;
}

function findFirstOrderExpression(ex) {
  if (!ex.includes("(") && !ex.includes(")")) { // Проверяем есть ли вообще скобки
    // Если скобок нет, то просто считаем выражение
      return calc(ex);
  }
  // Если скобки есть то ищем самое "глубокое выражение"
  let openIndex = findOpenSkobka(ex, 0, ex.length - 1),
    closeIndex = findCloseSkobka(ex, openIndex, ex.length - 1),
    exWithoutSkobki = ex.slice(openIndex + 1, closeIndex);
  let newEx =
    ex.substr(0, openIndex) +
    calc(exWithoutSkobki) + // Считаем выражение внутри скобок
    ex.substr(closeIndex + 1, ex.length + 1);
  return findFirstOrderExpression(newEx); // Рекурсивно считаем все скобки
}

let s2 = "1+2*(3+4/2-(1+2))*2+1"; // 1+2*(3+4/2-(1+2))*2+1, -10+1+(-2*-10)-(1*3)*(-1)

console.log(findFirstOrderExpression(s2));

//console.log(calc("-10+3/3+1*10/5-2/2-42"));// 10*-3+3*1, 10*-3+3*-1, -10+3/3+1*10/5-2/2-42

