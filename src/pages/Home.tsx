import React, { useContext } from 'react';

import { useHistory } from 'react-router';

import googleIcon from '../assets/images/google-icon.svg';
import Button from '../components/Button';

import '../styles/auth.scss';
import { AuthContext } from '../App';

const Home = () => {
  const history = useHistory();

  const { signInWithGoogle, user } = useContext(AuthContext);

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  };

  return (
    <div id='page-auth'>
      <aside>
        {/* <img src={bannerImg} alt="" /> */}
        <strong>Create Q&amp;/A chat rooms</strong>
        <p>Get your questions answered in real time</p>
      </aside>
      <main>
        <div className='main-content'>
          <button className='create-room' onClick={handleCreateRoom}>
            <img src={googleIcon} alt='Login with google icon img' />
            Create a room with Google
          </button>
          <div className='separator'>Or join a room</div>
          <form>
            <input type='text' placeholder='Place room ID' />
            <Button type='submit'>Join Room</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
