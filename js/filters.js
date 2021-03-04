import {disableElements} from './util.js'

const PriceLimits = {
  MIN: 10000,
  MAX: 50000,
}

const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;
const typeField = filtersForm.querySelector('#housing-type');
const priceField = filtersForm.querySelector('#housing-price');
const roomsField = filtersForm.querySelector('#housing-rooms');
const guestsField = filtersForm.querySelector('#housing-guests');

const featuresContainer = filtersForm.querySelector('#housing-features');
const features = Array.from(featuresContainer.children)
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

const resetFilters = () => filtersForm.reset();

const setfilterRules = (element) => {
  const compareResult = checkedFeaturesValues.filter(value => element.offer.features.includes(value))

  return (typeField.value === 'any' || element.offer.type === typeField.value) &&
         (roomsField.value === 'any' || element.offer.rooms === Number(roomsField.value)) &&
         (guestsField.value === 'any' || element.offer.guests === Number(guestsField.value)) &&
         (priceField.value === 'any' ||  priceField.value === 'low' && element.offer.price < PriceLimits.MIN ||
          priceField.value === 'middle' && element.offer.price >= PriceLimits.MIN && element.offer.price < PriceLimits.MAX ||
          priceField.value === 'high' && element.offer.price >= PriceLimits.MAX) &&
         (checkedFeatures.length === 0 || compareResult.length === checkedFeaturesValues.length)
}

const setFilterChangeHandler = (cb) => {
  filtersForm.addEventListener('change', (evt) => {
    getCheckedFeaturesValues();
    /*eslint-disable*/
    console.log(evt.target.value);
    cb();
  })
}

export {disableFilters, resetFilters, setfilterRules, setFilterChangeHandler}
