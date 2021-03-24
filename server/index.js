const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
    res.send("<h1>Hello</h1>");
})

app.listen(3001, () => {
    console.log('Running on port 3001');
});