import React from 'react';
import { auth } from '../services/firebase';

import '../styles/question.scss';

type QuestionPropTypes = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
};

const Question = ({ content, author }: QuestionPropTypes) => {
  return (
    <div className='question'>
      <p>{content}</p>
      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
      </footer>
    </div>
  );
};

export default Question;
