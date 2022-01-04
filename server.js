const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'test',
        database : 'smart-brain'
    }
});

const app = express();

// MIDDLEWARE
app.use(express.json()); // from body-parser
app.use(cors());

app.get('/', (req, res) => {
    // res.send(database.users);
    // Returns a promise
    db.select('*').from('users').then(data => {
        // console.log(data);
    });
    res.send("Success");
})

app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//     console.log(`app is running on port ${PORT}`);
// });

/*
ENDPOINTS:
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user, update their ranks
*/