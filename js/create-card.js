const REALTY_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const photoTemplate = cardTemplate.querySelector('.popup__photo')

const photosFragment = document.createDocumentFragment();

const featuresFragment = document.createDocumentFragment();




const createCard = (dataElement) => {

  const card = cardTemplate.cloneNode(true);
  const featureItems = card.querySelectorAll('.popup__feature');


  dataElement.offer.features.forEach((featureName) => {
    for (const featureItem of featureItems) {
      if (featureItem.classList.contains(`popup__feature--${featureName}`)) {
        featuresFragment.appendChild(featureItem)
      }
    }
  });

  dataElement.offer.photos.forEach((photoSrc) => {
    const photo = photoTemplate.cloneNode(true);
    photo.classList.add('popup__photo');
    photo.src = photoSrc;

    photosFragment.appendChild(photo);
  });


  card.querySelector('.popup__title').textContent = dataElement.offer.title;
  card.querySelector('.popup__text--address').textContent = dataElement.offer.address;
  card.querySelector('.popup__text--price').innerHTML = `${dataElement.offer.price} <span>₽/ночь</span>`;
  card.querySelector('.popup__type').textContent = REALTY_TYPES[dataElement.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${dataElement.offer.rooms} комнаты для ${dataElement.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${dataElement.offer.checkin}, выезд до ${dataElement.offer.checkout}.`
  const featuresList = card.querySelector('.popup__features');
  featuresList.innerHTML = null;
  featuresList.appendChild(featuresFragment);
  card.querySelector('.popup__description').textContent = dataElement.offer.description;
  const photosList = card.querySelector('.popup__photos');
  photosList.innerHTML = null;
  photosList.appendChild(photosFragment);
  card.querySelector('.popup__avatar').src = dataElement.author.avatar;


  return card;
}

// const createCards = (dataArray) => dataArray.map((dataElement) => createCard(dataElement));


export {createCard};
