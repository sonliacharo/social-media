const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Token não fornecido' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido ou expirado' });
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;