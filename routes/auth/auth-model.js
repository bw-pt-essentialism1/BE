const db = require('../../data/dbconfig');

module.exports = {
    register,
    login, 
    findBy
}


function register(user){

    return db('users').insert(user);
}

function login(username){

    return db('users').where({username}).first();
}

function findBy(attribute){

    const key = Object.keys(attribute)[0];

    return db('users').where({[key]: attribute[key]});
}