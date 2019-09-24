// Express
const express = require('express');
const app = express();

// Modelo de usuario para Mongoose
const Usuario = require('../models/usuario');

// Funcionalidades de underscore
const _ = require('underscore');

// Para encriptar
const bcrypt = require('bcrypt');



// Para tomar valores del Body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Autenticación
const { verificarToken, verificarTokenAdmin_Role } = require('../middlewares/autenticacion');


app.get('/usuario', verificarToken, (req, res) => {
    //res.json(req.body);

    //return res.json({
    //    usuario: req.usuario,
    //    nombre: req.usuario.nombre
    //})
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usariosBD) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    conteo,
                    usariosBD,
                });
            })
        });
    //res.json('Get Usuario');

});

app.post('/usuario', [verificarToken, verificarTokenAdmin_Role], (req, res) => {

    //c('HOLA');
    let body = req.body;
    console.log(req.body);

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 5),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })



});

app.put('/usuario/:id', [verificarToken, verificarTokenAdmin_Role], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    console.log(body);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

    //res.json({ mensaje: 'Put Usuario', id });

});

app.delete('/usuario/:id', [verificarToken, verificarTokenAdmin_Role], (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario no encontrado' }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    })

    // Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }
    //     if (usuarioBorrado === null) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: { message: 'Usuario no encontrado' }
    //         });
    //     }
    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });



    // });

    //res.json('Delete Usuario');

});

module.exports = app;