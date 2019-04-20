const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
});

// Handles POST request with new user data
// The only thing unusual is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const password = encryptLib.encryptPassword(req.body.password);

    const queryText = 'INSERT INTO "Person" (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    pool.query(queryText, [firstName, lastName, username, email, password])
        .then(() => { res.sendStatus(201); })
        .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
    // Use passport's built-in method to log out the user
    req.logout();
    res.sendStatus(200);
});

module.exports = router;