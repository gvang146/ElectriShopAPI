const express = require('express');
const app = express();

const port = 8080;

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
})

app.listen(port, () => {
    console.log(`App started on port ${port}`);
})