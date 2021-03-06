import {SERVER_URL, SERVER_URL_GET_DATA} from './consts.js';

const loadData = (onSuccess, onFailure) => {
  fetch(SERVER_URL_GET_DATA)
    .then((response) => {
      if(!response.ok){
        throw new Error('Ошибка передачи данных!');
      }

      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((errorMsg) => {
      onFailure(errorMsg);
    });
};

const saveData = (onSuccess, onFailure, data) => {
  fetch(SERVER_URL, {
    method: 'POST',
    body: data
  })
    .then((response) => {
      if(!response.ok){
        throw new Error('Ошибка сохранения данных!');
      }

      onSuccess();
    })
    .catch((errorMsg) => {
      onFailure(errorMsg);
    });
};

export {loadData, saveData};
