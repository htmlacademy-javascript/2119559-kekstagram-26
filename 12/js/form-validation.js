import {isEscapeKey} from './utils.js';
import {re, MAX_COUNT_HASHTAGS, MAX_LENGTH_HASHTAG, MAX_VALUE_FILTER_SCALE} from './consts.js';
import {saveData} from './api.js';
import {doAfterSuccessUploadFile, doAfterFailure} from './handlers.js';
import './filter-new-picture-tools.js';

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('#upload-file');
const buttonCancelElement = document.querySelector('#upload-cancel');
const buttonSubmitElement = document.querySelector('#upload-submit');
const descriptionElement = document.querySelector('#description');
const hashtagsElement = document.querySelector('#hashtags');

const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');

const imgPreviewElement = document.querySelector('.img-upload__preview > img');

const pristine = new Pristine(imgUploadOverlayElement);

const onFileUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
    document.removeEventListener('keydown', onFileUploadEscKeydown);
  }
};

const onUploadFormChange = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onFileUploadEscKeydown);

  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('.scale__control--bigger').disabled = true;
  document.querySelector('.effect-level__value').value = 100;
};

const createUploadFileForm = () => {
  pristine.addValidator(hashtagsElement, (value) => !(value.split(' ').length > MAX_COUNT_HASHTAGS), `Слишком много хештегов! Должно быть не больше ${ MAX_COUNT_HASHTAGS}.`);
  pristine.addValidator(hashtagsElement, (value) => value.split(' ').some((hashtag) => hashtag.length <= MAX_LENGTH_HASHTAG), `Хештеги не могут быть длиннее ${ MAX_LENGTH_HASHTAG } символов!`);
  pristine.addValidator(hashtagsElement, (value) => value.value.split(' ').every((hashtag) => (re.test(hashtag))), 'Хештег должен содержать только буквы или цифры!');

  pristine.addValidator(descriptionElement, (value) => !(value.length > 140), 'Слишком длинная строка! Не больше 140 символов!');

  uploadFormElement.addEventListener('change', onUploadFormChange);
  buttonCancelElement.addEventListener('click', closeForm);

  imgUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      buttonSubmitElement.disabled = true;
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

function closeForm() {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  uploadFormElement.value = '';
  descriptionElement.value = '';
  hashtagsElement.value = '';
  buttonSubmitElement.disabled = false;

  document.querySelector('.scale__control--value').value = '100%';
  imgPreviewElement.style.transform = 'scale(1)';
  imgPreviewElement.style.filter = 'unset';

  document.querySelector('.effect-level__slider').setAttribute('hidden', true);
  document.querySelector('.img-upload__effect-level').setAttribute('hidden', true);
  document.querySelector('.effect-level__slider').noUiSlider.set(MAX_VALUE_FILTER_SCALE);
}

export {createUploadFileForm};
