import {MAX_VALUE_FILTER_SCALE, MIN_VALUE_FILTER_SCALE, SCALE_STEP, filterProperty} from './consts.js';

const btnToSmaller = document.querySelector('.scale__control--smaller');
const btnToBigger = document.querySelector('.scale__control--bigger');

const controlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview > img');

const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const sliderElement = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const changeSize = function(isBigger){
  let numberWithoutPercent = parseInt(controlValue.value, 10);
  numberWithoutPercent = isBigger ? numberWithoutPercent + SCALE_STEP : numberWithoutPercent - SCALE_STEP;

  btnToSmaller.disabled = numberWithoutPercent === MIN_VALUE_FILTER_SCALE;
  btnToBigger.disabled = numberWithoutPercent === MAX_VALUE_FILTER_SCALE;

  controlValue.value = `${numberWithoutPercent}%`;
  imgPreview.style.transform = `scale(${numberWithoutPercent /= 100})`;
};

btnToSmaller.addEventListener('click', () => changeSize(false));
btnToBigger.addEventListener('click', () => changeSize(true));

noUiSlider.create(effectLevelSlider, {
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


const onEffectListChange = function(evt){
  if (evt.target.matches('input[type="radio"]')) {
    imgPreview.removeAttribute('class');
    imgPreview.classList.add(`effects__preview--${evt.target.value}`);

    if (evt.target.value === 'none') {
      imgPreview.style.filter = 'unset';

      effectLevelSlider.setAttribute('hidden', true);
      sliderElement.setAttribute('hidden', true);

      effectLevelValue.value = 100;
    } else {
      effectLevelSlider.removeAttribute('hidden');
      sliderElement.removeAttribute('hidden', true);

      effectLevelSlider.noUiSlider.updateOptions(filterProperty[evt.target.value]);
      imgPreview.style.filter = effectLevelSlider.noUiSlider.get();
    }
  }
};

effectLevelSlider.setAttribute('hidden', true);
sliderElement.setAttribute('hidden', true);

effectsList.addEventListener('change', onEffectListChange);

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  if (imgPreview.classList.contains('effects__preview--chrome')) {
    imgPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  }
  if (imgPreview.classList.contains('effects__preview--sepia')) {
    imgPreview.style.filter = `sepia(${effectLevelValue.value})`;
  }
  if (imgPreview.classList.contains('effects__preview--marvin')) {
    imgPreview.style.filter = `invert(${effectLevelValue.value}%)`;
  }
  if (imgPreview.classList.contains('effects__preview--phobos')) {
    imgPreview.style.filter = `blur(${effectLevelValue.value}px)`;
  }
  if (imgPreview.classList.contains('effects__preview--heat')) {
    imgPreview.style.filter = `brightness(${effectLevelValue.value})`;
  }
});

