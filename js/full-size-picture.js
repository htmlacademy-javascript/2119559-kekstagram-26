import {isEscapeKey, isEnterKey} from './util.js';
import {DEFAULT_COUNT_COMMENTARY} from './consts.js';

const bodyElement =  document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const buttonCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentListElement = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content;
const commentsFragment = document.createDocumentFragment();

let commentaryCounter = DEFAULT_COUNT_COMMENTARY;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicModal();
  }
};

const createCommentary = function(item, counter){
  commentListElement.innerHTML = '';

  for(let i = 0; i < counter; i++)
  {
    const newCommentElement = commentTemplate.cloneNode(true);
    newCommentElement.querySelector('.social__picture').src = item.comments[i].avatar;
    newCommentElement.querySelector('.social__picture').alt = item.comments[i].name;
    newCommentElement.querySelector('.social__text').textContent = item.comments[i].message;

    commentsFragment.appendChild(newCommentElement);
  }

  commentListElement.appendChild(commentsFragment);
};

const onLoadMoreCommentClick = function(item){
  commentaryCounter += DEFAULT_COUNT_COMMENTARY;

  if(item.comments.length <= commentaryCounter)
  {
    commentaryCounter = item.comments.length;
    bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  }

  bigPictureElement.querySelector('.social__comment-count').innerHTML = `${commentaryCounter} из <span class="comments-count">${item.comments.length}</span> комментариев`;
  createCommentary(item, commentaryCounter);
};

function openBigPictureModal (item) {
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('img').src = item.url;
  bigPictureElement.querySelector('.likes-count').textContent = item.likes;
  const commentaryCount = item.comments.length < DEFAULT_COUNT_COMMENTARY ? item.comments.length : DEFAULT_COUNT_COMMENTARY;
  bigPictureElement.querySelector('.social__comment-count').innerHTML = `${commentaryCount} из <span class="comments-count">${item.comments.length}</span> комментариев`;
  bigPictureElement.querySelector('.social__caption').textContent = item.description;

  if(item.comments.length <= DEFAULT_COUNT_COMMENTARY)
  {
    bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  }

  createCommentary(item, commentaryCount);

  bigPictureElement.querySelector('.social__comments-loader').addEventListener('click', () => onLoadMoreCommentClick(item));

  bodyElement.classList.add('modal__open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeBigPicModal () {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentaryCounter = 0;
  bigPictureElement.querySelector('.social__comments-loader').removeEventListener('click', onLoadMoreCommentClick);
  bigPictureElement.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('.img-upload__preview > img').removeAttribute('style');
  document.querySelector('.img-upload__preview > img').removeAttribute('class');
}

buttonCloseElement.addEventListener('click', () => {
  closeBigPicModal();
});

buttonCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicModal();
  }
});

export {openBigPictureModal, closeBigPicModal, onPopupEscKeydown};
