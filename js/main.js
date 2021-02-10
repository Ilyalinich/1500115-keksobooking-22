'use strict'

const REALTY_NAMES = [
  'Царские палаты',
  'Райское местечко',
  'Англетер',
  'Royal Resort & Spa',
];

const REALTY_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = {
  wifi: 'бесплатный wi-fi',
  dishwasher: 'посудомоечная машина',
  parking: 'собственная парковка',
  washer: 'стиральная машина',
  elevator: 'лифт',
  conditioner: 'кондиционер',
};

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const ADVERTISEMENT_COUNT = 10;

const UsersCount = {
  MIN: 1,
  MAX: 8,
};

const LocationCounts = {
  X_MIN: 35.65000,
  X_MAX: 35.70000,
  Y_MIN: 139.70000,
  Y_MAX: 139.80000,
  DIGITS: 5,
};

const PriceCount = {
  MIN: 0,
  MAX: 100000,
};

const RoomsCount = {
  MIN: 1,
  MAX: 10,
};

const GuestsCount = {
  MIN: 1,
  MAX: 10,
}


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

const getDescriptionResult = (featuresResult) => {
  if (featuresResult.length === 0) {
    return ', но нам нечем вас удивить.'
  }

  const descriptionResults = featuresResult.map((feature) => FEATURES[feature]);

  return `. У нас есть: ${descriptionResults.join(', ')}.`
};

const generateAd = () => {

  const location = {
    x: getRandomFloat(LocationCounts.X_MIN, LocationCounts.X_MAX, LocationCounts.DIGITS),
    y: getRandomFloat(LocationCounts.Y_MIN, LocationCounts.Y_MAX, LocationCounts.DIGITS),
  };

  const typeResult = getRandomElement(REALTY_TYPES);

  const featuresResult = getRandomLengthArray(Object.keys(FEATURES));

  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(UsersCount.MIN, UsersCount.MAX)}.png`,
    },

    offer: {
      title: `${typeResult} ${getRandomElement(REALTY_NAMES)}`,
      address: Object.values(location).join(', '),
      price: getRandomInteger(PriceCount.MIN, PriceCount.MAX),
      type: typeResult,
      rooms: getRandomInteger(RoomsCount.MIN, RoomsCount.MAX),
      guests: getRandomInteger(GuestsCount.MIN, GuestsCount.MAX),
      checkin: getRandomElement(CHECK_TIMES),
      checkout: getRandomElement(CHECK_TIMES),
      features: featuresResult,
      description: `Прекрасное место для отдыха${getDescriptionResult(featuresResult)}`,
      photos: getRandomLengthArray(PHOTOS),
    },

    location,
  };
};

const totalArray = new Array(ADVERTISEMENT_COUNT)
  .fill(null)
  .map(generateAd);


/* eslint-disable*/
console.log(totalArray)
