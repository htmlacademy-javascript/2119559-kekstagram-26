import {isEnterKey} from './util.js';
import {openBigPictureModal} from './full-size-picture.js';

const drawMiniatures = (data) => {
  const containerElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;

  const picturesListFragment = document.createDocumentFragment();

  data.forEach((item) => {
    const newPictureElement = pictureTemplate.cloneNode(true);

    newPictureElement.querySelector('.picture__img').src = item.url;
    newPictureElement.querySelector('.picture__likes').textContent = item.likes;
    newPictureElement.querySelector('.picture__comments').textContent = item.comments.length;

    newPictureElement.querySelector('.picture__img').addEventListener('click', () => {
      openBigPictureModal(item);
    });

    newPictureElement.querySelector('.picture__img').addEventListener('keydown', (evt) => {
      if (isEnterKey(evt)) {
        openBigPictureModal();
      }
    });

    picturesListFragment.appendChild(newPictureElement);
  });

  containerElement.appendChild(picturesListFragment);
};

export {drawMiniatures};

