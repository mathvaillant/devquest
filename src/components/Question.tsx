import React, { memo, ReactNode } from 'react';

import '../styles/question.scss';

type QuestionPropTypes = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  likeCount?: number;
  likeId?: string | undefined;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

const Question = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionPropTypes) => {
  return (
    <div
      className={`question 
      ${isAnswered ? 'answered' : ''} 
      ${isHighlighted && !isAnswered ? 'highlighted' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
};

export default memo(Question);
