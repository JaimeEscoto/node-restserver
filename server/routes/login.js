const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/login', (req, res) => {

    let body = req.body;
    //console.log(body);
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: { message: '(Usuario) o contraseña no válido' }

            })
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario o (contraseña) no válido' }

            })
        }
        let token = jwt.sign({
            usuario: usuarioDB
        }, 'mi-clave-secreta', { expiresIn: 60 * 60 });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        });


    })



});


module.exports = app;