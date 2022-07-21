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
  'За двумя зайцами погонишься – от обоих схлопочешь! ',
];

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const MAX_LENGTH_HASHTAG = 20;
const MAX_COUNT_HASHTAGS = 5;
const DEFAULT_COUNT_COMMENTARY = 5;

export {Comments, Descriptions, Names, re, MAX_COUNT_HASHTAGS, MAX_LENGTH_HASHTAG, DEFAULT_COUNT_COMMENTARY};
