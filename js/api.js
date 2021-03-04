const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';
const REGUEST_METOD = 'POST';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => response.ok ? response.json() : onFail())
    .catch(onFail)
    .then(onSuccess);
}

const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_DATA_URL,
    {
      method: REGUEST_METOD,
      body,
    },
  )
    .then((response) => response.ok ? onSuccess() : onFail())
    .catch(onFail);
};


export{getData, sendData}
