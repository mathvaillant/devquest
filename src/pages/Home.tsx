import React, { FormEvent, useState } from 'react';

import { useHistory } from 'react-router';

import googleIcon from '../assets/images/google-icon.svg';
import Button from '../components/Button';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/auth.scss';

type RoomCodeType = string;

const Home = () => {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState<RoomCodeType>('');

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  };

  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`/rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
    }

    if (roomRef.val().endedAt) {
      alert('Room Already Closed');
      return;
    }
    history.push(`/rooms/${roomCode}`);
  };

  return (
    <div id='page-auth'>
      <aside>
        {/* <img src={bannerImg} alt="" /> */}
        <strong>Create Q&amp;A chat rooms</strong>
        <p>Get your questions answered in real time</p>
      </aside>
      <main>
        <div className='main-content'>
          <button className='create-room' onClick={handleCreateRoom}>
            <img src={googleIcon} alt='Login with google icon img' />
            Create a room with Google
          </button>
          <div className='separator'>Or join a room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Place room ID'
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type='submit'>Join Room</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
