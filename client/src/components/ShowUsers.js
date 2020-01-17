import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCards from './UserCards';

const ShowUsers = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:8000/api/users')
        .then(response => {
            setUser(response.data)
        })
        .catch(err => console.log(err.response));
    })

    return (
        <div className='users'>
            {user.length > 0
            ? user.map(element => {
                return <UserCards key={element.id} id={element.id} name={element.name} bio={element.bio} />
            })
            : null}
        </div>
    )
}

export default ShowUsers;