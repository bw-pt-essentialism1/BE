const JWT = require('jsonwebtoken');
const auth = require('../routes/auth/auth-model');

const secret = process.env.SECRET;

function validateUser (req, res , next) {
    const token = req.headers.authorization;

    if(token) {
        JWT.verify(token, secret, (err, decodedToken) => {
            err ? res.status(401).json({message: 'credential not valid', success: false})
                     : next();
        })
    }
    else {
        res.status(401).json({message: 'credential not valid', success: false});
    }
}


function generateToken(user) {

    const payload = {
        userID: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d'
    }

    return JWT.sign(payload, secret, options);
}

async function checkIfUserExists(req, res , next){

    try {
        const {username, email, phone} = req.body;

        let user = await auth.findBy({username});
        if(user.length !== 0) {
            res.status(403).json({message: "an account with that username already exists", success: false});
        }

        user = await auth.findBy({phone});        
        if(user.length !== 0) { 
            res.status(403).json({message: "an account with that phonenumber already exists", success: false}) 
        }

        user = await auth.findBy({email});
        if(user.length !== 0){
            res.status(403).json({message: "an account with that email already exists", success: false})
        } 
        else next();



    } catch(err) {
        res.status(500).json({message: "server error", err: err.message,  success: false})
    }
}


module.exports = {
    validateUser,
    generateToken,
    checkIfUserExists
};