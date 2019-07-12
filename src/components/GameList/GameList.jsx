import React from 'react';
import GameListItem from '../GameListItem/GameListItem.jsx';
import './GameList.css';

class GameList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
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
      <div className="game-list-container">
        <h2>Games</h2>
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
}

export default GameList;
