import React from 'react';
import GameList from './GameList.jsx';
import UserList from './UserList.jsx';
import './Loby.css';

function Loby(props) {
  return (
    <div>
      Hello {props.user.name}
      <button onClick={props.onUserLoghout.bind(this)}>Logout</button>
      <div className="lists-container">
        <GameList />
        <UserList />
      </div>
    </div>
  );
}

export default Loby;
