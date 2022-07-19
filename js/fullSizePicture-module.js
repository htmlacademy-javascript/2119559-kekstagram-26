import {isEscapeKey, isEnterKey} from './util.js';
import {DEFAULT_COUNT_COMMENTARY} from './consts.js';

let commentaryCounter = DEFAULT_COUNT_COMMENTARY;
const body =  document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const btnCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content;
const comment4Fragment = document.createDocumentFragment();

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicModal();
  }
};

const createCommentary = function(item, counter){
  commentList.innerHTML = '';

  for(let i = 0; i < counter; i++)
  {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = item.comments[i].avatar;
    newComment.querySelector('.social__picture').alt = item.comments[i].name;
    newComment.querySelector('.social__text').textContent = item.comments[i].message;

    comment4Fragment.appendChild(newComment);
  }

  commentList.appendChild(comment4Fragment);
};

const onLoadMoreCommentClick = function(item){
  commentaryCounter += DEFAULT_COUNT_COMMENTARY;

  if(item.comments.length <= commentaryCounter)
  {
    commentaryCounter = item.comments.length;
    bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  }

  createCommentary(item, commentaryCounter);
};

function openBigPictureModal (item) {
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('img').src = item.url;
  bigPictureElement.querySelector('.likes-count').textContent = item.likes;
  bigPictureElement.querySelector('.comments-count').textContent = item.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = item.description;

  createCommentary(item, DEFAULT_COUNT_COMMENTARY);

  bigPictureElement.querySelector('.social__comment-count').querySelector('.comments-count').textContent = item.comments.length;
  bigPictureElement.querySelector('.social__comments-loader').addEventListener('click', () => onLoadMoreCommentClick(item));

  body.classList.add('modal__open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeBigPicModal () {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentaryCounter = 0;
  bigPictureElement.querySelector('.social__comments-loader').removeEventListener('click', onLoadMoreCommentClick);
  bigPictureElement.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('.img-upload__preview > img').removeAttribute('style');
  document.querySelector('.img-upload__preview > img').removeAttribute('class');
}

btnCloseElement.addEventListener('click', () => {
  closeBigPicModal();
});

btnCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicModal();
  }
});

export {openBigPictureModal, closeBigPicModal, onPopupEscKeydown};
