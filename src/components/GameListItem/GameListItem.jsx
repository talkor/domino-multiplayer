import React from 'react';
import './GameListItem.css';

const GameListItem = props => {
  return (
    <li className={`game-list-item ${props.active && 'active'}`}>
      <h3>{props.game.title}</h3>
      <span>Created by: {props.game.createdBy}</span>
      <span>Num players: {props.game.numPlayers}</span>
    </li>
  );
};

export default GameListItem;
