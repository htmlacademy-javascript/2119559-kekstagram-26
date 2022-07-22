import {MAX_VALUE_FILTER_SCALE, MIN_VALUE_FILTER_SCALE, SCALE_STEP, NUMBER_BASE, filtersProperties} from './consts.js';

const buttonToSmallerElement = document.querySelector('.scale__control--smaller');
const buttonToBiggerElement = document.querySelector('.scale__control--bigger');

const controlValueElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview > img');

const effectsListElement = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderLevelElement = document.querySelector('.img-upload__effect-level');
const valueElement = document.querySelector('.effect-level__value');

const changeSize = (isBigger) => {
  let currentSize = parseInt(controlValueElement.value, NUMBER_BASE);
  currentSize = isBigger ? currentSize + SCALE_STEP : currentSize - SCALE_STEP;

  buttonToSmallerElement.disabled = currentSize === MIN_VALUE_FILTER_SCALE;
  buttonToBiggerElement.disabled = currentSize === MAX_VALUE_FILTER_SCALE;

  controlValueElement.value = `${currentSize}%`;
  imgPreviewElement.style.transform = `scale(${currentSize /= MAX_VALUE_FILTER_SCALE})`;
};

noUiSlider.create(sliderElement, {
  range: {
    min: MIN_VALUE_FILTER_SCALE,
    max: MAX_VALUE_FILTER_SCALE,
  },
  start: MAX_VALUE_FILTER_SCALE,
  step: SCALE_STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const onEffectListChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    imgPreviewElement.removeAttribute('class');
    imgPreviewElement.classList.add(`effects__preview--${evt.target.value}`);

    if (evt.target.value === 'none') {
      imgPreviewElement.style.filter = 'unset';

      sliderElement.setAttribute('hidden', true);
      sliderLevelElement.setAttribute('hidden', true);

      valueElement.value = 100;
    } else {
      sliderElement.removeAttribute('hidden');
      sliderLevelElement.removeAttribute('hidden', true);

      sliderElement.noUiSlider.updateOptions(filtersProperties[evt.target.value]);
      imgPreviewElement.style.filter = sliderElement.noUiSlider.get();
    }
  }
};

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();

  let filterValue = '';
  const checkClassListContainsFilter = (filter) => imgPreviewElement.classList.contains(`effects__preview--${filter}`);

  switch(true){
    case checkClassListContainsFilter('chrome'):
      filterValue = `grayscale(${valueElement.value})`;
      break;
    case checkClassListContainsFilter('sepia'):
      filterValue = `sepia(${valueElement.value})`;
      break;
    case checkClassListContainsFilter('marvin'):
      filterValue = `invert(${valueElement.value}%)`;
      break;
    case checkClassListContainsFilter('phobos'):
      filterValue = `blur(${valueElement.value}px)`;
      break;
    case checkClassListContainsFilter('heat'):
      filterValue = `brightness(${valueElement.value})`;
      break;
    default:
      break;
  }

  imgPreviewElement.style.filter = filterValue;
});

buttonToSmallerElement.addEventListener('click', () => changeSize(false));
buttonToBiggerElement.addEventListener('click', () => changeSize(true));

sliderElement.setAttribute('hidden', true);
sliderLevelElement.setAttribute('hidden', true);

effectsListElement.addEventListener('change', onEffectListChange);
