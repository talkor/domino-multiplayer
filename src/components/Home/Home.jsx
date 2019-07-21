import React from 'react';
import Login from '../Login/Login.jsx';
import Loby from '../Loby/Loby.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: true,
      currentUser: {
        name: ''
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showLogin ? (
          <Login
            loginSuccessHandler={this.onSuccessedLogin.bind(this)}
            loginErrorHandler={this.onLoginError.bind(this)}
          />
        ) : (
          <Loby
            user={this.state.currentUser}
            onUserLoghout={this.onUserLoghout.bind(this)}
          />
        )}
      </React.Fragment>
    );
  }

  onSuccessedLogin() {
    this.setState({ showLogin: false }, this.getUserName);
  }

  onLoginError() {
    console.error('Login failed');
    this.setState({ showLogin: true });
  }

  getUserName() {
    this.fetchUserInfo()
      .then(userInfo => {
        this.setState({ currentUser: userInfo, showLogin: false });
      })
      .catch(err => {
        if (err.status === 401) {
          // In case we're getting 'unautorithed' as response
          this.setState({ showLogin: true });
        } else {
          throw err;
        }
      });
  }

  fetchUserInfo() {
    return fetch('/users', { method: 'GET', credentials: 'include' }).then(
      response => {
        if (!response.ok) {
          console.log('Could not fetch users');
          throw response;
        }
        return response.json();
      }
    );
  }

  onUserLoghout() {
    fetch('/users/logout', { method: 'GET', credentials: 'include' }).then(
      response => {
        if (!response.ok) {
          console.log(
            `Failed to logout user ${this.state.currentUser.name} `,
            response
          );
        }
        this.setState({ currentUser: { name: '' }, showLogin: true });
      }
    );
  }
}

export default Home;
