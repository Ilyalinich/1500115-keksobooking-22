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
const LOCATION_X_MIN_COUNT = 35.65000;
const LOCATION_X_MAX_COUNT = 35.70000;
const LOCATION_Y_MIN_COUNT = 139.70000;
const LOCATION_Y_MAX_COUNT = 139.80000;



const getRandomIntegerNumber = (min, max) => {
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


const getRandomFloatingPointNumber = (min, max, digitsAfterPoint) => {
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


const getRandomArrayElement = (elements) => {
  return elements[getRandomIntegerNumber(0, elements.length - 1)];
};


const getRandomLengthArray = (elements) => {
  const RandomLengthArray = new Array(getRandomIntegerNumber(0, elements.length)).fill(null).map((element, index) => {
    return elements[index]
  });

  return RandomLengthArray
};

const createAutor = () => {
  return {
    avatar: 'img/avatars/user0' + getRandomIntegerNumber(1, 8) + '.png',
  };
};

const createOffer = () => {
  const typeResult = getRandomArrayElement(REALTY_TYPES);
  const featuresResult = getRandomLengthArray(Object.keys(FEATURES));
  const getDescriptionResult = () => {
    if (featuresResult.length === 0) {
      return ', но нам нечем вас удивить.'
    }

    const descriptionResults = new Array(featuresResult.length).fill(null).map((element, index) => {
      return Object.values(FEATURES)[index]
    });

    return '. У нас есть: ' + descriptionResults.join(', ') + '.'
  };

  return {
    title: typeResult + ' ' + getRandomArrayElement(REALTY_NAMES),
    address: '',
    price: getRandomIntegerNumber(0, 100000),
    type: typeResult,
    rooms: getRandomIntegerNumber(1, 10),
    guests: getRandomIntegerNumber(1, 10),
    checkin: getRandomArrayElement(CHECK_TIMES),
    checkout: getRandomArrayElement(CHECK_TIMES),
    features: featuresResult,
    description: 'Прекрасное место для отдыха' + getDescriptionResult(),
    photos: getRandomLengthArray(PHOTOS),
  };
};

const createLocation = () => {
  return {
    x: getRandomFloatingPointNumber(LOCATION_X_MIN_COUNT, LOCATION_X_MAX_COUNT, 5),
    y: getRandomFloatingPointNumber(LOCATION_Y_MIN_COUNT, LOCATION_Y_MAX_COUNT, 5),
  };
};

const totalArray = new Array(ADVERTISEMENT_COUNT).fill(null).map(() => {

  const element = {
    author: createAutor(),
    offer: createOffer(),
    location: createLocation(),
  };

  element.offer.address = Object.values(element.location).join(', ')

  return element;
});


/* eslint-disable*/
console.log(totalArray)


// const REALTY_NAMES = [
//   'Царские палаты',
//   'Райское местечко',
//   'Англетер',
//   'Royal Resort & Spa',
// ];

// const REALTY_TYPES = [
//   'palace',
//   'flat',
//   'house',
//   'bungalow',
// ];

// const CHECK_TIMES = [
//   '12:00',
//   '13:00',
//   '14:00',
// ];

// const FEATURES = {
//   wifi: 'бесплатный wi-fi',
//   dishwasher: 'посудомоечная машина',
//   parking: 'собственная парковка',
//   washer: 'стиральная машина',
//   elevator: 'лифт',
//   conditioner: 'кондиционер',
// };

// const PHOTOS = [
//   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
// ];

// const ADVERTISEMENT_COUNT = 10;
// const LOCATION_X_MIN_COUNT = 35.65000;
// const LOCATION_X_MAX_COUNT = 35.70000;
// const LOCATION_Y_MIN_COUNT = 139.70000;
// const LOCATION_Y_MAX_COUNT = 139.80000;



// const getRandomIntegerNumber = (min, max) => {
//   if (typeof min !== 'number' || typeof max !== 'number') {
//     throw new Error('В качестве аргументов необходимо использовать числа! Проверьте переданные в функцию аргументы!');
//   }

//   if (min < 0 || max < 0) {
//     throw new Error('Диапазон может быть только положительным! Проверьте переданные в функцию аргументы!');
//   }

//   if (min > max) {
//     throw new Error('Начальное значение диапазона не может быть больше конечного! Проверьте переданные в функцию аргументы!');
//   }

//   if (max === min && !Number.isInteger(max)) {
//     throw new Error('Аргументы равны друг другу и не являются целыми числами. Нет диапазона для поиска случайного ЦЕЛОГО числа!');
//   }

//   min = Math.ceil(min);
//   max = Math.floor(max);

//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };


// const getRandomFloatingPointNumber = (min, max, digitsAfterPoint) => {
//   if (typeof min !== 'number' || typeof max !== 'number') {
//     throw new Error('В качестве аргументов необходимо использовать числа! Проверьте переданные в функцию аргументы!');
//   }

//   if (min < 0 || max < 0) {
//     throw new Error('Диапазон может быть только положительным! Проверьте переданные в функцию аргументы!');
//   }

//   if (min > max) {
//     throw new Error('Начальное значение диапазона не может быть больше конечного! Проверьте переданные в функцию аргументы!');
//   }

//   return parseFloat((Math.random() * (max - min) + min).toFixed(digitsAfterPoint));
// };


// const getRandomArrayElement = (elements) => {
//   return elements[getRandomIntegerNumber(0, elements.length - 1)];
// };


// const getRandomLengthArray = (elements) => {
//   const RandomLengthArray = new Array(getRandomIntegerNumber(0, elements.length)).fill(null).map((element, index) => {
//     return elements[index]
//   });

//   return RandomLengthArray
// };


// const totalArray = new Array(ADVERTISEMENT_COUNT).fill(null).map(() => {

//   const element = {
//     author: '',
//     offer: '',
//     location: '',
//   };

//   element.author = {
//     avatar: 'img/avatars/user0' + getRandomIntegerNumber(1, 8) + '.png',
//   };

//   element.location = {
//     x: getRandomFloatingPointNumber(LOCATION_X_MIN_COUNT, LOCATION_X_MAX_COUNT, 5),
//     y: getRandomFloatingPointNumber(LOCATION_Y_MIN_COUNT, LOCATION_Y_MAX_COUNT, 5),
//   }

//   const typeResult = getRandomArrayElement(REALTY_TYPES);
//   const featuresResult = getRandomLengthArray(Object.keys(FEATURES));
//   const getDescriptionResult = () => {
//     if (featuresResult.length === 0) {
//       return ', но нам нечем вас удивить.'
//     }

//     const descriptionResults = new Array(featuresResult.length).fill(null).map((element, index) => {
//       return Object.values(FEATURES)[index]
//     });

//     return '. У нас есть: ' + descriptionResults.join(', ') + '.'
//   };

//   element.offer = {
//     title: typeResult + ' ' + getRandomArrayElement(REALTY_NAMES),
//     address: Object.values(element.location).join(', '),
//     price: getRandomIntegerNumber(0, 100000),
//     type: typeResult,
//     rooms: getRandomIntegerNumber(1, 10),
//     guests: getRandomIntegerNumber(1, 10),
//     checkin: getRandomArrayElement(CHECK_TIMES),
//     checkout: getRandomArrayElement(CHECK_TIMES),
//     features: featuresResult,
//     description: 'Прекрасное место для отдыха' + getDescriptionResult(),
//     photos: getRandomLengthArray(PHOTOS),
//   };

//   return element;
// });


// /* eslint-disable*/
// console.log(totalArray)


