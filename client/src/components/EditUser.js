import React, { useState, useEffect, useHistory } from 'react';
import axios from 'axios';

const EditUser = (props) => {
    const userID = props.location.pathname.slice(1);
    // const history = useHistory();

    const [userInfo, setUserInfo] = useState({
        id: '',
        name: "",
        bio: "",
        created_at: "",
        updated_at: ""
    })

    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/users/${userID}`)
        .then(response => {
            setUserInfo(response.data);
        })
    }, [props.id, userID])

    const handleSubmit = e => {
        e.preventDefault();
        const sendUser = {
            name: userInfo.name,
            bio: userInfo.bio
        }
        axios
        .put(`http://localhost:8000/api/users/${userID}`, sendUser)
        .then(res => {
            props.history.push('/');
        })
        .catch(err => console.log(err.response));
    }

    const handleChanges = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
        {userInfo && userInfo.id
        ? <form style={{ width: '500px', margin: '20px' }} onSubmit={handleSubmit}>
            <label><p>ID: {userInfo.id}</p></label>
            <div style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
                <label htmlFor='name'>Enter New Name</label>
                <input value={userInfo.name} onChange={handleChanges} name='name' />
                <label htmlFor='bio'>Enter New Bio</label>
                <input value={userInfo.bio} onChange={handleChanges} name='bio' />
            </div>
            <label><p>Created at: {userInfo.created_at}</p></label>
            <label><p>Updated at: {userInfo.updated_at}</p></label>
            <button type='submit'>Edit User</button>
        </form>
        : <p>Choose a user to edit.</p>}
        </>
    )
}

export default EditUser;