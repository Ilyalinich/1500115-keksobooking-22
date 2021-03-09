import {setAddress} from './form.js';
import {createCard} from './create-card.js';

const MAX_ADS_COUNT = 10;
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

let mainMarker = '';

const activateMap = () =>{
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

  mainMarker = L.marker(
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
}


let markersLayer = new L.LayerGroup();

const renderAds = (ads) => {
  markersLayer.clearLayers();

  ads
    .slice(0, MAX_ADS_COUNT)
    .forEach((ad) => {
      const card = createCard(ad);

      const icon = L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [52, 52],
        iconAnchor: [26, 52],
      });

      const {lat, lng} = ad.location;

      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon,
        },
      );
      marker.bindPopup(card);
      markersLayer.addLayer(marker);
    });
  markersLayer.addTo(map);
}

const resetMap = () => {
  map.setView({
    lat: BasicCoordinates.LAT,
    lng: BasicCoordinates.LNG,
  }, MAP_ZOOM);
  mainMarker.setLatLng([BasicCoordinates.LAT, BasicCoordinates.LNG]);
}

export {isActivePage, activateMap, resetMap, renderAds}
