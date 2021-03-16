import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {setAddress} from './form/form.js'
import {createCard} from './create-card.js';

const MAX_ADS_COUNT = 10;
const COORDINATE_PRECISION = 5;
const MAP_ZOOM = 10;

const BasicCoordinate = {
  LAT: 35.6895,
  LNG: 139.692,
};

const IconSize = {
  WIDTH: 52,
  HEIGTH: 52,
}

let map = '';

const createMap = (loadCallback) => {
  map = L.map('map-canvas');
  map
    .on('load', loadCallback)
    .setView({
      lat: BasicCoordinate.LAT,
      lng: BasicCoordinate.LNG,
    }, MAP_ZOOM);
}

const createMapLayers = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

let mainMarker = '';

const createMainMarker = () => {
  setAddress(BasicCoordinate.LAT, BasicCoordinate.LNG);

  const mainIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [IconSize.WIDTH, IconSize.HEIGTH],
    iconAnchor: [IconSize.WIDTH/2, IconSize.HEIGTH],
  })

  mainMarker = L.marker(
    {
      lat: BasicCoordinate.LAT,
      lng: BasicCoordinate.LNG,
    },
    {
      draggable: true,
      icon: mainIcon,
    },
  );

  mainMarker.on('move', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    setAddress(lat.toFixed(COORDINATE_PRECISION), lng.toFixed(COORDINATE_PRECISION))
  });

  mainMarker.addTo(map);
}


const markersLayer = new L.LayerGroup();

const renderAds = (ads) => {
  markersLayer.clearLayers();

  ads
    .slice(0, MAX_ADS_COUNT)
    .forEach((ad) => {
      const card = createCard(ad);

      const icon = L.icon({
        iconUrl: '../img/pin.svg',
        iconSize: [IconSize.WIDTH, IconSize.HEIGTH],
        iconAnchor: [IconSize.WIDTH/2, IconSize.HEIGTH],
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
    lat: BasicCoordinate.LAT,
    lng: BasicCoordinate.LNG,
  }, MAP_ZOOM);
  mainMarker.setLatLng([BasicCoordinate.LAT, BasicCoordinate.LNG]);
}

export {createMap, createMapLayers, createMainMarker, resetMap, renderAds}
