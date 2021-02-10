import * as constants from './constants.js';

import {getRandomInteger, getRandomFloat, getRandomElement, getRandomLengthArray} from './utils.js';

const getDescriptionResult = (featuresResult) => {
  if (featuresResult.length === 0) {
    return ', но нам нечем вас удивить.'
  }

  const descriptionResults = featuresResult.map((feature) => constants.FEATURES[feature]);

  return `. У нас есть: ${descriptionResults.join(', ')}.`
};

const generateAd = () => {

  const location = {
    x: getRandomFloat(constants.LocationCounts.X_MIN, constants.LocationCounts.X_MAX, constants.LocationCounts.DIGITS),
    y: getRandomFloat(constants.LocationCounts.Y_MIN, constants.LocationCounts.Y_MAX, constants.LocationCounts.DIGITS),
  };

  const typeResult = getRandomElement(constants.REALTY_TYPES);

  const featuresResult = getRandomLengthArray(Object.keys(constants.FEATURES));

  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(constants.UsersCount.MIN, constants.UsersCount.MAX)}.png`,
    },

    offer: {
      title: `${typeResult} ${getRandomElement(constants.REALTY_NAMES)}`,
      address: Object.values(location).join(', '),
      price: getRandomInteger(constants.PriceCount.MIN, constants.PriceCount.MAX),
      type: typeResult,
      rooms: getRandomInteger(constants.RoomsCount.MIN, constants.RoomsCount.MAX),
      guests: getRandomInteger(constants.GuestsCount.MIN, constants.GuestsCount.MAX),
      checkin: getRandomElement(constants.CHECK_TIMES),
      checkout: getRandomElement(constants.CHECK_TIMES),
      features: featuresResult,
      description: `Прекрасное место для отдыха${getDescriptionResult(featuresResult)}`,
      photos: getRandomLengthArray(constants.PHOTOS),
    },

    location,
  };
};

const totalArray = new Array(constants.ADVERTISEMENT_COUNT)
  .fill(null)
  .map(generateAd);

export {totalArray};
