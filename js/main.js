import './form.js'
import './map.js'
import {setFormSubmit, resetForm, setResetFormHandler} from './form.js'
import {resetFilters} from './filters.js'
import {createSendSuccessMessage} from './create-message.js'
import {createSendErrorMessage} from './create-message.js'


const resetPage = () => {
  resetForm();
  resetFilters();
  /*eslint-disable*/
  console.log('слушаю работает');
}


setResetFormHandler(resetPage);

setFormSubmit(() => {
  createSendSuccessMessage();
  resetPage();
},
() => createSendErrorMessage(),
);


