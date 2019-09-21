require('./config/config.js')
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    res.json('Get Usuario');

});

app.post('/usuario', (req, res) => {

    let body = req.body;
    let params = req.param;

    if (body.nombre === undefined)

    {
        res.status(400).json({ ok: false, mensaje: 'el nombre es necesario' });
    } else {

        res.json({
            body: body,
            params: params
        });
    }

});

app.put('/usuario', (req, res) => {
    res.json('Put Usuario');

});

app.delete('/usuario', (req, res) => {
    res.json('Delete Usuario');

});
app.listen(process.env.PORT, () => {
    console.log('Escuchando en puerto 3000');

});