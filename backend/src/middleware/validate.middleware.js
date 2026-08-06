import jwt from 'jsonwebtoken'

const validarToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided.' });
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    next();
};

const autorizarAccion = (req, res, next) => {
    const user = req.user;
    const listaUser = req.params.userId || req.body.userId;
    if (user.id !== listaUser) {
        return res.status(403).json({ error: 'You are not authorized to perform this action.' });
    }
    next();
};
export { validarToken, autorizarAccion };