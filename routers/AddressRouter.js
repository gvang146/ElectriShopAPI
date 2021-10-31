const express = require('express');
const address = require('../models/Address');

const router = new express.Router();

router.get('/', async (req, res) => {
    let addressList = await address.GetAllAddresses();
    res.status(200).send(addressList);
});

router.get('/:user_id', async (req, res) => {
    let addressInfo = await address.GetAddress(req.params.user_id);
    res.status(200).send(addressInfo);
});

router.post('/', async (req, res) => {
    let success = await address.AddAddress(req.body);
    if (success) res.status(201).send({message : 'success'});
    else res.status(400).send({message : 'error adding new Address to system'});
});

module.exports = router;