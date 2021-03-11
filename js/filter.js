import {disableElements} from './util.js'


const PriceLimit = {
  MIN: 10000,
  MAX: 50000,
}

const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;
const typeFilter = filtersForm.querySelector('#housing-type');
const priceFilter = filtersForm.querySelector('#housing-price');
const roomsFilter = filtersForm.querySelector('#housing-rooms');
const guestsFilter = filtersForm.querySelector('#housing-guests');
const featureCheckboxes = Array.from(filtersForm.querySelectorAll('[name="features"]'))


const disableFilters = () => {
  filtersForm.classList.add('map__filters--disabled');
  disableElements(filtersFormElements);
}

const resetFilters = () => filtersForm.reset();


const checkTypeFilterRules = (type) => typeFilter.value === 'any' || type === typeFilter.value;
const checkPriceFilterRules = (price) =>
  priceFilter.value === 'any' ||
  priceFilter.value === 'low' && price < PriceLimit.MIN ||
  priceFilter.value === 'middle' && price >= PriceLimit.MIN && price < PriceLimit.MAX ||
  priceFilter.value === 'high' && price >= PriceLimit.MAX
const checkRoomsFilterRules = (rooms) => roomsFilter.value === 'any' || rooms === Number(roomsFilter.value);
const checkGuestsFilterRules = (guests) => guestsFilter.value === 'any' || guests === Number(guestsFilter.value);
const checkFeaturesFilterRules = (features) => {
  const checkedValues = featureCheckboxes
    .filter((checkbox) => checkbox.checked === true)
    .map((checkbox) => checkbox.value);
  const includedValues = checkedValues.filter((value) => features.includes(value));
  return checkedValues.length === 0 || includedValues.length === checkedValues.length
}

const checkFiltersRules = ({offer}) => {
  return checkTypeFilterRules(offer.type) &&
         checkPriceFilterRules(offer.price) &&
         checkRoomsFilterRules(offer.rooms) &&
         checkGuestsFilterRules(offer.guests) &&
         checkFeaturesFilterRules(offer.features)
}

const setFilterChangeHandler = (cb) => filtersForm.addEventListener('change', () => cb())

const filterAds = (ads) => ads.filter(checkFiltersRules);


export {disableFilters, resetFilters, setFilterChangeHandler, filterAds}
