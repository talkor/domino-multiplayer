import React from 'react';
import GameList from '../GameList/GameList.jsx';
import UserList from '../UserList/UserList.jsx';
import Game from '../Game/Game.jsx';
import NewGame from '../NewGame/NewGame.jsx';

import './Loby.css';

class Loby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewGame: false,
      showGame: false
    };
  }

  render() {
    return (
      <div>
        Hello {this.props.user.name}
        <button
          className="game-button"
          onClick={this.props.onUserLoghout.bind(this)}
        >
          Logout
        </button>
        <button className="game-button" onClick={this.onNewGame.bind(this)}>
          New Game
        </button>
        <React.Fragment>
          {this.state.showGame ? (
            <Game />
          ) : (
            <div className="lists-container">
              <GameList onGameClick={this.onGameClick.bind(this)} />
              <UserList />
              {this.state.showNewGame && (
                <NewGame
                  // onGameCreated={this.onGameCreated.bind(this)}
                  onModalClose={this.onModalClose.bind(this)}
                />
              )}
            </div>
          )}
        </React.Fragment>
      </div>
    );
  }

  onGameClick(event, id) {
    console.log(id, event);
    this.setState({ showGame: true });
  }

  onNewGame() {
    this.setState({ showNewGame: true });
  }

  onModalClose() {
    this.setState({ showNewGame: false });
  }
}

export default Loby;
