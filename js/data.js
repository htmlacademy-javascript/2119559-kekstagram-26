import {getRandomIntNumber, createRandomIdFromRangeGenerator, getRandomArrayElement} from './util.js';
import {Comments, Descriptions, Names} from './consts.js';

const createComments = () => {
  const comments = [];
  const numberOfComments = getRandomIntNumber(1, 4);

  const generateCommentId = createRandomIdFromRangeGenerator(100, 300);

  for (let i = 0; i < numberOfComments; i++) {
    const comment = {
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomIntNumber(1, 6)}.svg`,
      message: getRandomArrayElement(Comments),
      name: getRandomArrayElement(Names),
    };

    comments.push(comment);
  }

  return comments;
};

const createUser = (id) => ({
  id : id,
  url : `photos/${id}.jpg`,
  description: getRandomArrayElement(Descriptions),
  likes: getRandomIntNumber(15, 200),
  comments: createComments(),
});

const getDataUsers = function(){
  const allInfo = [];

  for (let i = 1; i < 26; i++) {
    const userInfo = createUser(i);
    allInfo.push(userInfo);
  }

  return allInfo;
};

export {getDataUsers};
