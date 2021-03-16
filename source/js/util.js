const disableElements = (elements) => {
  for (const element of elements) {
    element.disabled = true;
  }
}

const enableElements = (elements) => {
  for (const element of elements) {
    element.disabled = false;
  }
}

const isEscEvent = (evt) => evt.key.includes('Escape' || 'Esc' );

const isEnterEvent = (evt) => evt.key === 'Enter';

const debounce = (cb, delay) => {
  let timeout
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(cb, delay);
  };
};

export {disableElements, enableElements, isEscEvent, isEnterEvent, debounce}
