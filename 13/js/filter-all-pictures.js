const filterSectionElement = document.querySelector('.img-filters');

const defaultButtonElement = document.querySelector('#filter-default');
const randomButtonElement = document.querySelector('#filter-random');
const debateButtonElement = document.querySelector('#filter-discussed');

const clearMiniatures = () => {
  const picture = document.querySelector('.pictures').querySelectorAll('a');
  for (const element of picture) {
    element.remove();
  }
};

const setActiveButton = (evt) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const onDefaultButtonClick = (data, drawMiniatures) => {
  drawMiniatures(data);
};
const onRandomButtonClick = (data, drawMiniatures) => {
  const newData = data.map((item) => item);
  drawMiniatures(newData.sort(() => Math.random() - 0.5).slice(0,9));
};

const onDebateButtonClick = (data, drawMiniatures) => {
  const newData = data.map((item) => item);
  drawMiniatures(newData.slice().sort((photo1, photo2) => photo2.comments.length - photo1.comments.length));
};

const onFilter = (evt, data, cb, func) => {
  evt.preventDefault();
  setActiveButton(evt);
  clearMiniatures();
  func(data, cb);
};

const showFilters = (data, cb) => {
  filterSectionElement.classList.remove('img-filters--inactive');

  defaultButtonElement.addEventListener('click', (evt) => { onFilter(evt, data, cb, onDefaultButtonClick); });
  randomButtonElement.addEventListener('click', (evt) => { onFilter(evt, data, cb, onRandomButtonClick); });
  debateButtonElement.addEventListener('click', (evt) => { onFilter(evt, data, cb, onDebateButtonClick); });
};

export {showFilters};
