/*
  Базовые функции генерации случайного целого числа: Math.floor(Math.random() * (max - min + 1)) + min
   или числа с плавающей точкой: Math.random() * (max - min) + min)
   взяты с сайта https://myrusakov.ru/js-random-numbers.html
*/

/*
  Если считать, что первая функция должна работать только с целыми числами в качестве аргументов (хотя об этом явно не сказано),
  а также, что переданные аргументы не отрицательные, и первый аргумент всегда меньше второго, то функцию можно записать с помощью тернарного оператора:
*/
const getRandomIntegerNumber = (min, max) => (!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max < 0 || max <= min) ? 'Диапазон задан неверно! Проверьте переданные в функцию аргументы!' : (Math.floor(Math.random() * (max - min + 1)) + min);

getRandomIntegerNumber();


const getRandomFloatingPointNumber = (min, max, n) => (min < 0 || max < 0 || max <= min) ? 'Диапазон задан неверно! Проверьте переданные в функцию аргументы!' : parseFloat((Math.random() * (max - min) + min).toFixed(n));

getRandomFloatingPointNumber();


/*
  Если считать, что любая функция должна работать как с целыми, так и дробными числами в качестве аргументов,
   а также, что первый аргумент может быть больше второго, а кроме того они могут быть равны (будучи даже дробными),
   то возникает необходимость выполнить несколко проверок, и в таком случае записать функцию с помощью тернарного
   оператора не получится, функция будет выглядеть следующим образом:
*/


const getRandomIntegerNumberVers2 = (min, max) => {
  if (min < 0 || max < 0) {
    return 'Диапазон может быть только положительным! Проверьте переданные в функцию аргументы!';
  }

  if (max < min) {
    const bufferContainer = min;
    min = max;
    max = bufferContainer;
  }

  if (max === min && !Number.isInteger(max)) {
    return 'Аргументы равны друг другу и не являются целыми числами. Нет диапазона для поиска случайного ЦЕЛОГО числа!';
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomIntegerNumberVers2();


const getRandomFloatingPointNumberVers2 = (min, max, n) => {
  if (min < 0 || max < 0) {
    return 'Диапазон может быть только положительным! Проверьте переданные в функцию аргументы!';
  }

  if (max < min) {
    const bufferContainer = min;
    min = max;
    max = bufferContainer;
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(n));
};

getRandomFloatingPointNumberVers2();
