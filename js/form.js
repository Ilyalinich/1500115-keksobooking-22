import {isActivePage} from './map.js'
import {disableElements} from './util.js'

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
const adFormElements = adForm.children;

if (!isActivePage) {
  adForm.classList.add('ad-form--disabled');
  disableElements(adFormElements);
} else {
  const titleField = adForm.querySelector('#title');

  const onTitleFieldFocus = () => {
    if (titleField.validity.valueMissing) {
      titleField.setCustomValidity(`Заголовок должен содержать от ${titleField.minLength} до ${titleField.maxLength} символов.`);
    } else {
      titleField.setCustomValidity('');
    }
    titleField.reportValidity();
  }

  const onTitleFieldInput = () => {
    const valueLength = titleField.value.length;
    if (valueLength < titleField.minLength) {
      titleField.setCustomValidity(`Введите еще ${titleField.minLength - valueLength} симв.`);
    } else if (valueLength > titleField.maxLength) {
      titleField.setCustomValidity(`Удалите лишние ${valueLength - titleField.maxLength} симв.`);
    } else {
      titleField.setCustomValidity('');
    }
    titleField.reportValidity()
  }

  titleField.addEventListener('focus', onTitleFieldFocus);
  titleField.addEventListener('input', onTitleFieldInput);



  const typeField = adForm.querySelector('#type');
  const priceField = adForm.querySelector('#price');

  const onPriceFieldInput = () => {
    if (priceField.value < Number(priceField.min)) {
      priceField.setCustomValidity(`Минимальная цена за ночь: ${priceField.min} руб. для данного типа жилья.`);
    } else if (priceField.value > Number(priceField.max)) {
      priceField.setCustomValidity(`Максимальная цена за ночь: ${priceField.max} руб.`);
    } else {
      priceField.setCustomValidity('');
    }
    priceField.reportValidity()
  }

  priceField.addEventListener('input', onPriceFieldInput);

  const onTypeFieldChange = () => {
    priceField.placeholder = MIN_PRICE_COUNTS[typeField.value];
    priceField.min = MIN_PRICE_COUNTS[typeField.value];
    onPriceFieldInput();
  }

  typeField.addEventListener('change', onTypeFieldChange);


  const timeInField = adForm.querySelector('#timein');
  const timeOutField = adForm.querySelector('#timeout');

  const onTimeInFieldChange = () => timeOutField.value = timeInField.value;
  const onTimeOutFieldChange = () => timeInField.value = timeOutField.value;

  timeInField.addEventListener('change', onTimeInFieldChange);
  timeOutField.addEventListener('change', onTimeOutFieldChange);


  const roomsField = adForm.querySelector('#room_number');
  const capacityField = adForm.querySelector('#capacity');

  const onCapacityFieldChange = () => {
    if (Number(capacityField.value) > Number(roomsField.value)) {
      capacityField.setCustomValidity('Комнат не должно быть меньше, чем гостей');
    } else if ((Number(capacityField.value) === FORM_SPECIAL_VALUES.capacity) && (Number(roomsField.value) !== FORM_SPECIAL_VALUES.rooms)) {
      capacityField.setCustomValidity(`Не для гостей может использоваться только ${FORM_SPECIAL_VALUES.rooms} комнат`);
    } else if ((Number(capacityField.value) !== FORM_SPECIAL_VALUES.capacity) && (Number(roomsField.value) === FORM_SPECIAL_VALUES.rooms)) {
      capacityField.setCustomValidity('Указанное количество комнат может использоваться только не для гостей');
    } else {
      capacityField.setCustomValidity('');
    }
    capacityField.reportValidity()
  }

  capacityField.addEventListener('change', onCapacityFieldChange)
  roomsField.addEventListener('change', onCapacityFieldChange)
}
