import React, { FormEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useParams, useHistory } from 'react-router';

import Button from '../components/Button';
import Question from '../components/Question';
import RoomCode from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import deleteImg from '../assets/images/delete.svg';
import LogoDark from '../assets/images/logoDark.png';

import '../styles/room.scss';
import { Link } from 'react-router-dom';

type RoomParamsType = {
  id: string;
};

const AdminRoom = () => {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const params = useParams<RoomParamsType>();
  const roomId = params.id;
  const history = useHistory();

  const { questions, title } = useRoom(roomId);

  const handlePostQuestion = async (e: FormEvent) => {
    e.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('user not found');
      // React Toast Lib
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Delete question?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  };

  const handleRemoveRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push('/');
  };

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <Link to='/' className='content-logo'>
            <span>DevQuest</span>
            <img width='45px' height='45px' src={LogoDark} alt='' />
          </Link>
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleRemoveRoom}>
              Delete Room
            </Button>
          </div>
        </div>
      </header>

      <main className='content'>
        <div className='room-title'>
          <h1>{title} room</h1>
          {questions.length > 0 && <span>{questions.length} questions</span>}
        </div>

        <form onSubmit={handlePostQuestion}>
          <textarea
            placeholder='Make your question'
            onChange={(e) => setNewQuestion(e.target.value)}
          />

          <div className='form-footer'>
            {user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                <button>Login</button> to post a question
              </span>
            )}

            <Button type='submit' disabled={!user}>
              Post Question
            </Button>
          </div>
        </form>
        <div className='question-list'>
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}>
              <button onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt='delete question' />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
