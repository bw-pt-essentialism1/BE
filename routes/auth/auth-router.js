const express = require('express');
const auth = require('./auth-model');
const authWare = require('../../middleware/authenticate-middleware');
const bcrypt = require('bcrypt');

const router = express.Router();


router.post('/register', authWare.checkIfUserExists, async (req, res, next) => {

    const user = req.body; 
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    
    try {
        const newUser = await auth.register(user);
        res.status(201).json({message: 'user created', newUser});
    } catch(err){
        res.status(500).json({message: 'server error', err: err.message});
    }

});

router.post('/login', async (req, res) => {

    const { username, password} = req.body;

    try {
        const user = await auth.login(username);
  
        if(user && bcrypt.compareSync(password, user.password)){
            const token = authWare.generateToken(user);

            res.status(200)
                .json({message: `Welcome ${user.username}`, token});
        }
        else{
            res.status(400)
                .json({message: 'Invalid Credentials', password, user: user});
        }
    } catch(err){
        res.status(500).json({message: 'server error', err: err.message});
    }
});

module.exports = router; 

