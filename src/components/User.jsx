import React from 'react';
import '../css/user.css';

function User({ userInfo }) {
    return (
        <div className="user-info">
            <div className='user'>
            <h2>User Information</h2>
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            </div>
        </div>
    );
}

export default User;
