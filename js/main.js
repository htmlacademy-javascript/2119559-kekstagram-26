const Comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
    'В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
    ' Как можно было поймать такой неудачный момент?!',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
];

const Names = [
    'Иван',
    'Борис',
    'Наташа',
    'Дмитрий',
    'Саша',
    'Соня',
    'Давид',
    'Юра',
    'Мария',
    'Антон',
];

const Descriptions = [
    'Ставя палки в колеса, можно остаться и без палки.',
    'Семь раз промолчи – один раз крякни.',
    'Одна голова лучше, а два сапога пара!',
    'Слово не воробей – догони и добей!',
    'Ломать не строить, пинать не целовать! ',
    'Упал с самолета – учись летать!',
    'Кто рано встает, тот не высыпается.',
    'Будешь мало знать – никогда не состаришься.',
    'Терпенье и труд мозги перетрут.',
    'За двумя зайцами погонишься – от обоих схлопочешь!',
];

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
        console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
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
  return String.length(checkedString) <= maxLength;
};

const getRandomArrayElement = (elements) => {
    return elements[getRandomIntNumber(0, elements.length - 1)];
};

const createComments = () => {
    let comments = [];
    var numberOfComments = getRandomIntNumber(1, 4);

    const generateCommentId = createRandomIdFromRangeGenerator(100, 300);

    for (let i = 0; i < numberOfComments; i++) {
        let comment = {
            id: generateCommentId(),
            avatar: `img/avatar-${getRandomIntNumber(1, 6)}.svg`,
            message: getRandomArrayElement(Comments),
            name: getRandomArrayElement(Names),
        };

        comments.push(comment);        
    }

    return comments;
};

const createUser = (id) => {
    return {
        id : id,
        url : `photos/${id}.jpg`,
        description: getRandomArrayElement(Descriptions),
        likes: getRandomIntNumber(15, 200),
        comments: createComments(),

    };
};

const getDataUsers = function(){
    let allInfo = [];

    for (let i = 0; i < 24; i++) {
        let userInfo = createUser(i);
        allInfo.push(userInfo);        
    }

    return allInfo;
};

getRandomIntNumber(0, 2);
isStringRightLength('123', 2);

getDataUsers();