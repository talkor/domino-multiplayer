import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errMessage: ''
    };
  }

  render() {
    return (
      <div className="login-page-wrapper">
        <form onSubmit={this.handleLogin.bind(this)}>
          <label className="username-label" htmlFor="username">
            Name:
          </label>
          <input className="" name="username" />
          <input className="" type="submit" value="login" />
        </form>
        {this.renderErrorMessage()}
      </div>
    );
  }

  renderErrorMessage() {
    if (this.state.errMessage) {
      return <div>{this.state.errMessage}</div>;
    }
    return null;
  }

  handleLogin(event) {
    event.preventDefault();
    const userName = event.target.elements.username.value;
    fetch('/users/add', {
      method: 'POST',
      body: userName,
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
