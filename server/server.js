require('./config/config.js')
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(require('./routes/usuario'));
app.use(require('./routes/login'));



// mongoose.connect('mongodb://localhost:27017/cafe1', (err, res) => {

//     if (err) throw err;

//     console.log('Base de datos online');

// });
//mongoose.connect(process.env.URLDB, {
mongoose.connect(process.env.URLDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//app.listen(process.env.PORT, () => {
app.listen(process.env.PORT, (err, res) => {

    if (err) throw err;
    console.log(`Escuchando en puerto ${process.env.PORT}`);
    console.log(`En el ambiente de: ${process.env.URLDB}`);

});