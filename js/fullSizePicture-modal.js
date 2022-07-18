import {isEscapeKey, isEnterKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const btnCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openBigPictureModal (item) {
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('img').src = item.url;
  bigPictureElement.querySelector('.likes-count').textContent = item.likes;
  bigPictureElement.querySelector('.comments-count').textContent = item.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = item.description;

  const commentList = document.querySelector('.social__comments');
  const commentTemplate = document.querySelector('#comment').content;
  const comment4Fragment = document.createDocumentFragment();

  commentList.innerHTML = '';

  item.comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    comment4Fragment.appendChild(newComment);
  });

  commentList.appendChild(comment4Fragment);

  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');

  document.classList.add('modal__open');

  document.addEventListener('keydown', onPopupEscKeydown);
}


function closeUserModal () {
  bigPictureElement.classList.add('hidden');
  document.classList.add('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

btnCloseElement.addEventListener('click', () => {
  closeUserModal();
});

btnCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});

export {openBigPictureModal};
