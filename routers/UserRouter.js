const express = require('express');
const user = require('../models/User');

const router = new express.Router();

router.get('/', async (req, res) => {
    let userList = await user.GetAllUsers();
    res.status(200).send(userList);
});

router.get('/:id', async (req, res) => {
    let userInfo = await user.GetUser(req.params.id);
    res.status(200).send(userInfo);
});

router.post('/', async (req, res) => {
    let success = await user.AddUser(req.body);
    if (success) res.status(201).send({message : 'success'});
    else res.status(400).send({message : 'error adding new user to system'});
});

module.exports = router;