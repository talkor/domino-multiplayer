import React from 'react';
import Button from '../Button/Button.jsx';
import './NewGame.css';

class NewGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
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
            <input
              name="title"
              type="text"
              placeholder="Game Title"
              onChange={() => this.setState({ errorMessage: '' })}
            />
            {this.renderErrorMessage()}

            <label htmlFor="numPlayers">Players</label>
            <input defaultChecked type="radio" name="numPlayers" value="2" />
            <span> 2 Players </span>

            <input type="radio" name="numPlayers" value="3" />
            <span> 3 Players</span>
            <Button
              buttonType="new-game-form"
              name="Create Game"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
  }

  renderErrorMessage() {
    if (this.state.errorMessage) {
      return <span className="error-message">{this.state.errorMessage}</span>;
    }
    return null;
  }

  onNewGame(event) {
    event.preventDefault();
    const title = event.target.elements.title.value;
    if (!title) {
      this.setState({ errorMessage: 'You must enter game title!' });
      return;
    }

    const game = {
      title,
      numPlayers: event.target.elements.numPlayers.value
    };
    fetch('/games/new', {
      method: 'POST',
      body: JSON.stringify(game),
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        this.setState({ errorMessage: '' });
        this.props.onModalClose();
      } else {
        if (response.status === 403) {
          this.setState({
            errorMessage: 'Game title already exists, please try another one'
          });
        }
        // this.props.loginErrorHandler();
      }
    });
    return false;
  }
}

export default NewGame;
