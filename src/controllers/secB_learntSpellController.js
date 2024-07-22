const model = require ('../models/secB_learntSpellModel');

// #####################################################################################################################
// Section B (7) . POST /learn##########################################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will take the student_id and spell_id as body
// If the required data are missing, will response 400 with "Error: Missing required data"
// If the provided student_id does not exist, will response 404 with message : "Student not found"
// If spell_id 1 and 2 are provided, will responde 400 with message: `Cannot learn this spell - spell_id ${req.body.spell_id} is reserved for tournament`
// If the provided spell_id does not exist, will response 404 with message : "Spell not found"
// If the provided student_id has already learnt the provide spell_id, will response 409 with message : `The student id ${data.student_id} has already learnt the spell id ${data.spell_id}`
// Otherwise the provided student_id will be listed in the LearntSpells table as he has learned the provided spell_id on the CURRENT_TIMESTAMP time
// Response will be 201 and will display all from LearntSpells table where learnt_id = LAST_INSERT_ID();
// #####################################################################################################################
module.exports.createNewLearner1 = (req, res, next) =>
{ 
    if(req.body.student_id === undefined || req.body.spell_id === undefined)
    {
        res.status(400).send("Error: Missing required data");
        return;
    } else {
        if (req.body.spell_id === 2 || req.body.spell_id === 1) {
            res.status(400).json({message: `Cannot learn this spell - spell_id ${req.body.spell_id} is reserved for tournament`})
        } else {
            const data = {
                student_id : req.body.student_id,
                spell_id : req.body.spell_id
             }
         
             const callback = (error, results, fields) => {
                 if (error) {
                     console.error("Error createNewLearner:", error);
                     res.status(500).json({message: "Internal Server Error"});
                 } else {
                     if(results[0].length === 0) {
                         res.status(404).json({message : "Student not found"})
                     } else {
                         if (results[1].length === 0) {
                             res.status(404).json({message : "Spell not found"})
                         } else {
                             if (results[2].length >0) {
                                 res.status(409).json({message : `The student id ${data.student_id} has already learnt the spell id ${data.spell_id}`})
                             } else {
                                 next()
                             }
                         }
                     }
                 }        
             }
             model.insertLearner1(data, callback);
        }
    }
}

module.exports.createNewLearner2 = (req, res, next) =>
{ 
    const data = {
       student_id : req.body.student_id,
       spell_id : req.body.spell_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewLearner:", error);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            res.status(201).json({message : `User ${results[1][0].student_id} has successfully learnt spell ID ${results[1][0].spell_id}`});
        }
    }
   
    model.insertLearner2(data, callback);
}

// #####################################################################################################################
// Section B (8) . GET /learn/student_id/:{student_id}##################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will take the student_id as param
// If the provided student_id does not exist, will response 404 with message : "Student not found"
// If the provided student_id has not learnt any spells, will response 404 with message : `Student id ${data.id} has not learnt any spells`
// Otherwise, will display the student_id and his total damage points which is the sum of damage points of all the spells he has learnt,
//  together with the list of all the spells he learnt
// #####################################################################################################################
module.exports.readSpellsByStudentId = (req, res, next) =>
{
    const data = {
        id: req.params.student_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readSpellsByStudentId:", error);
            res.status(500).json(error);
        } else {
            if (results[0].length === 0) {
                res.status(404).json({message : "Student not found"})
            } else {
                if (results[1].length === 0) {
                    res.status(404).json({message : `Student id ${data.id} has not learnt any spells`})
                } else {
                    const spellArray = results[1];
                    const spellsOnly = spellArray.map(item => item.spell);   
                    const spellidOnly = spellArray.map(item => item.spell_id);
                    const response = {
                        user_id :results[0][0].user_id,
                        username : results[0][0].username,
                        email : results[0][0].email,
                        house : results[0][0].house,
                        student_id : data.id,
                        total_damage : results[2][0].total_damage,
                        spells : spellsOnly,
                        spell_ids : spellidOnly
                    }                 
                    res.status(200).json(response);
                }
            }}
    }

    model.selectSpellByStudentId(data, callback);
}