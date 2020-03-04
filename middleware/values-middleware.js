const valuesDB = require('../routes/values/values-model');

async function checkIfValueExists (req , res , next){

    const { value } = req.body;

    try{
        values = valuesDB.findBy(value);
        if(values.length !== 0 ) {
            res.status(403).json({message: "That value already exists", success: false});
        }
        else next();
    }catch(err){
        res.status(500).json({message: "server error", err: err.message,  success: false})
    }
}


module.exports = {

    checkIfValueExists
}