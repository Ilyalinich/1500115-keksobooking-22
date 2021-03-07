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


const createCard = (dataElement) => {

  const card = cardTemplate.cloneNode(true);

  const avatarContainer = card.querySelector('.popup__avatar');
  if (dataElement.author.avatar === null) {
    avatarContainer.remove();
  } else {
    avatarContainer.src = dataElement.author.avatar;
  }

  card.querySelector('.popup__title').textContent = dataElement.offer.title;
  card.querySelector('.popup__text--price').innerHTML = `${dataElement.offer.price} <span>₽/ночь</span>`;

  const addressContainer = card.querySelector('.popup__text--address');
  if (dataElement.offer.address === null) {
    addressContainer.remove();
  } else {
    addressContainer.textContent = dataElement.offer.address;
  }

  const typeContainer = card.querySelector('.popup__type');
  if (dataElement.offer.type === null) {
    typeContainer.remove();
  } else {
    typeContainer.textContent = REALTY_TYPES[dataElement.offer.type];
  }

  const timeContainer = card.querySelector('.popup__text--time');
  if (dataElement.offer.checkin === null || dataElement.offer.checkout === null) {
    timeContainer.remove();
  } else {
    timeContainer.textContent = `Заезд после ${dataElement.offer.checkin}, выезд до ${dataElement.offer.checkout}.`
  }

  const capacityContainer =  card.querySelector('.popup__text--capacity');
  if (dataElement.offer.rooms === null || dataElement.offer.guests === null) {
    capacityContainer.remove();
  } else {
    capacityContainer.textContent = `${dataElement.offer.rooms} комнаты для ${dataElement.offer.guests} гостей`;
  }

  const featuresList = card.querySelector('.popup__features');
  const featureItems = card.querySelectorAll('.popup__feature');
  if (dataElement.offer.features.length === 0) {
    featuresList.remove();
  } else {
    const featuresFragment = document.createDocumentFragment();
    dataElement.offer.features.forEach((featureName) => {
      for (const featureItem of featureItems) {
        if (featureItem.classList.contains(`popup__feature--${featureName}`)) {
          featuresFragment.appendChild(featureItem)
        }
      }
    });
    featuresList.innerHTML = null;
    featuresList.appendChild(featuresFragment);
  }

  const descriptionContainer =  card.querySelector('.popup__description');
  if (dataElement.offer.description === null) {
    descriptionContainer.remove();
  } else {
    descriptionContainer.textContent = dataElement.offer.description;
  }

  const photosList = card.querySelector('.popup__photos');
  const photosFragment = document.createDocumentFragment();
  if (dataElement.offer.photos.length === 0) {
    photosList.remove();
  } else {
    dataElement.offer.photos.forEach((photoSrc) => {
      const photo = photoTemplate.cloneNode(true);
      photo.classList.add('popup__photo');
      photo.src = photoSrc;

      photosFragment.appendChild(photo);
    });
    photosList.innerHTML = null;
    photosList.appendChild(photosFragment);
  }

  return card;
}

export {createCard};
