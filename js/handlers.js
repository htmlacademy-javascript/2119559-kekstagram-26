import {isEscapeKey} from './utils.js';

const bodyElement = document.querySelector('body');
const successInnerElement = document.querySelector('.success__inner');
const successTitleElement = document.querySelector('.success__title');
const successTemplate = document.querySelector('#success').content;
const failureTemplate = document.querySelector('#error').content;

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onSuccessReportClick = (evt) => {
  if (evt.target !== successInnerElement && evt.target !== successTitleElement) {
    closeSuccessMessage();
  }
};

const doAfterSuccessUploadFile = () => {
  const messageFragment = document.createDocumentFragment();
  const successMessage = successTemplate.cloneNode(true);

  messageFragment.appendChild(successMessage);
  bodyElement.appendChild(messageFragment);

  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onSuccessReportClick);

  const submitButton = document.querySelector('.success__button');
  submitButton.addEventListener('click', closeSuccessMessage);
};

function closeSuccessMessage () {
  document.querySelector('section.success').remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('click', onSuccessReportClick);
}

const onFailureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFailureMessage();
  }
};

const onFailureReportClick = (evt) => {
  if (evt.target !== successInnerElement && evt.target !== successTitleElement) {
    closeFailureMessage();
  }
};

const doAfterFailure = (erorrMessage) => {
  const messageFragment = document.createDocumentFragment();
  const failureMessage = failureTemplate.cloneNode(true);

  if(erorrMessage !== undefined){
    failureMessage.querySelector('.error__title').textContent = erorrMessage;
    failureMessage.querySelector('.error__button').textContent = 'Попробовать еще раз.';
  }

  messageFragment.appendChild(failureMessage);
  bodyElement.appendChild(messageFragment);

  document.addEventListener('keydown', onFailureEscKeydown);
  document.addEventListener('click', onFailureReportClick);

  const submitButton = document.querySelector('.error__button');
  submitButton.addEventListener('click', closeFailureMessage);
};

function closeFailureMessage () {
  document.querySelector('section.error').remove();
  document.removeEventListener('keydown', onFailureEscKeydown);
  document.removeEventListener('click', onFailureReportClick);
}

export {doAfterSuccessUploadFile, doAfterFailure};

