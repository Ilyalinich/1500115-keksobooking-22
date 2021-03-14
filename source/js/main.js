import {debounce} from './util.js'
import {loadMap, createMapLayers, createMainMarker, resetMap, renderAds} from './map.js'
import {getData} from './api.js'
import {disableForm, setFormSubmit, resetForm, setResetButtonHandler, activateForm} from './form/form.js'
import {disableFilters, resetFilters, setFilterChangeHandler, filterAds} from './filter.js'
import {createSendSuccessMessage, createSendErrorMessage, createGetErrorMessage} from './create-message.js'


const RERENDER_DELAY = 500;

let offers = [];

const resetPage = () => {
  resetForm();
  resetMap();
  if(offers.length !== 0) {
    resetFilters();
    renderAds(offers);
  }
}


new Promise((resolve, reject) => loadMap() ? resolve() : reject())
  .then(() => {
    createMapLayers();
    createMainMarker();
    activateForm();
    setResetButtonHandler(resetPage);
    setFormSubmit(() => {
      createSendSuccessMessage();
      resetPage();
    },
    createSendErrorMessage,
    );

    getData((ads) => {
      renderAds(ads);
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
    () => {
      createGetErrorMessage();
      disableFilters();
    })
  })

  .catch(() => {
    disableFilters();
    disableForm();
  })
