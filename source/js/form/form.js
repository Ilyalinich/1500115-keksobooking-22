import {disableElements} from '../util.js'
import {sendData} from '../api.js'
import {setTitleFieldValidation, setTypeFieldValidation, setPriceFieldValidation, setTimeInValidation,
  setTimeOutValidation, setRoomsFieldValidation, setCapacityFieldValidation, changePriseField} from './form-validation.js'
import {setAvatarChangeHandler, setPhotoChangeHandler, resetFilesPreviews} from './file-preview.js'

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.children;

const addressField = adForm.querySelector('#address');
const setAddress = (lat, lng) => addressField.value = `${lat}, ${lng}`;


const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  disableElements(adFormElements);
}


const activateForm = () => {
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


const setResetButtonHandler = (cb) => {
  const resetButton = adForm.querySelector('.ad-form__reset')
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
  });
}


const resetForm = () => {
  adForm.reset();
  changePriseField();
  resetFilesPreviews();
  document.querySelector('.ad-form__submit').blur();
}


const setFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      onSuccess,
      onFail,
      new FormData(evt.target),
    );
  })
}

export {setAddress, disableForm, activateForm, setFormSubmit, resetForm, setResetButtonHandler}
