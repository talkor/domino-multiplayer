import React from 'react';
import Button from '../Button/Button.jsx';
import DominoEffect from '../DominoEffect/DominoEffect.jsx';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errMessage: ''
    };
  }

  render() {
    return (
      <div className="login">
        <h1>Domino</h1>
        <DominoEffect />
        <h2>Welcome!</h2>
        <div className="login-form">
          <form onSubmit={this.onUserLogin.bind(this)}>
            <input name="username" placeholder="Enter your name" />
            <Button
              value="login"
              buttonType="login"
              name="Login"
              type="sumbit"
            />
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

  onUserLogin(event) {
    event.preventDefault();
    const username = event.target.elements.username.value;
    fetch('/users/add', {
      method: 'POST',
      body: username,
      credentials: 'include'
    }).then(response => {
      if (response.ok) {
        this.setState({ errMessage: '' });
        this.props.loginSuccessHandler();
      } else {
        if (response.status === 403) {
          this.setState({
            errMessage: 'Username already exist, please try another one'
          });
        }
        this.props.loginErrorHandler();
      }
    });
    return false;
  }
}

export default Login;
