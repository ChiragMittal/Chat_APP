const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')
const jwt = require('jsonwebtoken')
const config = require('../configuration/index')

router.post('/signup', (req, res) => {
    console.log(req.body.userData);

    const { username, password } = req.body.userData
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var token = jwt.sign({ _id: req.user._id }, config.jwt.key, {
            expiresIn: 86400 // expires in 24 hours
          });
        console.log(token)
        var userInfo = {
            username: req.user.username,
            token : token
        };
        res.send(userInfo);
    }
)


router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router