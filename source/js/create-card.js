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


const createCard = (ad) => {

  const card = cardTemplate.cloneNode(true);

  const avatarContainer = card.querySelector('.popup__avatar');
  if (ad.author.avatar === null) {
    avatarContainer.remove();
  } else {
    avatarContainer.src = ad.author.avatar;
  }

  card.querySelector('.popup__title').textContent = ad.offer.title;

  const priceContainer = card.querySelector('.popup__text--price');
  priceContainer.textContent = ad.offer.price;
  priceContainer.insertAdjacentHTML('beforeend', '<span> ₽/ночь</span>');

  const addressContainer = card.querySelector('.popup__text--address');
  if (ad.offer.address === null) {
    addressContainer.remove();
  } else {
    addressContainer.textContent = ad.offer.address;
  }

  const typeContainer = card.querySelector('.popup__type');
  if (ad.offer.type === null) {
    typeContainer.remove();
  } else {
    typeContainer.textContent = REALTY_TYPES[ad.offer.type];
  }

  const timeContainer = card.querySelector('.popup__text--time');
  if (ad.offer.checkin === null || ad.offer.checkout === null) {
    timeContainer.remove();
  } else {
    timeContainer.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}.`
  }

  const capacityContainer =  card.querySelector('.popup__text--capacity');
  if (ad.offer.rooms === null || ad.offer.guests === null) {
    capacityContainer.remove();
  } else {
    capacityContainer.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  }

  const featuresList = card.querySelector('.popup__features');
  const featureItems = card.querySelectorAll('.popup__feature');
  if (ad.offer.features.length === 0) {
    featuresList.remove();
  } else {
    const featuresFragment = document.createDocumentFragment();
    ad.offer.features.forEach((featureName) => {
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
  if (ad.offer.description === null) {
    descriptionContainer.remove();
  } else {
    descriptionContainer.textContent = ad.offer.description;
  }

  const photosList = card.querySelector('.popup__photos');
  const photosFragment = document.createDocumentFragment();
  if (ad.offer.photos.length === 0) {
    photosList.remove();
  } else {
    ad.offer.photos.forEach((photoSrc) => {
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
