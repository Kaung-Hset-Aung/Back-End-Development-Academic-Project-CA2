const model = require ('../models/secB_spellsModel');

// #####################################################################################################################
// Section B (5) . GET /spells##########################################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will take user_id as body
// If the body is missing, response 400 with "Error: Please indicate your user_id in body"
// If the provided user_id does not exist, will response 404 with message : "User does not exist"
// If the provided user_id exist but not enrolled as student, will response 404 with message : "Provided user is not a student. Only students are accessible to the full list of spells"
// Otherwise, read all data from "Spells" table
// #####################################################################################################################
module.exports.readAllSpells = (req, res, next) =>
{
    

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllSpells:", error);
            res.status(500).json(error);
        } 
        else {
         
                res.status(200).json(results);
            }
    }

    model.selectAllSpells(callback);
}

// #####################################################################################################################
// Section B (6) . GET /spells/:{id}####################################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will take spell_id as a param 
// If the provided spell_id does not exist, will response 404 with message: "spell not found"
// Otherwise, display all from table spell where the spell_id is equal to the taken param
// #####################################################################################################################
module.exports.readSpellsById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readSpellsById:", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "Spell not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectSpellsById(data, callback);
}
