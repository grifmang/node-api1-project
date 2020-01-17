import React from 'react';
import axios from 'axios';

const UserCards = (props) => {
    
    const deleteUser = e => {
        e.preventDefault();
        axios
        .delete(`http://localhost:8000/api/users/${e.target.id}`)
        .then(response => {
            props.history.push('/');
        })
        .catch(err => console.log(err.response));
    }

    const { id } = props;

    return (
        <a href={`/${id}`}>
            <div className='userCard'>
                <h2 style={{ fontSize: '16px' }}>{props.name}</h2>
                <p style={{ fontSize: '14px' }}>{props.bio}</p>
                <button type='button' id={id} onClick={deleteUser}>Delete User</button>
            </div>
        </a>
    )
}

export default UserCards;