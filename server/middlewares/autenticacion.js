const jwt = require('jsonwebtoken');


// Verificar token
let verificarToken = (req, res, next) => {
    let token = req.get('token'); // el token del header
    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
    //res.json({ token });
}

// Verificar admin role
let verificarTokenAdmin_Role = ((req, res, next) => {

    if (req.usuario.role === 'ADMIN_ROLE') {
        next();
    }
    return res.status(401).json({
        ok: false,
        err: { message: 'El usuario no es admin' }
    });


});
//res.json({ token });


module.exports = {
    verificarToken,
    verificarTokenAdmin_Role
}