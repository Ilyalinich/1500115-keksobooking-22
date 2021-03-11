import {isEscEvent, isEnterEvent} from './util.js'

const MESSAGE_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const messageContainer = document.querySelector('main')


const removeMessage = () => {
  messageContainer.lastChild.remove();
  document.removeEventListener('keydown', onDocumentEscKeydown);
  document.removeEventListener('click', onDocumentClick);
};

const onDocumentEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

const onButtonKeydown = (evt) => {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

const onDocumentClick = () => removeMessage();

const onButtonClick = () => removeMessage();


const createSendSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  successMessage.style.zIndex = 1000;
  messageContainer.append(successMessage);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);
}

const createSendErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  errorMessage.style.zIndex = 1000;
  messageContainer.append(errorMessage);
  const errorButton = messageContainer.querySelector('.error__button');
  errorButton.focus();
  errorButton.addEventListener('click', onButtonClick);
  errorButton.addEventListener('keydown', onButtonKeydown)
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);
}


const createGetErrorMessage = () => {
  const map = document.querySelector('.map')
  const messageContainer = document.createElement('div');
  messageContainer.style.zIndex = 1000;
  messageContainer.style.position = 'absolute';
  messageContainer.style.left = 0;
  messageContainer.style.top = 0;
  messageContainer.style.right = 0;
  messageContainer.style.padding = '10px 3px';
  messageContainer.style.fontSize = '30px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.backgroundColor = 'red';

  messageContainer.textContent = 'Произошла ошибка загрузки данных. Невозможно показать похожие объявления';

  map.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_SHOW_TIME);
}


export{createSendSuccessMessage, createSendErrorMessage, createGetErrorMessage}
