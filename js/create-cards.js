import {generateAds} from './data.js';

const adsArray = generateAds();

const REALTY_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

// const map = document.querySelector('#map-canvas')
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const photoTemplate = cardTemplate.querySelector('.popup__photo')
// const cardsFragment = document.createDocumentFragment();
const photosFragment = document.createDocumentFragment();
const featuresFragment = document.createDocumentFragment();




const createCard = (dataElement) => {

  const card = cardTemplate.cloneNode(true);
  const featuresItems = card.querySelectorAll('.popup__feature');

  const createFeaturesList = (featuresNames) => {
    featuresNames.forEach((featureName) => {
      for (let i = 0; i < featuresItems.length; i++) {
        if (featuresItems[i].classList.contains(`popup__feature--${featureName}`)) {
          featuresFragment.appendChild(featuresItems[i])
        }
      }
    });
    return featuresFragment;
  };

  const createPhotosList = (photoSources) => {
    photoSources.forEach((photoSrc) => {
      const photo = photoTemplate.cloneNode(true);
      photo.classList.add('popup__photo');
      photo.src = photoSrc;

      photosFragment.appendChild(photo);
    });
    return photosFragment;
  }

  card.querySelector('.popup__title').textContent = dataElement.offer.title;
  card.querySelector('.popup__text--address').textContent = dataElement.offer.address;
  card.querySelector('.popup__text--price').innerHTML = `${dataElement.offer.price} <span>₽/ночь</span>`;
  card.querySelector('.popup__type').textContent = REALTY_TYPES[dataElement.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${dataElement.offer.rooms} комнаты для ${dataElement.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${dataElement.offer.checkin}, выезд до ${dataElement.offer.checkout}.`
  const featuresList = card.querySelector('.popup__features');
  featuresList.innerHTML = null;
  featuresList.appendChild(createFeaturesList(dataElement.offer.features));
  card.querySelector('.popup__description').textContent = dataElement.offer.description;
  const photosList = card.querySelector('.popup__photos');
  photosList.innerHTML = null;
  photosList.appendChild(createPhotosList(dataElement.offer.photos));
  card.querySelector('.popup__avatar').src = dataElement.author.avatar;

  return card;
}

const createCards = () => adsArray.map((ad) => createCard(ad));


// const totalArray = adsArray.map((ad) => {
//   const card = cardTemplate.cloneNode(true);


//   const featuresItems = card.querySelectorAll('.popup__feature');


//   const createFeaturesList = (featuresNames) => {
//     featuresNames.forEach((featureName) => {
//       for (let i = 0; i < featuresItems.length; i++) {
//         if (featuresItems[i].classList.contains(`popup__feature--${featureName}`)) {
//           featuresFragment.appendChild(featuresItems[i])
//         }
//       }
//     });

//     return featuresFragment;
//   };


//   const createPhotosList = (photoSources) => {
//     photoSources.forEach((photoSrc) => {
//       const photo = photoTemplate.cloneNode(true);
//       photo.classList.add('popup__photo');
//       photo.src = photoSrc;

//       photosFragment.appendChild(photo);
//     });

//     return photosFragment;
//   }


//   card.querySelector('.popup__title').textContent = ad.offer.title;
//   card.querySelector('.popup__text--address').textContent = ad.offer.address;
//   card.querySelector('.popup__text--price').innerHTML = `${ad.offer.price} <span>₽/ночь</span>`;
//   card.querySelector('.popup__type').textContent = REALTY_TYPES[ad.offer.type];
//   card.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
//   card.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}.`
//   const featuresList = card.querySelector('.popup__features');
//   featuresList.innerHTML = null;
//   featuresList.appendChild(createFeaturesList(ad.offer.features));
//   card.querySelector('.popup__description').textContent = ad.offer.description;
//   const photosList = card.querySelector('.popup__photos');
//   photosList.innerHTML = null;
//   photosList.appendChild(createPhotosList(ad.offer.photos));
//   card.querySelector('.popup__avatar').src = ad.author.avatar;


//   return card;

// });


export {createCards};
