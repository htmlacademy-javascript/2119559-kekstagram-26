import {isEscapeKey, isEnterKey} from './util.js';
import {re, MAX_COUNT_HASHTAGS, MAX_LENGTH_HASHTAG} from './consts.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('#upload-file');
const btnCancelUploadForm = document.querySelector('#upload-cancel');
const description = document.querySelector('#description');
const hashtags = document.querySelector('#hashtags');

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

const pristine = new Pristine(imgUploadOverlay);

const closeForm = function(){
  uploadForm.value = '';
  description.value = '';
  hashtags.value = '';

  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onFileUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
    document.removeEventListener('keydown', onFileUploadEscKeydown);
  }
};

const onUploadFormChange = function(){
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFileUploadEscKeydown);
};

const createUploadFileForm = function(){
  pristine.addValidator(hashtags, (value) => {
    const allHashtagsMass = value.split(' ');
    return !(allHashtagsMass.length > MAX_COUNT_HASHTAGS);
  }, `Слишком много хештегов! Должно быть не больше ${ MAX_COUNT_HASHTAGS}.`, 3, false);

  pristine.addValidator(hashtags, (value) => {
    const allHashtagsMass = value.split(' ');
    return allHashtagsMass.some((hashtag) => hashtag.length < MAX_LENGTH_HASHTAG);
  }, `Хештеги не могут быть длиннее ${ MAX_LENGTH_HASHTAG } символов!`, 2, false);

  pristine.addValidator(hashtags, (value) => {
    const allHashtagsMass = value.split(' ');
    return allHashtagsMass.some((hashtag) => (re.test(hashtag)));
  }, 'Хештег должен содержать только буквы или цифры!', 1, false);

  uploadForm.addEventListener('change', onUploadFormChange);
  btnCancelUploadForm.addEventListener('click', closeForm);
  btnCancelUploadForm.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      closeForm();
    }
  });

  imgUploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
      const errors = pristine.getErrors();
      let errorMsg = '';
      errors.forEach((item) => {
        errorMsg = `${errorMsg  } ${  item.errors[0]}`;
      });
      // eslint-disable-next-line no-alert
      alert(errorMsg);
    }
  });
};

export {createUploadFileForm};
