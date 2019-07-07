import React from 'react';
import UserListItem from './UserListItem.jsx';

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 1,
          name: 'Talko'
        },
        {
          id: 2,
          name: 'Daniel'
        },
        {
          id: 3,
          name: 'John'
        }
      ]
    };
  }

  // componentDidMount() {
  //   this.getChatContent();
  // }

  // componentWillUnmount() {
  //   if (this.timeoutId) {
  //     clearTimeout(this.timeoutId);
  //   }
  // }

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

  // getChatContent() {
  //   return fetch('/chat', { method: 'GET', credentials: 'include' })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw response;
  //       }
  //       this.timeoutId = setTimeout(this.getChatContent.bind(this), 200);
  //       return response.json();
  //     })
  //     .then(content => {
  //       this.setState(() => ({ content }));
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  // }
}

export default UserList;
