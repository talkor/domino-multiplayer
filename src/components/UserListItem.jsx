import React from 'react';
import './UserListItem.css';

const UserListItem = props => {
  return (
    <li className="user-list-item">
      <span className="letter-circle">{props.user.name.charAt(0)}</span>
      <h3>{props.user.name}</h3>
    </li>
  );
};

export default UserListItem;
