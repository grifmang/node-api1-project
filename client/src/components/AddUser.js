import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {

    const [user, setUser] = useState({
        name: '',
        bio: ''
    })

    const handleChanges = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post('http://localhost:8000/api/users', user)
        .then(response => {
            alert('User Added.');
        })
        .catch(err => console.log(err.response));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={user.name} onChange={handleChanges} name='name' placeholder='Name' />
            <input value={user.bio} onChange={handleChanges} name='bio' placeholder='Bio' />
            <button type='submit'>Add User</button>
        </form>
    )
}

export default AddUser;