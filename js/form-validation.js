import {isEscapeKey} from './utils.js';
import {re, MAX_COUNT_HASHTAGS, MAX_LENGTH_HASHTAG, MAX_VALUE_FILTER_SCALE, FILE_TYPES, MAX_LENGTH_DESCRIPTION} from './consts.js';
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

const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
};

const pristine = new Pristine(imgUploadFormElement, defaultConfig);

const onFileUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (hashtagsElement !== document.activeElement && descriptionElement !== document.activeElement) {
      onCloseForm();
      document.removeEventListener('keydown', onFileUploadEscKeydown);
    }
  }
};

const onUploadFormChange = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onFileUploadEscKeydown);

  const file = uploadFormElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    document.querySelector('.img-upload__preview').querySelector('img').src = URL.createObjectURL(file);
  }

  document.querySelector('.scale__control--value').value = `${MAX_VALUE_FILTER_SCALE}%`;
  document.querySelector('.scale__control--bigger').disabled = true;
  document.querySelector('.effect-level__value').value = MAX_VALUE_FILTER_SCALE;
};

const createUploadFileForm = () => {
  pristine.addValidator(hashtagsElement, (value) => !(value.split(' ').map((item) => item).length > MAX_COUNT_HASHTAGS), `Слишком много хештегов! Должно быть не больше ${ MAX_COUNT_HASHTAGS}.`);
  pristine.addValidator(hashtagsElement, (value) => value.split(' ').map((item) => item).some((hashtag) => hashtag.length <= MAX_LENGTH_HASHTAG), `Хештеги не могут быть длиннее ${ MAX_LENGTH_HASHTAG } символов!`);
  pristine.addValidator(hashtagsElement, (value) => value.split(' ').map((item) => item).every((hashtag) => (re.test(hashtag)) || value === ''), 'Хештег должен содержать только буквы или цифры!');
  pristine.addValidator(hashtagsElement, (value) => {
    const hashtags = value.split(' ');
    const hashtagsFilter = hashtags.filter(Boolean);
    const uniqueHashtags = hashtagsFilter.filter((item, index) => hashtagsFilter.indexOf(item) === index);
    if (hashtagsFilter.length !== uniqueHashtags.length) {
      return false;
    }
    return true;
  }, 'Хештеги не должны повторяться!');

  pristine.addValidator(descriptionElement, (value) => value.length < MAX_LENGTH_DESCRIPTION, `Комментарий не должен быть длиннее ${MAX_LENGTH_DESCRIPTION}`);

  uploadFormElement.addEventListener('change', onUploadFormChange);
  buttonCancelElement.addEventListener('click', onCloseForm);

  imgUploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      buttonSubmitElement.disabled = true;
      saveData(
        () => {
          doAfterSuccessUploadFile();
          onCloseForm(true);
        },
        () => {
          doAfterFailure();
          onCloseForm(false);
        },
        new FormData(evt.target)
      );
    } else {
      const errors = pristine.getErrors();
      let errorMsg = '';
      errors.forEach((item) => {
        errorMsg = `${errorMsg  } ${  item.errors[0]}`;
      });
      doAfterFailure(errorMsg);
    }
  });
};

function onCloseForm(isNeedToClean) {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  buttonSubmitElement.disabled = false;

  if(isNeedToClean){
    uploadFormElement.value = '';
    descriptionElement.value = '';
    hashtagsElement.value = '';

    document.querySelector('.scale__control--value').value = '100%';
    imgPreviewElement.style.transform = 'scale(1)';
    imgPreviewElement.removeAttribute('class');
    imgPreviewElement.style.filter = 'unset';
    imgPreviewElement.classList.add('effects__preview--none');

    document.querySelector('.effect-level__slider').setAttribute('hidden', true);
    document.querySelector('.img-upload__effect-level').setAttribute('hidden', true);
    document.querySelector('.effect-level__slider').noUiSlider.set(MAX_VALUE_FILTER_SCALE);

    pristine.reset();
  }
}

export {createUploadFileForm};
