import React from 'react';
import './GameListItem.css';

const GameListItem = props => {
  return (
    <li className="game-list-item">
      <h3>{props.game.name}</h3>
      <span>{props.game.createdBy}</span>
    </li>
  );
};

export default GameListItem;
