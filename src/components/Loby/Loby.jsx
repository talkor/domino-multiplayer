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
      <React.Fragment>
        <div className="loby-header">
          Hello {this.props.user.name}
          {!this.state.showGame ? (
            <Button
              buttonType="logout"
              name="Logout"
              onClick={this.props.onUserLoghout.bind(this)}
            />
          ) : (
            ''
          )}
          {this.state.id ? (
            <Button
              buttonType="leaveGame"
              name="Back To Loby"
              onClick={this.onLeaveGame.bind(this)}
            />
          ) : (
            ''
          )}
        </div>
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
      </React.Fragment>
    );
  }

  componentDidMount() {
    fetch('/users/', { method: 'GET', credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(data => {
        this.setState({ showGame: data.playing !== '', id: data.playing });
      })
      .catch(err => {
        throw err;
      });
  }

  onGameClick(event, id) {
    fetch(`/users/join/${id}`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response;
      })
      .catch(err => {
        throw err;
      });

    return fetch(`/games/${id}/join`, { method: 'GET', credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response;
      })
      .then(() => {
        this.setState({ showGame: true, id });
      })
      .catch(err => {
        throw err;
      });
  }

  onLeaveGame() {
    fetch(`/users/leave/${this.state.id}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response;
      })
      .then(() => {
        this.setState({ showGame: false, id: 0 });
      })
      .catch(err => {
        throw err;
      });

    fetch(`/games/${this.state.id}/leave`, {
      method: 'GET',
      credentials: 'include'
    }).then(response => {
      if (!response.ok) {
      }
    });
  }
}

export default Loby;
