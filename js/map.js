import {createCards} from './create-cards.js';
import {disableElements} from './util.js'

const BasicCoordinates = {
  lat: 35.6895,
  lng: 139.692,
};
const mapZoom = 12;

let isActivePage = false;
const filtersForm = document.querySelector('.map__filters');
const filtersFormElements = filtersForm.children;

/*global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    isActivePage = true;
  })
  .setView({
    lat: BasicCoordinates.lat,
    lng: BasicCoordinates.lng,
  }, mapZoom);

if (!isActivePage) {
  filtersForm.classList.add('map__filters--disabled');
  disableElements(filtersFormElements);
} else {
  const adForm = document.querySelector('.ad-form');
  const addressField = adForm.querySelector('#address');
  addressField.value = `${BasicCoordinates.lat}, ${BasicCoordinates.lng}`;

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
      lat: BasicCoordinates.lat,
      lng: BasicCoordinates.lng,
    },
    {
      draggable: true,
      icon: mainIcon,
    },
  );
  mainMarker.addTo(map);

  mainMarker.on('move', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    addressField.value =`${lat.toFixed(5)}, ${lng.toFixed(5)}`;
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
