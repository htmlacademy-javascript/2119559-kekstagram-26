import {isEscapeKey} from './utils.js';
import {DEFAULT_COUNT_COMMENTARY} from './consts.js';

const bodyElement =  document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const buttonCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentListElement = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content;
const commentsFragment = document.createDocumentFragment();

let data;

let commentaryCounter = DEFAULT_COUNT_COMMENTARY;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicModal();
  }
};

const createCommentary = (avatar, name, message) => {
  const newCommentElement = commentTemplate.cloneNode(true);
  newCommentElement.querySelector('.social__picture').src = avatar;
  newCommentElement.querySelector('.social__picture').alt = name;
  newCommentElement.querySelector('.social__text').textContent = message;

  return newCommentElement;
};

const addCommentaries = (item, counter) => {
  commentListElement.innerHTML = '';

  for(let i = 0; i < counter; i++)
  {
    const newCommentElement = createCommentary(item.comments[i].avatar, item.comments[i].name, item.comments[i].message);
    commentsFragment.appendChild(newCommentElement);
  }

  commentListElement.appendChild(commentsFragment);
};

const onLoadMoreCommentClick = () => {
  commentaryCounter += DEFAULT_COUNT_COMMENTARY;

  if(data.comments.length < commentaryCounter)
  {
    commentaryCounter = data.comments.length;
    bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  }

  bigPictureElement.querySelector('.social__comment-count').innerHTML = `${commentaryCounter} из <span class="comments-count">${data.comments.length}</span> комментариев`;
  addCommentaries(data, commentaryCounter);
};

const openBigPictureModal = (item) => {
  data = item;
  const commentaryCount = item.comments.length < DEFAULT_COUNT_COMMENTARY ? item.comments.length : DEFAULT_COUNT_COMMENTARY;

  bigPictureElement.classList.remove('hidden');

  bigPictureElement.querySelector('img').src = item.url;
  bigPictureElement.querySelector('.likes-count').textContent = item.likes;

  bigPictureElement.querySelector('.social__comment-count').innerHTML = `${commentaryCount} из <span class="comments-count">${item.comments.length}</span> комментариев`;
  bigPictureElement.querySelector('.social__caption').textContent = item.description;

  if(item.comments.length <= DEFAULT_COUNT_COMMENTARY)
  {
    bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  }

  addCommentaries(item, commentaryCount);

  bigPictureElement.querySelector('.social__comments-loader').addEventListener('click', onLoadMoreCommentClick);

  bodyElement.classList.add('modal__open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

buttonCloseElement.addEventListener('click', closeBigPicModal);

function closeBigPicModal () {
  commentaryCounter = 0;

  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPictureElement.querySelector('.social__comments-loader').removeEventListener('click', onLoadMoreCommentClick);

  bigPictureElement.querySelector('.comments-loader').classList.remove('hidden');

  document.querySelector('.img-upload__preview > img').removeAttribute('style');
  document.querySelector('.img-upload__preview > img').removeAttribute('class');
}

export {openBigPictureModal, closeBigPicModal, onPopupEscKeydown};
