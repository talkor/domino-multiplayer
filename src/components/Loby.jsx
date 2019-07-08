import React from 'react';
import GameList from './GameList/GameList.jsx';
import UserList from './UserList.jsx';
import './Loby.css';
import NewGame from './NewGame/NewGame.jsx';

class Loby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewGame: false
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
        <div className="lists-container">
          <GameList />
          <UserList />
          {this.state.showNewGame && (
            <NewGame
              // onGameCreated={this.onGameCreated.bind(this)}
              onModalClose={this.onModalClose.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }

  onNewGame() {
    this.setState({ showNewGame: true });
  }

  onModalClose() {
    this.setState({ showNewGame: false });
  }
}

export default Loby;
