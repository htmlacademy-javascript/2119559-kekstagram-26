import {isEscapeKey, isEnterKey} from './util.js';
import {re, MAX_COUNT_HASHTAGS, MAX_LENGTH_HASHTAG} from './consts.js';
import {saveData} from './api.js';
import {doAfterSuccessUploadFile, doAfterFailure} from './handlers.js';
import './filters-tools.js';

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('#upload-file');
const buttonCancelElement = document.querySelector('#upload-cancel');
const descriptionElement = document.querySelector('#description');
const hashtagsElement = document.querySelector('#hashtags');

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');


const pristine = new Pristine(imgUploadOverlayElement);

const closeForm = function(){
  uploadFormElement.value = '';
  descriptionElement.value = '';
  hashtagsElement.value = '';

  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.querySelector('.effect-level__slider').noUiSlider.set(100);
  document.querySelector('.effect-level__slider').setAttribute('disabled', true);
};

const onFileUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
    document.removeEventListener('keydown', onFileUploadEscKeydown);
  }
};

const onUploadFormChange = function(){
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onFileUploadEscKeydown);

  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('.scale__control--bigger').disabled = true;
  document.querySelector('.effect-level__value').value = 100;
};

const createUploadFileForm = function(){
  pristine.addValidator(hashtagsElement, (value) => !(value.split(' ').length > MAX_COUNT_HASHTAGS), `Слишком много хештегов! Должно быть не больше ${ MAX_COUNT_HASHTAGS}.`, 3, false);
  pristine.addValidator(hashtagsElement, (value) => value.split(' ').some((hashtag) => hashtag.length <= MAX_LENGTH_HASHTAG), `Хештеги не могут быть длиннее ${ MAX_LENGTH_HASHTAG } символов!`, 2, false);
  pristine.addValidator(hashtagsElement, (value) => value.split(' ').some((hashtag) => (re.test(hashtag))), 'Хештег должен содержать только буквы или цифры!', 5, false);

  pristine.addValidator(descriptionElement, (value) => !(value.length > 140), 'Слишком длинная строка! Не больше 140 символов!',4,false);

  uploadFormElement.addEventListener('change', onUploadFormChange);
  buttonCancelElement.addEventListener('click', closeForm);
  buttonCancelElement.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      closeForm();
    }
  });

  imgUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      saveData(
        () => {
          doAfterSuccessUploadFile();
          closeForm();
        },
        () => {
          doAfterFailure();
          closeForm();
        },
        new FormData(evt.target)
      );
    }
  });
};

export {createUploadFileForm};
