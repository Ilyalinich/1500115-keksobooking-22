import {isActivePage, getDisableElements} from './map.js'

const MIN_PRICE_COUNTS = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.children;

if (!isActivePage) {
  adForm.classList.add('ad-form--disabled');
  getDisableElements(adFormElements);
}


// const addressField = adForm.querySelector('#address');


const typeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');

priceField.placeholder = MIN_PRICE_COUNTS[typeField.value];
priceField.min = MIN_PRICE_COUNTS[typeField.value];

const onTypeFieldChange = () => {
  priceField.placeholder = MIN_PRICE_COUNTS[typeField.value];
  priceField.min = MIN_PRICE_COUNTS[typeField.value];
}
typeField.addEventListener('change', onTypeFieldChange);



const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');

const onTimeInFieldChange = () => {
  timeOutField.value = timeInField.value;
}
const onTimeOutFieldChange = () => {
  timeInField.value = timeOutField.value;
}

timeInField.addEventListener('change', onTimeInFieldChange);
timeOutField.addEventListener('change', onTimeOutFieldChange);

