import React from 'react';
import GameListItem from './GameListItem.jsx';

class GameList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [
        {
          gameId: 1,
          name: 'Nihao Game',
          createdBy: 1232434234,
          numPlayers: 2,
          active: false
        },
        {
          gameId: 2,
          name: 'Nihao Game 2',
          createdBy: 1232434234,
          numPlayers: 3,
          active: false
        },
        {
          gameId: 3,
          name: 'Nihao Game',
          createdBy: 1232434234,
          numPlayers: 2,
          active: false
        }
      ],
      users: [
        {
          name: 'nihao1'
        },
        {
          name: 'nihao 2'
        }
      ]
    };
  }

  componentDidMount() {
    this.getChatContent();
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    return (
      <div className="game-list-container">
        <ul>
          {this.state.games.map((game, index) => (
            <GameListItem game={game} key={index} />
          ))}
        </ul>
      </div>
    );
  }

  getChatContent() {
    return fetch('/chat', { method: 'GET', credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        this.timeoutId = setTimeout(this.getChatContent.bind(this), 200);
        return response.json();
      })
      .then(content => {
        this.setState(() => ({ content }));
      })
      .catch(err => {
        throw err;
      });
  }
}

export default GameList;
