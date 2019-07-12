import React from 'react';
import UserListItem from '../UserListItem/UserListItem.jsx';
import './UserList.css';

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
      <div className="user-list-container">
        <h2>Online Players</h2>
        <ul>
          {this.state.users.map((user, index) => (
            <UserListItem
              user={user}
              key={index}
              color={this.generateUserColor(user.name)}
            />
          ))}
        </ul>
      </div>
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

  generateUserColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return 'hsl(' + (hash % 360) + ', ' + 30 + '%, ' + 80 + '%)';
  }
}

export default UserList;
