import React from 'react';
import './NewGame.css';

class NewGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errMessage: '',
      showModal: false
    };
  }

  render() {
    return (
      <div className="new-game-modal">
        <div className="new-game-modal-main">
          <a href="#" className="close" onClick={this.props.onModalClose} />
          <h1>Start a New Game</h1>
          <form onSubmit={this.onNewGame.bind(this)}>
            <label htmlFor="title">Game Title</label>
            <input name="title" type="text" placeholder="Game Title" />

            <label htmlFor="numPlayers">Players</label>
            <input defaultChecked type="radio" name="numPlayers" value="2" />
            <span> 2 Players </span>

            <input type="radio" name="numPlayers" value="3" />
            <span> 3 Players</span>
            <button value="login" className="game-button new-game-button">
              Create
            </button>
          </form>
          {this.renderErrorMessage()}
        </div>
      </div>
    );
  }

  renderErrorMessage() {
    if (this.state.errMessage) {
      return <div>{this.state.errMessage}</div>;
    }
    return null;
  }

  onNewGame(event) {
    event.preventDefault();
    const game = {
      title: event.target.elements.title.value,
      numPlayers: event.target.elements.numPlayers.value
    };
    fetch('/games/new', {
      method: 'POST',
      body: JSON.stringify(game),
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        this.setState({ errMessage: '' });
        this.props.onModalClose();
      } else {
        if (response.status === 403) {
          // this.setState({
          //   errMessage: 'Username already exist, please try another one'
          // });
        }
        // this.props.loginErrorHandler();
      }
    });
    return false;
  }
}

export default NewGame;
