const bycrypt = require('bcryptjs');
const uuid = require('uuid');
const { Pool } = require('pg');
const pool = new Pool();

async function GetAllAddresses() {
    try {
        let client = await pool.connect();

        try {
            let results = await client.query('select user_id, address, city, zip, state from addresses');
            return results.rows;
        } catch (err) {
            return [];
        } finally {
            client.release();
        }
    } catch (err) {
        return [];
    }
};

async function GetAddress(user_id) {
    try {
        let client = await pool.connect();

        try {
            let results = await client.query(`select user_id, address, city, zip, state from addresses where user_id='${user_id}'`);
            return results.rows;
        } catch (err) {
            return [];
        } finally {
            client.release();
        }
    } catch (err) {
        return [];
    }
};

async function AddAddress(address) {
    try {
        let client = await pool.connect();

        let params = [];
        params.push(uuid.v4()); // generate a random GUID for user_id
        params.push(address.address);
        params.push(address.city); 
        params.push(address.zip);
        params.push(address.state);

        try {
            await client.query('insert into addresses (user_id, address, city, zip, state) values ($1,$2,$3,$4,$5)',params);
            return true;
        } catch (err) {
            return false;
        } finally {
            client.release();
        }
    } catch (err) {
        return false;
    }
};

module.exports = { GetAllAddresses, GetAddress, AddAddress };