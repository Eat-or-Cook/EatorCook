const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static register(req, res, next) {
        require('dotenv').config()
        User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(createdUser => {
                let token = jwt.sign({
                    id: createdUser.id,
                    email: createdUser.email
                }, process.env.JWT_SECRET)
                res.status(201).json(token)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        require('dotenv').config()
        let userInfo
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(userData => {
                if (userData) {
                    userInfo = userData
                    return bcrypt.compare(req.body.password, userData.password)
                } else {
                    throw ({
                        statusCode: 404,
                        message: 'Invalid email or password'
                    })
                }
            })
            .then(result => {
                if (result) {
                    let token = jwt.sign({
                        id: userInfo.id,
                        email: userInfo.email
                    }, process.env.JWT_SECRET)
                    res.status(201).json(token)
                } else {
                    throw ({
                        statusCode: 404,
                        message: 'Invalid email or password'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static googleSignIn(req, res, next) {
        require('dotenv').config()
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload
        client.verifyIdToken({
            idToken: req.body.gToken,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
            })
            .then(userData => {
                if (userData) {
                    let token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET)
                    res.status(200).json(token)
                } else {
                    return User.create({
                        email: payload.email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(createdUser => {
                let token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET)
                res.status(200).json(token)
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = UserController