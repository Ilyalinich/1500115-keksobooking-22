import {createCards} from './create-cards.js';
import {getDisableElements} from './util.js'

let isActivePage = false;
const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;

/*global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    isActivePage = true;
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);

if (!isActivePage) {
  filtersForm.classList.add('map__filters--disabled');
  getDisableElements(filtersFormElements);
} else {
  const adForm = document.querySelector('.ad-form');
  const addressField = adForm.querySelector('#address');
  addressField.readOnly = true;
  addressField.value = '35.6895, 139.692';

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  })

  const mainMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.692,
    },
    {
      draggable: true,
      icon: mainIcon,
    },
  );
  mainMarker.addTo(map);

  mainMarker.on('move', (evt) => {
    const coordinates = evt.target.getLatLng();
    addressField.value =`${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  });

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  })

  const cardsArray = createCards();
  cardsArray.forEach((card) => {

    const addressContainer = card.querySelector('.popup__text--address');
    const coordinates = addressContainer.textContent.split(', ');

    const marker = L.marker(
      {
        lat: coordinates[0],
        lng: coordinates[1],
      },
      {
        icon,
      },
    );
    marker.addTo(map);
    marker.bindPopup(card);
  });
}

export{isActivePage}
