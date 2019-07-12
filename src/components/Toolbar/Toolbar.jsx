import React from 'react';
import Timer from '../Timer/Timer.jsx';
import './Toolbar.css';

const Toolbar = props => {
  return (
    <React.Fragment>
      <div className="toolbar">
        <span>Turns: {props.stats.numTurns}</span>
        <span>Stock Withdrawals: {props.stats.stockWithdrawals}</span>
        <span>Avg. Turn Time: {props.stats.avgTurnTime}s</span>
        <span>Score: {props.stats.score}</span>
        <Timer elapsedSeconds={props.elapsedSeconds} />
        {props.isGameOver ? (
          ''
        ) : (
          <button onClick={props.onUndoClick} className="game-button undo">
            Undo
          </button>
        )}
        <button onClick={props.onNewGameClick} className="game-button new">
          New Game
        </button>
        {props.isGameOver ? (
          <button onClick={props.onPrevClick} className="game-button prev">
            Prev
          </button>
        ) : (
          ''
        )}
        {props.isGameOver ? (
          <button onClick={props.onNextClick} className="game-button next">
            Next
          </button>
        ) : (
          ''
        )}
      </div>
      <div
        className={`ui-message ${props.uiMessage.show ? 'show' : 'hide'} ${
          props.uiMessage.type
        }`}
      >
        <span>{props.uiMessage.message}</span>
      </div>
    </React.Fragment>
  );
};

export default Toolbar;
