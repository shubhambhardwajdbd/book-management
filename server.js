const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/bookdb', {
 
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const bookRouter = require('./routes/books');
app.use('/books', bookRouter);

app.get('/', (req, res) => {
    res.redirect('/books');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
