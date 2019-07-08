import React from 'react';

class NewGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errMessage: ''
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1>Domino</h1>
        <div className="new-game-form">
          <form onSubmit={this.onNewGame.bind(this)}>
            <input name="title" type="text" placeholder="Game Title" />
            <select defaultValue="2" name="numPlayers">
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <button value="login" className="game-button new-game-button">
              Create
            </button>
          </form>
          {this.renderErrorMessage()}
        </div>
      </React.Fragment>
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
      body: game,
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        this.setState({ errMessage: '' });
        this.props.onGameCreated();
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
