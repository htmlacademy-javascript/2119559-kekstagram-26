const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const NUMBER_BASE = 10;

const MAX_LENGTH_HASHTAG = 20;
const MAX_COUNT_HASHTAGS = 5;

const DEFAULT_COUNT_COMMENTARY = 5;

const MAX_VALUE_FILTER_SCALE = 100;
const MIN_VALUE_FILTER_SCALE = 25;
const SCALE_STEP = 25;

const MAX_LENGTH_DESCRIPTION = 140;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const SERVER_URL = 'https://26.javascript.pages.academy/kekstagram';
const SERVER_URL_GET_DATA = `${SERVER_URL}/data`;

const filtersProperties = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

export {
  re,
  filtersProperties,

  NUMBER_BASE,

  MAX_COUNT_HASHTAGS,
  MAX_LENGTH_HASHTAG,

  DEFAULT_COUNT_COMMENTARY,

  FILE_TYPES,

  MAX_VALUE_FILTER_SCALE,
  MIN_VALUE_FILTER_SCALE,
  SCALE_STEP,

  MAX_LENGTH_DESCRIPTION,

  SERVER_URL,
  SERVER_URL_GET_DATA,
};

