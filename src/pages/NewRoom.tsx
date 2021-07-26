import React from 'react';
import { useContext } from 'react';

import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

import googleIcon from '../assets/images/google-icon.svg';
import Button from '../components/Button';

import '../styles/auth.scss';

const NewRoom = () => {
  const { user, signInWithGoogle } = useContext(AuthContext);

  return (
    <div id='page-auth'>
      <aside>
        {/* <img src={bannerImg} alt="" /> */}
        <strong>Create Q&amp;/A chat rooms</strong>
        <p>Get your questions answered in real time</p>
      </aside>
      <main>
        <div className='main-content'>
          <h1>{user?.name}</h1>
          <h2>Create A New Room</h2>
          <div className='separator'>Or join a room</div>
          <form>
            <input type='text' placeholder='Place room ID' />
            <Button type='submit'>Create Room</Button>
          </form>
          <p>
            Join an existent room? <Link to='/'>Click to join</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
