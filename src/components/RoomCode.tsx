import React from 'react';
import { memo } from 'react';
import { ReactNode } from 'react';

import copyImg from '../assets/images/copy.svg';
import '../styles/roomCode.scss';

type RoomCodePropType = {
  code: string;
};

const RoomCode = (props: RoomCodePropType) => {
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

export default memo(RoomCode);
