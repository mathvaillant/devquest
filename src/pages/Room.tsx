import React, { FormEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type FirebaseQuestionsTypes = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

type RoomParamsType = {
  id: string;
};

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

const Room = () => {
  const { user } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  const params = useParams<RoomParamsType>();
  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const FirebaseQuestions: FirebaseQuestionsTypes =
        databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(FirebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isAnswered: value.isAnswered,
            isHighlighted: value.isHighlighted,
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

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
          <RoomCode code={params.id} />
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
      </main>
    </div>
  );
};

export default Room;
