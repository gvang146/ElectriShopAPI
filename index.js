require('dotenv').config()
const express = require('express');
const app = express();
let jwt = require('jsonwebtoken');
let config = require('./config');
let token = require("./Token");
let bodyParser = require('body-parser');

const userRouter = require('./routers/UserRouter');
const addressRouter = require('./routers/AddressRouter');

class Handler {
    login (res, req) {
        let email = req.body.email;
        let password = req.body.password;

        //Fetch from Database
        let tempEmail = "gvang146@gmail.com";
        let tempPass = "pa55";

        //check conditions
    if (email && password) {
        if (email === tempEmail && password === tempPass) {
            let token = jwt.sign({
                email: email},
                config.secret,
                {expiresIn: '24h' // Token will expire in 24 hours
                }
            );
            res.json({
                sucess: true,
                message: "authentication successful",
                token: token,
            })
        } else {
            res.send(403).json ({
                sucess: false,
                message: "Enter correct email and password"
            });
        }   
    } else {
            res.send(400).json ({
                sucess: false,
                message: "Authentication failed"
            });
        }
    }
    index (req, res) {
        res.json ({
            sucess: true,
            message: 'Dashboard'
        })
    }
}

//starting the server
function main () {
    let handlers = new Handler();
    app.use(express.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    // routers and handlers
    app.use('/user', userRouter);
    app.use('/address', addressRouter);
    app.post('/login', handlers.login);
    app.get('/', token.checkToken, handlers.index);
    app.listen(process.env.PORT, () => {
        console.log(`App running on port ${process.env.PORT}`);
    })
}

main();
/*
// Check message json, attach to request.body 
app.use(express.json());
app.use('/user', userRouter);
app.use('/address', addressRouter);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
})

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
})
*/