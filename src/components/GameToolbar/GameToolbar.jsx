import React from 'react';
import Timer from '../Timer/Timer.jsx';
import Button from '../Button/Button.jsx';
import PlayerStatus from '../PlayerStatus/PlayerStatus.jsx';
import './GameToolbar.css';

const ENABEL_SPECIAL_CONTROLLERS = false;

const GameToolbar = props => {
  return (
    <React.Fragment>
      <div className="toolbar">
        <span>
          <strong>Waiting for players</strong>
        </span>
        <span>Turns: {props.stats.numTurns}</span>
        <span>Withdrawals: {props.stats.stockWithdrawals}</span>
        <span>Avg. Turn: {props.stats.avgTurnTime}s</span>
        <span>Score: {props.stats.score}</span>

        <Timer elapsedSeconds={props.elapsedSeconds} />

        {ENABEL_SPECIAL_CONTROLLERS && (
          <React.Fragment>
            {props.isGameOver ? (
              ''
            ) : (
              <Button
                buttonType="undo"
                name="Undo"
                onClick={props.onUndoClick}
              />
            )}
            <Button
              buttonType="new"
              name="New Game"
              onClick={props.onNewGameClick}
            />
            {props.isGameOver ? (
              <React.Fragment>
                <Button
                  buttonType="prev"
                  name="Prev"
                  onClick={props.onPrevClick}
                />
                <Button
                  buttonType="next"
                  name="Next"
                  onClick={props.onNextClick}
                />
              </React.Fragment>
            ) : (
              ''
            )}
          </React.Fragment>
        )}
      </div>

      <div className="player-status-container">
        <PlayerStatus name={'nihao1'} tiles={3} />
        <PlayerStatus name={'nihao2'} tiles={4} />
        <PlayerStatus name={'nihao3'} tiles={5} />
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

export default GameToolbar;
