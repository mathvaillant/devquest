import React from 'react';

import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export const NewRoom = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <strong>Create Q&amp;A chat rooms</strong>
        <p>Get your questions answered in real time</p>
      </aside>
      <main>
        <div className='main-content'>
          <h2>Create new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Room name'
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>Create Room</Button>
          </form>
          <p>
            Would you like to join an existent room instead?{' '}
            <Link to='/'>Click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
