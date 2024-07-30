const englishVoc = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const englishVowels = ["a", "e", "i", "o", "u"];
const str = "".split("");

const square = [
  ["j", "q", "m"],
  ["w", "x", "p"],
  ["v", "z", "b"],
];

const b = "".split("");
let a = [];
let notA = [];

let cryp1 = [];
let cryp2 = [];
let cryp3 = [];

let crypFinal = [];

//алгоритм который переводит число из десятичной в  двоичную систему счисления
fromDecToBin = (num) => {
  if (num === 0) {
    return 0;
  }
  return (num % 2) + 10 * fromDecToBin(Math.floor(num / 2));
};

//алгоритм который складывает два двоичных числа
function addBinaryArrays(binaryArray1, binaryArray2) {
  let result = [];
  let carry = 0;
  let i = binaryArray1.length - 1;
  let j = binaryArray2.length - 1;

  // Проходим по обоим массивам, пока есть цифры или бит переноса
  while (i >= 0 || j >= 0 || carry > 0) {
    let sum = carry; // Инициализируем сумму значением бита переноса

    // Добавляем значение текущего бита первого числа, если он существует
    if (i >= 0) {
      sum += binaryArray1[i];
      i--;
    }

    // Добавляем значение текущего бита второго числа, если он существует
    if (j >= 0) {
      sum += binaryArray2[j];
      j--;
    }

    // Вычисляем сумму и бит переноса
    result.unshift(sum % 2); // Записываем остаток от деления на 2 в начало результирующего массива
    carry = Math.floor(sum / 2); // Бит переноса - результат целочисленного деления на 2
  }

  return result;
}
//заполнить строку нулями спереди до 5 символов
console.log(fromDecToBin(23).toString().padStart(5, "0"));

//1
let key = "";
let ketLength = key.length;
function fisrt() {
  let reverseKey = key.split("").reverse();
  if (reverseKey.length < 3) {
    reverseKey.push(reverseKey[0]);
  }
  reverseKey = reverseKey.map(
    (letter) => englishVoc[(englishVoc.indexOf(letter) + 1) % 26]
  );
  console.log("reverseKey: ", reverseKey);
  return reverseKey.slice(0, 3);
}
const w1 = fisrt();
let indexOfreverseKey = w1
  .map((letter) => englishVoc.indexOf(letter) + 1)
  .slice(0, 3);

function second() {
  const binaryIndexes = w1.map((letter) =>
    fromDecToBin(englishVoc.indexOf(letter) + 1)
      .toString()
      .padStart(5, "0")
  );
  console.log(binaryIndexes);
  binaryIndexes.forEach((index) => {
    a = a.concat(index.split(""));
  });
  console.log("a:", a.join(""));
}
second();
// console.log(fisrt());
function third() {
  const indexes = w1.map((letter) => englishVoc.indexOf(letter) + 1);
  const w2 = indexes.map((index) => {
    const splitted = index.toString().split("");
    const sum = splitted.reduce((partialSum, a) => partialSum + +a, 0);
    return englishVoc[sum - 1];
  });
  console.log("w2:", w2);
  return w2;
}

const w2 = third();

function step4() {
  const vowelsW1 = w1.filter((letter) => englishVowels.includes(letter)).length;
  const vowelsW2 = w2.filter((letter) => englishVowels.includes(letter)).length;
  const consonantsW1 = w1.filter(
    (letter) => !englishVowels.includes(letter)
  ).length;
  const consonantsW2 = w2.filter(
    (letter) => !englishVowels.includes(letter)
  ).length;
  const letterW1 = square[vowelsW1 % 3][consonantsW1 % 3];
  const letterW2 = square[vowelsW2 % 3][consonantsW2 % 3];
  return [letterW1, letterW2];
}
const letters = step4();
step5();
step6();

function step5() {
  const reverA = a.map((item) => (!(item === "1") ? 1 : 0));
  console.log("reverA:", reverA);
  const arr = "010101010101010".split("").map(Number);
  notA = addBinaryArrays(reverA, arr).reverse().slice(0, 15).reverse();
  console.log("notA:", notA);
}

function step6() {
  cryp1 = notA.map((item, index) => (item === 1 ? str[index] : ""));
  console.log(cryp1);
}

const concatW = w1.concat(w2, letters[0], letters[1]);
function step7() {
  let count = 0;
  console.log("b: ", b);
  console.log("w1: ", w1);
  cryp2 = b.map((item, index) => {
    if (item === "1") {
      count++;

      return concatW[count - 1];
    }
    return "";
  });
  console.log(cryp2);
}
step7();

function step8() {
  cryp3 = cryp1.map((item, index) =>
    cryp1[index] && cryp2[index] ? "*" : cryp1[index] || cryp2[index]
  );
  console.log(cryp3);
}
step8();

function step9() {
  cryp3 = cryp3.map((item) => (!item ? "8" : item));
  console.log(cryp3);
  let count = 0;

  const splittedindexeOfreverseKey = [].concat(
    indexOfreverseKey[0].toString().padStart(2, "0").split(""),
    indexOfreverseKey[1].toString().padStart(2, "0").split(""),
    indexOfreverseKey[2].toString().padStart(2, "0").split("")
  );
  console.log(splittedindexeOfreverseKey);
  cryp3 = cryp3.map((item, index) => {
    if (item === "*") {
      count++;
      return splittedindexeOfreverseKey[(count - 1) % 6];
    }
    return item;
  });
  console.log(cryp3);
}
step9();

const symbols = ["!", "_", "+", "=", "?", "!", "_", "+", "=", "?"];
function step10() {
  crypFinal = cryp3.map((item, index) => {
    if (a[index] === "1") {
      if (isNaN(item)) {
        return item.toUpperCase();
      }
    }
    return item;
  });
  console.log(crypFinal.join(""));
}
step10();
