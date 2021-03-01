// import './form.js'
// import './map.js'
import {isActivePage, activateMap, resetMap} from './map.js'
import {disableForm, setFormSubmit, resetForm, setResetButtonHandler, activateForm} from './form.js'
import {disableFilters, resetFilters} from './filters.js'
import {createSendSuccessMessage} from './create-message.js'
import {createSendErrorMessage} from './create-message.js'


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
