
const getRandomIntegerNumber = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number' || min < 0 || max < 0 || min > max) {
    throw new Error('Необходимо указать диапазон из двух не отрицательных чисел! Начальное значение диапазона не может быть больше конечного! Проверьте переданные в функцию аргументы!');
  }

  if (max === min && !Number.isInteger(max)) {
    throw new Error('Аргументы равны друг другу и не являются целыми числами. Нет диапазона для поиска случайного ЦЕЛОГО числа!');
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomIntegerNumber(0, 1);


const getRandomFloatingPointNumber = (min, max, n) => {
  if (typeof min !== 'number' || typeof max !== 'number' || min < 0 || max < 0 || min > max) {
    throw new Error('Необходимо указать диапазон из двух не отрицательных чисел! Начальное значение диапазона не может быть больше конечного! Проверьте переданные в функцию аргументы!');
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(n));
};

getRandomFloatingPointNumber(0, 1);
