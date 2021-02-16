import {createCards} from './create-cards.js';

const cardsArray = createCards();

const map = document.querySelector('#map-canvas');

map.appendChild(cardsArray[0]);

export {map}
