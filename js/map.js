import {setAddress, disableForm, activateForm} from './form.js';
import {disableFilters} from './filters.js'
import {createCard} from './create-card.js';
import {getData} from './api.js'
import {createGetErrorMessage} from './create-message.js'

const MAP_ZOOM = 10;

const BasicCoordinates = {
  LAT: 35.6895,
  LNG: 139.692,
};

let isActivePage = false;

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
  disableFilters();
  disableForm();
} else {
  activateForm();
  setAddress(BasicCoordinates.LAT, BasicCoordinates.LNG)

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
    setAddress(lat.toFixed(5), lng.toFixed(5))
  });

  /*eslint-disable*/
  console.log(mainMarker);

  const createAdds = (dataArray) => {
    dataArray.forEach((dataElement) => {
      const card = createCard(dataElement);

      const icon = L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      });

      const {lat, lng} = dataElement.location;

      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon,
        },
      );
      marker.addTo(map);
      marker.bindPopup(card);
    });
  }

  getData(createAdds, createGetErrorMessage);

}

const resetMap = () => {
  /*eslint-disable*/
  console.log('все ок');
  mainMarker.latlng = {
    lat: BasicCoordinates.LAT,
    lng: BasicCoordinates.LNG,
  }
}

export {resetMap}



// const createAdd = (card, location) => {
//   const icon = L.icon({
//     iconUrl: '../img/pin.svg',
//     iconSize: [52, 52],
//     iconAnchor: [26, 52],
//   })

//   const {lat, lng} = location;

//   const marker = L.marker(
//     {
//       lat,
//       lng,
//     },
//     {
//       icon,
//     },
//   );
//   marker.addTo(map);
//   marker.bindPopup(card);
// }

// getData((dataArray) => {
//   dataArray.forEach((dataElement) => {
//     const card = createCard(dataElement);
//     createAdd(card, dataElement.location);
//   })
// });
