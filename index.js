require('dotenv').config()
const express = require('express');
const app = express();

const userRouter = require('./routers/UserRouter')

app.use(express.json());
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
})

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
})