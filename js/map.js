import {createCards} from './create-cards.js';
import {disableElements} from './util.js';
import {getAddress, disableForm, activateForm} from './form.js';

const MAP_ZOOM = 12;

const BasicCoordinates = {
  LAT: 35.6895,
  LNG: 139.692,
};

let isActivePage = false;
const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;

/*global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    isActivePage = true;
  })
  .setView({
    lat: BasicCoordinates.LAT,
    lng: BasicCoordinates.LNG,
  }, MAP_ZOOM);

if (!isActivePage) {
  filtersForm.classList.add('map__filters--disabled');
  disableElements(filtersFormElements);
  disableForm();
} else {
  activateForm();
  getAddress(BasicCoordinates.LAT, BasicCoordinates.LNG)

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
      lat: BasicCoordinates.LAT,
      lng: BasicCoordinates.LNG,
    },
    {
      draggable: true,
      icon: mainIcon,
    },
  );
  mainMarker.addTo(map);

  mainMarker.on('move', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    getAddress(lat.toFixed(5), lng.toFixed(5))
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

