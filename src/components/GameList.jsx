import React from 'react';
import GameListItem from './GameListItem.jsx';

class GameList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [
        // {
        //   gameId: 1,
        //   title: 'Nihao Game',
        //   createdBy: 1232434234,
        //   numPlayers: 2,
        //   active: false
        // },
        // {
        //   gameId: 2,
        //   title: 'Nihao Game 2',
        //   createdBy: 1232434234,
        //   numPlayers: 3,
        //   active: false
        // },
        // {
        //   gameId: 3,
        //   title: 'Nihao Game',
        //   createdBy: 1232434234,
        //   numPlayers: 2,
        //   active: false
        // }
      ]
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
      <div>
        <h2>Games</h2>
        <ul>
          {this.state.games.map((game, index) => (
            <GameListItem game={game} key={index} />
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
