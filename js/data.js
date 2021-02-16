import {REALTY_NAMES, REALTY_TYPES, CHECK_TIMES, FEATURES, PHOTOS, ADVERTISEMENT_COUNT, UsersCount, LocationCounts,
  PriceCount, RoomsCount, GuestsCount} from './constant.js';

import {getRandomInteger, getRandomFloat, getRandomElement, getRandomLengthArray} from './util.js';

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

const generateAds = () => new Array(ADVERTISEMENT_COUNT)
  .fill(null)
  .map(generateAd);

export {generateAds};
