import * as constant from './constant.js';

import {getRandomInteger, getRandomFloat, getRandomElement, getRandomLengthArray} from './util.js';

const getDescriptionResult = (featuresResult) => {
  if (featuresResult.length === 0) {
    return ', но нам нечем вас удивить.'
  }

  const descriptionResults = featuresResult.map((feature) => constant.FEATURES[feature]);

  return `. У нас есть: ${descriptionResults.join(', ')}.`
};

const generateAd = () => {

  const location = {
    x: getRandomFloat(constant.LocationCounts.X_MIN, constant.LocationCounts.X_MAX, constant.LocationCounts.DIGITS),
    y: getRandomFloat(constant.LocationCounts.Y_MIN, constant.LocationCounts.Y_MAX, constant.LocationCounts.DIGITS),
  };

  const typeResult = getRandomElement(constant.REALTY_TYPES);

  const featuresResult = getRandomLengthArray(Object.keys(constant.FEATURES));

  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(constant.UsersCount.MIN, constant.UsersCount.MAX)}.png`,
    },

    offer: {
      title: `${typeResult} ${getRandomElement(constant.REALTY_NAMES)}`,
      address: Object.values(location).join(', '),
      price: getRandomInteger(constant.PriceCount.MIN, constant.PriceCount.MAX),
      type: typeResult,
      rooms: getRandomInteger(constant.RoomsCount.MIN, constant.RoomsCount.MAX),
      guests: getRandomInteger(constant.GuestsCount.MIN, constant.GuestsCount.MAX),
      checkin: getRandomElement(constant.CHECK_TIMES),
      checkout: getRandomElement(constant.CHECK_TIMES),
      features: featuresResult,
      description: `Прекрасное место для отдыха${getDescriptionResult(featuresResult)}`,
      photos: getRandomLengthArray(constant.PHOTOS),
    },

    location,
  };
};

const totalArray = new Array(constant.ADVERTISEMENT_COUNT)
  .fill(null)
  .map(generateAd);

export {totalArray};
