import React from 'react';
import { ReactNode } from 'react';

import copyImg from '../assets/images/copy.svg';
import '../styles/roomCode.scss';

type RoomCodeProps = {
  code: string;
};

const RoomCode = (props: RoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code);
  };

  return (
    <button className='room-code'>
      <div onClick={copyRoomCodeToClipboard}>
        <img src={copyImg} alt='copy room code' />
      </div>
      <span>Room {props.code}</span>
    </button>
  );
};

export default RoomCode;
