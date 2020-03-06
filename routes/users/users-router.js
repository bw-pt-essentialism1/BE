const express = require('express');
const usersModel = require('./users-model');

const router = express.Router();

router.get('/', async (req, res) => {

    try{
        const users = await usersModel.find()
        res.status(200).json({users});
    }catch(err){
        res.status(500).json({message: 'server error', err: err.message});
    }
});

router.put('/', async (req, res, next) => {

    const user = req.body;

    try{
        const updatedUser = await usersModel.update(user);
        res.status(200).json({updatedUser});
    }catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }
});

router.delete('/', async(req, res) => {

    const { username } = req.body;

    try{
        const removed = await usersModel.remove(username)
        res.status(204).json({message: 'account deleted', success: true, removed});
    }
    catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }

});

router.get('/uservalues', async (req, res) => {

    const { id } = req.body;

    try{
        const values = await usersModel.getValues(id);
        const favoriteValues = await usersModel.getFavoriteValues(id);

        const valueObj = { favoriteValues, values};

        res.status(200).json({success: true, values: valueObj});
    }catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }
});

router.post('/uservalues', async (req , res) => {

    const user_values = req.body;
    
    try{
        const newUserValue = await usersModel.addValue(user_values);
        res.status(201).json({message: 'value added', success: true, newUserValue})
    }catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }

});

router.post('/favoritevalues', async (req, res) => {

    const user_favorite_values = req.body;
    const { value_id, user_id } = req.body;
    try{
        let removedValue = false;
        const checkedValue = await usersModel.getValue({value_id, user_id});

        if(checkedValue) {
            removedValue = await usersModel.deleteValue({value_id, user_id});
        } else removedValue = true;

        if(removedValue){
            const newFavoriteValue = await usersModel.addFavoriteValue(user_favorite_values);
            res.status(201).json({message: ' favorite value added', success: true, newFavoriteValue})
        }
    }catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }
});

router.delete('/uservalues', async (req, res) => {

    const userValue = req.body;

    try{
        removedValue = await usersModel.deleteValue(userValue);
        res.status(204).json({success: true, removedValue})
    }catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }
});

router.delete("/favoriteValues", async (req ,res) => {

    const { user_id, value_id } = req.body;
    
    try{
        removedValue = await usersModel.removeFavoriteValue({user_id, value_id});
        addedValue = await usersModel.addValue({user_id, value_id});

        res.status(204).json({success: true, removedValue})
    }catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }
});


router.post('/projects', async (req, res) => {

    const { title, description, user_id, values } = req.body;
    
    
    try{        
       let addedValueArray = [];
       const createdProject = await usersModel.addProject({title, description, user_id});
       console.log(createdProject);
       if (values.length > 0){
           for(let i = 0; i < values.length; i++){
               
               const addedValue = await usersModel.addProjectValue({value_id: values[i].id, project_id: createdProject[0]});
               addedValueArray.push(values[i].name);
           }
       }

       const project = {...createdProject, values: addedValueArray};

       res.status(201).json({success: true, project});

    }catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }
});

router.get('/projects', async (req ,res) => {

    const { user_id } = req.body; 

    try{
        const projects = await usersModel.getProjects({user_id});
        const output = [];
        projects.forEach( (project, index) => {
            const outputIndex = output.findIndex(outputProject => {
                return outputProject.id === project.id
            });
            if(outputIndex === -1){
                output.push({
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    values: []
                });
                output[output.length - 1].values.push({
                    id: project.v_id,
                    value: project.value
                });
            }
            else{
                output[outputIndex].values.push({
                    id: project.v_id,
                    value: project.value
                });
            }
        });
        
        res.status(200).json({success: true, projects: output});
    }catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }
});

router.delete('/projects', async (req , res) => {

    const { id } = req.body;
    
    try{
        deletedProject = await usersModel.deleteProject({id})
        res.status(200).json({success: true, message: "project deleted"});
    }catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }
});

router.post('/projects/values', async (req, res ) => {

    const { project_id, value_id} = req.body;

    try{
        
        addedValue = await usersModel.addProjectValue({project_id, value_id});
        res.status(201).json({success: true, message: "value added"});
    }catch(err){
        res.status(500).json({message: 'server error', err: err.message, success: false});
    }
});

router.delete('/projects/values', async (req, res) => {

        const {project_id, value_id} = req.body;
    
        try{

            removedValue = await usersModel.removeProjectVAlue({project_id, value_id});
            res.status(204).json({success: true, message: "value deleted"});

        }catch(err){
            res.status(500).json({message: 'server error', err: err.message, success: false});
        }
});


module.exports = router; 