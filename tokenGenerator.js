const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    if(!req.header('authorization')) {
        return res.status(401).send({message: "User is not Authorized"});
    }
    let token = req.header('authorization');
    jwt.verify(token, '472D4B6150645367', (error, user) => {
        if(error) {
            return res.status(401).send({message: "Token Expired"});
        }
        else {
            req.email = user.payload.email;
        }
        next();
    })
}

const generateToken = (payload) => {
    return jwt.sign({payload}, '472D4B6150645367', {expiresIn: '1d'});
}

module.exports = {generateToken, isLoggedIn};