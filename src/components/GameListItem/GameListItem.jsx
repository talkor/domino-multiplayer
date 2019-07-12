import React from 'react';
import './GameListItem.css';

const GameListItem = props => {
  return (
    <li
      className={`game-list-item ${props.active ? 'active' : ''}`}
      onClick={event => props.onGameClick(event, props.game.id)}
    >
      <h2>{props.game.title}</h2>
      <span className="label label-user">{props.game.createdBy}</span>
      <span className="label label-players">
        {props.game.numPlayers} Players
      </span>
      {props.game.active ? (
        <span className="label label-active">Game In Progress</span>
      ) : (
        <span className="label label-waiting">Waiting For Players</span>
      )}
      {!props.game.active && (
        <svg className="arrow" viewBox="0 0 8 8">
          <path d="M2.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z" />
        </svg>
      )}
    </li>
  );
};

export default GameListItem;
