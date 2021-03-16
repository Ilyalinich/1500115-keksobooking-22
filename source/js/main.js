import {debounce} from './util.js'
import {createMap, createMapLayers, createMainMarker, resetMap, renderAds} from './map.js'
import {getData} from './api.js'
import {disableForm, enableForm, setFormSubmit, resetForm, setResetButtonHandler} from './form/form.js'
import {setFormValidation} from './form/form-validation.js'
import {disableFilters, enableFilters, resetFilters, setFilterChangeHandler, filterAds} from './filter.js'
import {createSendSuccessMessage, createSendErrorMessage, createGetErrorMessage} from './create-message.js'


const RERENDER_DELAY = 500;

disableFilters();
disableForm();

let offers = [];

const resetPage = () => {
  resetForm();
  resetMap();
  if(offers.length !== 0) {
    resetFilters();
    renderAds(offers);
  }
}

createMap(() => {
  createMapLayers();
  createMainMarker();
  enableForm();
  setFormValidation();
  setResetButtonHandler(resetPage);
  setFormSubmit(() => {
    createSendSuccessMessage();
    resetPage();
  },
  createSendErrorMessage,
  );

  getData((ads) => {
    renderAds(ads);
    enableFilters();
    setFilterChangeHandler(
      debounce(
        () => {
          const filteredAds = filterAds(ads);
          renderAds(filteredAds);
        },
        RERENDER_DELAY,
      ));

    offers = ads;
  },
  createGetErrorMessage,
  )
})
