const db = require('../../data/dbconfig');

module.exports = {

    find, 
    remove, 
    update,
    getValue, 
    addValue,
    addFavoriteValue,
    getValues,
    getFavoriteValues,
    deleteValue,
    removeFavoriteValue,
    getProjects,
    addProject,
    addProjectValue,
    deleteProject
}

function find(){

    return db('users');
}

function remove(username){
    return db('users').where({username}).del();
}

function update(user){

    keys = Object.keys(user);

    return db('users').where({username: user.username}).update(user, keys);
}

function addValue(userValue){

    return db('user_values')
    .returning('value_id')
    .insert(userValue);
}

function addFavoriteValue(userValue) {

    return db('user_favorite_values')
    .returning('value_id')
    .insert(userValue);
}

function getValues(user_id){

    return db('user_values as uv')
            .where({user_id})
            .join('values as v', 'v.id', '=', 'uv.value_id' )
            .select('v.value', 'v.id');
}

function getValue(userValue){

    return db('user_values').where(userValue).first();
}

function deleteValue(userValue){
    
    return db('user_values').where(userValue).del();
}

function getFavoriteValues(user_id){

    return db('user_favorite_values as ufv')
            .where({user_id})
            .join('values as v', 'v.id', '=', 'ufv.value_id')
            .select('v.id','v.value', 'ufv.text');

}

function removeFavoriteValue(userFavoriteValue){

    return db('user_favorite_values')
                .where(userFavoriteValue)
                .del();
}

function addProject(project){

    return db('projects')
    .returning('id', 'title', 'description')
    .insert(project);
};

function addProjectValue(projectValue){

    return db('project_values')
    .returning('value_id')
    .insert(projectValue);
}

function getProjects(user_id){
    return db('projects as p')
            .where({user_id})
            .join('project_values as pv', 'pv.project_id', '=', "p.id")
            .join('values as v', 'v.id', '=', 'pv.value_id')
            .select('p.id', 'p.title', 'p.description', 'v.id as v_id', 'v.value',)


}

function deleteProject(id){

    return db('projects').where(id).del();
}