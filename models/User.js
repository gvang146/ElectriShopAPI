const bycrypt = require('bcryptjs');
const uuid = require('uuid');
const { Pool } = require('pg');
const pool = new Pool();

async function GetAllUsers() {
    try {
        let client = await pool.connect();

        try {
            let results = await client.query('select id, email, first_name, last_name from users');
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

async function GetUser(id) {
    try {
        let client = await pool.connect();

        try {
            let results = await client.query(`select id, email, first_name, last_name from users where id='${id}'`);
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

async function AddUser(user) {
    try {
        let client = await pool.connect();

        let params = [];
        params.push(uuid.v4()); // generate a random GUID for user_id
        params.push(user.email);
        params.push(bycrypt.hashSync(user.password, 8)); // generate password hash
        params.push(user.lastname);
        params.push(user.firstname);

        try {
            await client.query('insert into users (id, email, password, last_name, first_name) values ($1,$2,$3,$4,$5)',params);
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

module.exports = { GetAllUsers, GetUser, AddUser };