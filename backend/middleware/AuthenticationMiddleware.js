const jwt = require('jsonwebtoken');

const AuthenticationMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(`Token: ${token}`)
    if (!token) {
        return res.status(403).send(
            { msg: 'No token provided.' } // for deployment : { msg: 'You are not authorized' }
        );
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send(
                { msg: 'Failed to authenticate token.' }
            );
        }
        console.log(`Decoded: ${decoded.role}`)
        if (decoded.role !== 'admin') {
            return res.status(403).send({ msg: 'You are not authorised' });
        }

        // If everything is good, save the decoded token to the request for use in other routes
        req.userId = decoded.id;
        console.log(`Decoded ID by MiddleWare: ${req.userId}`)
        next();
    });
};

const UserAuthenticationMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(`Token: ${token}`)
    if (!token) {
        return res.status(403).send(
            { msg: 'No token provided.' } // for deployment : { msg: 'You are not authorized' }
        );
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send(
                { msg: 'Failed to authenticate token.' }
            );
        }
        console.log(`Decoded: ${decoded.role}`)
        if (decoded.role !== 'user') {
            return res.status(403).send({ msg: 'Not a User' });
        }

        // If everything is good, save the decoded token to the request for use in other routes
        req.userId = decoded.id;
        console.log(`Decoded ID by MiddleWare: ${req.userId}`)
        next();
    });
};



module.exports = AuthenticationMiddleware;
module.exports = UserAuthenticationMiddleware;