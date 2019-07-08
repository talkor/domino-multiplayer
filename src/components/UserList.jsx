import React from 'react';
import UserListItem from './UserListItem.jsx';

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="user-list-container">
          <h2>Online Players</h2>
          <ul>
            {this.state.users.map((user, index) => (
              <UserListItem user={user} key={index} color />
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }

  getUsers() {
    return fetch('/users/all', { method: 'GET', credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        this.timeoutId = setTimeout(this.getUsers.bind(this), 200);
        return response.json();
      })
      .then(users => {
        this.setState(() => ({ users }));
      })
      .catch(err => {
        throw err;
      });
  }
}

export default UserList;
