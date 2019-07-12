import React from 'react';
import GameListItem from '../GameListItem/GameListItem.jsx';
import NewGame from '../NewGame/NewGame.jsx';
import Button from '../Button/Button.jsx';
import './GameList.css';

class GameList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      showNewGame: false
    };
  }

  componentDidMount() {
    this.getGames();
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="game-list-container">
          <div className="game-list-header">
            <h2>Games</h2>
            <Button
              buttonType="new-game"
              name="Create a New Game"
              onClick={this.onCreateGame.bind(this)}
            />
          </div>
          <ul>
            {this.state.games.map((game, index) => (
              <GameListItem
                game={game}
                key={index}
                onGameClick={this.props.onGameClick}
              />
            ))}
          </ul>
        </div>
        {this.state.showNewGame && (
          <NewGame
            // onGameCreated={this.onGameCreated.bind(this)}
            onModalClose={this.onModalClose.bind(this)}
          />
        )}
      </React.Fragment>
    );
  }

  getGames() {
    return fetch('/games/all', { method: 'GET', credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        this.timeoutId = setTimeout(this.getGames.bind(this), 200);
        return response.json();
      })
      .then(games => {
        this.setState(() => ({ games }));
      })
      .catch(err => {
        throw err;
      });
  }

  onCreateGame() {
    this.setState({ showNewGame: true });
  }

  onModalClose() {
    this.setState({ showNewGame: false });
  }
}

export default GameList;
