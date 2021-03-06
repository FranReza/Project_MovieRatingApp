const User = require('../models/User.js');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrkey = 'thisisthesecretkey';

module.exports.controller = (app) => {
    //registro de usuarios
    app.post('/users/register', (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const newUser = new User({
            name, 
            email,
            password,
        });

        User.createUser(newUser, (error, user) => {
            if (error) { 
             res.status(422).json({
                 message: 'Algo salio mal, por favor intente nuevamente mas tarde :c',
             });
            }
            res.send({ user });
        });
    });

    //login de usuario
    app.post('/users/login', (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            User.getUserByEmail(email, (err, user) => {
                if (!user) {
                    res.status(404).json({ message: 'El usuario no existe!' });
                } else {
                    User.comparePassword(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            const payload = { id: user.id };
                            const token = jwt.sign(payload, jwtOptions.secretOrkey);
                            res.json({ message: 'ok', token })

                        } else {
                            res.status(401).json({ message: 'La contraseña es incorrecta!' });
                        }
                    });
                }
            });
        }
    });
};