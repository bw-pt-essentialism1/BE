const db = require('../../data/dbconfig');



module.exports = {
    find,
    findBy,
    add
};


function find(){

    return db('values');
}

function findBy(value){

    return db('values').where({value}).first();
}

function add(value){

    return db('values').insert(value)
}