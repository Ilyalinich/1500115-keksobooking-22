import {disableElements} from './util.js'
const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;

const disableFilters = () => {
  filtersForm.classList.add('map__filters--disabled');
  disableElements(filtersFormElements);
}

const resetFilters = () => filtersForm.reset();


export {disableFilters, resetFilters}
