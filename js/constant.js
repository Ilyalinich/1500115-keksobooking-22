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

export {REALTY_NAMES, REALTY_TYPES, CHECK_TIMES, FEATURES, PHOTOS, ADVERTISEMENT_COUNT, UsersCount, LocationCounts,
  PriceCount, RoomsCount, GuestsCount};
