const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return res.sendStatus(401);  
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);  
        }
        req.user = user;  
        next();
    });
};


const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.admin) {
        return res.status(403).send('Admin access required');
    }
    next();
};

module.exports = { authenticateToken, isAdmin };
