import {isActivePage, activateMap, resetMap, createAdds} from './map.js'
import {getData} from './api.js'
import {disableForm, setFormSubmit, resetForm, setResetButtonHandler, activateForm} from './form.js'
import {disableFilters, resetFilters, setFilterChangeHandler} from './filters.js'
import {createSendSuccessMessage, createSendErrorMessage, createGetErrorMessage} from './create-message.js'


const resetPage = () => {
  resetForm();
  resetFilters();
  resetMap();
}


new Promise((resolve, reject) => {
  return isActivePage
    ? resolve()
    : reject()
})
  .then(() => {
    activateMap();
    getData((dataArray) => {
      /*eslint-disable*/
      console.log(dataArray)
      createAdds(dataArray);
      setFilterChangeHandler(() => createAdds(dataArray));
    },
    createGetErrorMessage);
    activateForm();
    setResetButtonHandler(resetPage);
    setFormSubmit(() => {
      createSendSuccessMessage();
      resetPage();
    },
    () => createSendErrorMessage(),
    );
  })
  .catch(() => {
    disableFilters();
    disableForm();
  })



