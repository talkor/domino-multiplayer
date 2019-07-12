import React from 'react';
import GameList from '../GameList/GameList.jsx';
import UserList from '../UserList/UserList.jsx';
import Game from '../Game/Game.jsx';
import Button from '../Button/Button.jsx';
import NewGame from '../NewGame/NewGame.jsx';

import './Loby.css';

class Loby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewGame: false,
      showGame: false,
      id: 0
    };
  }

  render() {
    return (
      <div>
        Hello {this.props.user.name}
        <Button
          buttonType="logout"
          name="Logout"
          onClick={this.props.onUserLoghout.bind(this)}
        />
        <React.Fragment>
          {this.state.showGame ? (
            <Game id={this.state.id} />
          ) : (
            <div className="lists-container">
              <GameList onGameClick={this.onGameClick.bind(this)} />
              <UserList />
            </div>
          )}
        </React.Fragment>
      </div>
    );
  }

  onGameClick(event, id) {
    return fetch(`/games/${id}/join`, { method: 'GET', credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        console.log(response);
        return response;
      })
      .then(() => {
        this.setState({ showGame: true, id });
      })
      .catch(err => {
        throw err;
      });
  }
}

export default Loby;
