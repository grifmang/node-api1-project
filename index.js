const express = require('express');
const Users = require('./data/db.js');
const server = express();
const cors = require('cors');
const port = 8000;

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('This is a GET request on /');
})

server.get('/api/users', (req, res) => {
    Users.find()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong.' });
    })
})

server.post('/api/users', (req, res) => {
    const userData = req.body;
    // console.log(userData);
    if (!userData.name || !userData.bio) {
        res.status(400).json({ error: 'Please provide a name and bio.'})
    }
    Users.insert(userData)
    .then(response => {
        Users.findById(response.id)
        .then(resp => {
            res.status(201).json(resp);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong.'})
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    Users.findById(id)
    .then(response => {
        if (!response) {
            res.status(404).json({ error: 'User does not exist.' })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong.'});
    })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    Users.findById(id)
    .then(findUser => {
        if (!findUser) {
            res.status(404).json({ error: 'User does not exist.'});
        }
    })

    Users.remove(id)
    .then(deleted => {
        res.status(200).json({ message: 'User was removed.'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong.' });
    })
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    
    Users.findById(id)
    .then(findUser => {
        if (!findUser) {
            res.status(404).json({ error: 'User does not exist.'});
        }
    })

    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ error: 'Please provide a name and bio.'})
    }

    const name = req.body.name;
    const bio = req.body.bio;
    const sendObject = {name, bio};
    Users.update(id, sendObject)
    .then(updatedUser => {
        Users.findById(id)
        .then(response => {
            res.status(200).json(response);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong.'} )
    })
})

server.listen(port, () => console.log(`\n Server listening on port: ${port}`))