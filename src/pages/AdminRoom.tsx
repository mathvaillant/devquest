import React, { FormEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useParams } from 'react-router';

import Button from '../components/Button';
import Question from '../components/Question';
import RoomCode from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParamsType = {
  id: string;
};

const AdminRoom = () => {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const params = useParams<RoomParamsType>();
  const roomId = params.id;

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

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          {/*  <img src={Logo} alt="" /> */}
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined>Delete Room</Button>
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
              author={question.author}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
