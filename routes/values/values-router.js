const express = require('express');
const valuesDB = require('./values-model');
const valueWare = require('../../middleware/values-middleware');

const router = express.Router();


router.get('/', async (req, res) => {

    try{
        values = await valuesDB.find();
        res.status(200).json({values, success: true})
    } catch(err){
        res.status(500).json({err: err.message, success: false});
    }
});

router.post('/', valueWare.checkIfValueExists, async (req, res) => {
    
    const { value } = req.body
    
    try{
        await valuesDB.add(value)
        res.status(201).json({success: true, message: 'value added'});
    }catch(err){
        res.status(500).json({err: err.message, success: false});
    }
});

module.exports = router; 
