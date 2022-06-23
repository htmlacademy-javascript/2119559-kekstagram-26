const getRandomIntNumber = function(minNumber, maxNumber) {
  if(minNumber < 0 || maxNumber < 0){
    return 'Диапазон должен быть больше 0';
  }

  if(maxNumber - minNumber < 1){
    return 'Целое число в введенном диапазоне не найдено.';
  }

  const value = minNumber - 0.5 + Math.random() * (maxNumber - minNumber + 1);
  return Math.round(value);
};

const isStringRightLength = function(checkedString, maxLength)
{
  return String.length(checkedString) < maxLength;
};

getRandomIntNumber(0, 2);
isStringRightLength('123', 2);
