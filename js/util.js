
const getRandomInteger = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('В качестве аргументов необходимо использовать числа! Проверьте переданные в функцию аргументы!');
  }

  if (min < 0 || max < 0) {
    throw new Error('Диапазон может быть только положительным! Проверьте переданные в функцию аргументы!');
  }

  if (min > max) {
    throw new Error('Начальное значение диапазона не может быть больше конечного! Проверьте переданные в функцию аргументы!');
  }

  if (max === min && !Number.isInteger(max)) {
    throw new Error('Аргументы равны друг другу и не являются целыми числами. Нет диапазона для поиска случайного ЦЕЛОГО числа!');
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const getRandomFloat = (min, max, digitsAfterPoint) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('В качестве аргументов необходимо использовать числа! Проверьте переданные в функцию аргументы!');
  }

  if (min < 0 || max < 0) {
    throw new Error('Диапазон может быть только положительным! Проверьте переданные в функцию аргументы!');
  }

  if (min > max) {
    throw new Error('Начальное значение диапазона не может быть больше конечного! Проверьте переданные в функцию аргументы!');
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(digitsAfterPoint));
};


const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getShuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomLengthArray = (elements) => {
  return getShuffleArray(elements)
    .slice(0, getRandomInteger(0, elements.length));
};

const getDisableElements = (elements) => {
  for (const element of elements) {
    element.disabled = true;
  }
}

export {getRandomInteger, getRandomFloat, getRandomElement, getRandomLengthArray, getDisableElements};
