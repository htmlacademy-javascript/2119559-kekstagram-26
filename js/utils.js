const getRandomIntNumber = function(minNumber, maxNumber) {
  if(minNumber < 0 || maxNumber < 0){
    return 'Диапазон должен быть больше 0';
  }

  if(maxNumber - minNumber < 1){
    return 'Целое число в введенном диапазоне не найдено.';
  }
  const lower = Math.ceil(Math.min(Math.abs(minNumber), Math.abs(maxNumber)));
  const upper = Math.floor(Math.max(Math.abs(minNumber), Math.abs(maxNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomIntNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const isStringRightLength = function(checkedString, maxLength)
{
  return checkedString.length <= maxLength;
};

const getRandomArrayElement = (elements) => elements[getRandomIntNumber(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {
  getRandomIntNumber,
  createRandomIdFromRangeGenerator,
  isStringRightLength,
  getRandomArrayElement,
  isEscapeKey,
  debounce,
};
