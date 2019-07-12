import React from 'react';
import Timer from '../Timer/Timer.jsx';
import Button from '../Button/Button.jsx';
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
          <Button buttonType="undo" name="Undo" onClick={props.onUndoClick} />
        )}
        <Button
          buttonType="new"
          name="New Game"
          onClick={props.onNewGameClick}
        />
        {props.isGameOver ? (
          <React.Fragment>
            <Button buttonType="prev" name="Prev" onClick={props.onPrevClick} />
            <Button buttonType="next" name="Next" onClick={props.onNextClick} />
          </React.Fragment>
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
