import {setAvatarChangeHandler, setPhotoChangeHandler} from './file-preview.js'

const MIN_PRICE_COUNTS = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const FORM_SPECIAL_VALUES = {
  rooms: 100,
  capacity: 0,
}

const adForm = document.querySelector('.ad-form');

const titleField = adForm.querySelector('#title');

const onTitleFieldFocus = () => {
  let validationMessage = '';
  if (titleField.validity.valueMissing) {
    validationMessage = `Заголовок должен содержать от ${titleField.minLength} до ${titleField.maxLength} символов.`;
  }
  titleField.setCustomValidity(validationMessage);
  titleField.reportValidity();
}

const onTitleFieldInput = () => {
  const valueLength = titleField.value.length;
  let validationMessage = '';
  if (valueLength < titleField.minLength) {
    validationMessage = `Введите еще ${titleField.minLength - valueLength} симв.`;
  } else if (valueLength > titleField.maxLength) {
    validationMessage = `Удалите лишние ${valueLength - titleField.maxLength} симв.`;
  }
  titleField.setCustomValidity(validationMessage);
  titleField.reportValidity()
}

const setTitleFieldValidation = () => {
  titleField.addEventListener('focus', onTitleFieldFocus);
  titleField.addEventListener('input', onTitleFieldInput);
}


const priceField = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');

const checkPriceFieldValidity = () => {
  let validationMessage = '';
  if (priceField.value < Number(priceField.min)) {
    validationMessage = `Минимальная цена за ночь: ${priceField.min} руб. для данного типа жилья.`;
  } else if (priceField.value > Number(priceField.max)) {
    validationMessage = `Максимальная цена за ночь: ${priceField.max} руб.`;
  }
  priceField.setCustomValidity(validationMessage);
  priceField.reportValidity()
}
const onPriceFieldInput = () => checkPriceFieldValidity();

const changePriseField = () => {
  priceField.placeholder = MIN_PRICE_COUNTS[typeField.value];
  priceField.min = MIN_PRICE_COUNTS[typeField.value];
};

const onTypeFieldChange = () => {
  changePriseField();
  checkPriceFieldValidity();
}

const setPriceFieldValidation = () => priceField.addEventListener('input', onPriceFieldInput);
const setTypeFieldValidation = () => typeField.addEventListener('change', onTypeFieldChange);


const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');

const setTimeInValidation = () => {
  timeInField.addEventListener('change', () => {
    timeOutField.value = timeInField.value;
  });
}
const setTimeOutValidation = () => {
  timeOutField.addEventListener('change', () => {
    timeInField.value = timeOutField.value;
  });
}


const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');

const checkCapacityFieldValidity = () => {
  let validationMessage = '';
  if (Number(capacityField.value) > Number(roomsField.value)) {
    validationMessage = 'Комнат не должно быть меньше, чем гостей';
  } else if ((Number(capacityField.value) === FORM_SPECIAL_VALUES.capacity) && (Number(roomsField.value) !== FORM_SPECIAL_VALUES.rooms)) {
    validationMessage = `Не для гостей может использоваться только ${FORM_SPECIAL_VALUES.rooms} комнат`;
  } else if ((Number(capacityField.value) !== FORM_SPECIAL_VALUES.capacity) && (Number(roomsField.value) === FORM_SPECIAL_VALUES.rooms)) {
    validationMessage = 'Указанное количество комнат может использоваться только не для гостей';
  }
  capacityField.setCustomValidity(validationMessage);
  capacityField.reportValidity()
}

const setCapacityFieldValidation = () => {
  capacityField.addEventListener('change', () => {
    checkCapacityFieldValidity();
  })
}

const setRoomsFieldValidation = () => {
  roomsField.addEventListener('change', () => {
    checkCapacityFieldValidity();
  })
}


const setFormValidation = () => {
  setAvatarChangeHandler();
  setPhotoChangeHandler();
  setTitleFieldValidation();
  setTypeFieldValidation();
  setPriceFieldValidation();
  setTimeInValidation();
  setTimeOutValidation();
  setRoomsFieldValidation();
  setCapacityFieldValidation();
}

export {setFormValidation, changePriseField}
