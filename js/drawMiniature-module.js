import {getDataUsers} from './data.js';
import {isEnterKey} from './util.js';
import {openBigPictureModal} from './fullSizePicture-module.js';

const drawMiniatures = function(){
  const data = getDataUsers();
  const container = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;

  const similarListFragment = document.createDocumentFragment();

  data.forEach((item) => {
    const newPicture = pictureTemplate.cloneNode(true);

    newPicture.querySelector('.picture__img').src = item.url;
    newPicture.querySelector('.picture__likes').textContent = item.likes;
    newPicture.querySelector('.picture__comments').textContent = item.comments.length;

    newPicture.querySelector('.picture__img').addEventListener('click', () => {
      openBigPictureModal(item);
    });

    newPicture.querySelector('.picture__img').addEventListener('keydown', (evt) => {
      if (isEnterKey(evt)) {
        openBigPictureModal();
      }
    });

    similarListFragment.appendChild(newPicture);
  });

  container.appendChild(similarListFragment);
};

export {drawMiniatures};

