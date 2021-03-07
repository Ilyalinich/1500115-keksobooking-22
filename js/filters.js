import {disableElements} from './util.js'

const PriceLimits = {
  MIN: 10000,
  MAX: 50000,
}

const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;
const typeFilter = filtersForm.querySelector('#housing-type');
const priceFilter = filtersForm.querySelector('#housing-price');
const roomsFilter = filtersForm.querySelector('#housing-rooms');
const guestsFilter = filtersForm.querySelector('#housing-guests');

const featuresFilter = filtersForm.querySelector('#housing-features');
const features = Array.from(featuresFilter.children)
  .filter(element => element.classList.contains('map__checkbox'));
let checkedFeatures = [];
let checkedFeaturesValues = [];

const getCheckedFeaturesValues = () => {
  checkedFeatures = features.filter(element => element.checked === true);
  checkedFeaturesValues = checkedFeatures.map((element) => element.value);
}

const disableFilters = () => {
  filtersForm.classList.add('map__filters--disabled');
  disableElements(filtersFormElements);
}

const resetFilters = () => {
  filtersForm.reset();
  getCheckedFeaturesValues();
};

const setTypeFilterRules = (element) => typeFilter.value === 'any' || element.offer.type === typeFilter.value;
const setPriceFilterRules = (element) =>
  priceFilter.value === 'any' ||
  priceFilter.value === 'low' && element.offer.price < PriceLimits.MIN ||
  priceFilter.value === 'middle' && element.offer.price >= PriceLimits.MIN && element.offer.price < PriceLimits.MAX ||
  priceFilter.value === 'high' && element.offer.price >= PriceLimits.MAX
const setRoomsFilterRules = (element) => roomsFilter.value === 'any' || element.offer.rooms === Number(roomsFilter.value);
const setGuestsFilterRules = (element) => guestsFilter.value === 'any' || element.offer.guests === Number(guestsFilter.value);
const setFeaturesFilterRules = (element) => {
  const includedValues = checkedFeaturesValues.filter(value => element.offer.features.includes(value));
  return checkedFeatures.length === 0 || includedValues.length === checkedFeaturesValues.length
}

const setFiltersRules = (element) => {
  return setTypeFilterRules(element) &&
         setPriceFilterRules(element) &&
         setRoomsFilterRules(element) &&
         setGuestsFilterRules(element) &&
         setFeaturesFilterRules(element)
}

const setFilterChangeHandler = (cb) => {
  filtersForm.addEventListener('change', () => {
    getCheckedFeaturesValues();
    cb();
  })
}

export {disableFilters, resetFilters, setFiltersRules, setFilterChangeHandler}


