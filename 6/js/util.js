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

export {getRandomIntNumber, createRandomIdFromRangeGenerator, isStringRightLength, getRandomArrayElement};
