const model = require ('../models/secB_tournamentModel');

// #####################################################################################################################
// Section B (9) . POST /tournament/registration/:{student_id}###########################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will take the student_id as param
// If the required data are missing, will response 400 with "Error: Missing required data"
// If the provided student_id does not exist, will response 404 with message : "Student not found"
// If the provided student_id has already registered for the tournament, will response 409 with message : "Student has already registered for the tournament"
// If the provided student_id has damage level less than 10, will response 400 with message : `Student id ${data.id} is not eligible for the tournament because damage is lower than 10`
// Otherwise will list the student_id into registration table along with his assigned house plus total ecoPoints and  total damage points as of registration time
// Response will be 201 and will display {message : `Tournament registration of student id ${data.student_id} successful!`,
//                                        registration_id : results.insertId}
// #####################################################################################################################
module.exports.applyForTournament = (req, res, next) =>
{
    if (req.params.student_id === undefined ) {
        res.status(400).send("Error: Missing required data");
        return;
    }

    const data = {
        id: req.params.student_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error applyForTournament:", error);
            res.status(500).json(error);
        } else {
            if (results[0].length === 0) {
                res.status(404).json({message : "Student not found"})
            } else {
                if (results[1].length != 0) {
                    res.status(409).json({message : "Student has already registered for the tournament"})
                } else {
                    if (results[2][0].total_damage < 10) {
                        res.status(400).json({message : `Student id ${data.id} is not eligible for the tournament because damage is lower than 10`})
                    } else {
                        req.house = results[0][0].house;               
                        req.total_damage = results[2][0].total_damage;   
                        req.user_id = results[0][0].user_id
                       next()
                        }
                    }
                }
            }
    }
    model.apply1(data, callback);
}

module.exports.getEcoPoints= (req, res, next) =>
{
    const data = {
        id: req.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByIdWithPoints", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                req.ecoPoint = results[0].total_points
                next()};
        }
    }

    model.selectByIdWithPoints(data, callback);
}

module.exports.createNewregistration = (req, res, next) =>
{ 

    const data = {
       student_id : req.params.student_id,
       house : req.house,
       damage : req.total_damage,
       ecoPoint : req.ecoPoint
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewregistration:", error);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            // res.status(200).json(results)
            res.status(201).json({message : `Tournament registration of student id ${data.student_id} successful!`,
        registration_id : results.insertId});
        }
    }
   
    model.apply2(data, callback);
}

// #####################################################################################################################
// Section B (10) . DELETE /tournament/registration/:{registration_id}##################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will take the registration_id as param
// If the required data are missing, will response 400 with "Error: Missing required data"
// If the provided registration_id does not exist, will response 404 with message : "registration not found"
// Otherwise, will delete the provided applicaiton_id from the "registration" table
// #####################################################################################################################
module.exports.deleteRegistrationById = (req, res, next) =>
{
    const data = {
        id: req.params.registration_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteRegistrationById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows === 0) 
            {
                res.status(404).json({
                    message: "Registration not found"
                });
            }
            else res.status(200).json({message : `Registration id ${data.id} has been removed`});       
        }
    }

    model.deleteRegistrationById(data, callback);
}

// #####################################################################################################################
// Section B (11) . GET/tournament/registration#########################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will display all registered students from "Registration" table
// #####################################################################################################################
module.exports.readAllRegistrations = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllRegistrations:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// #####################################################################################################################
// Section B (12) . GET/tournament/registration/:{registration_id}######################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will display all registered students from "Registration" table where registration_id = req.params.registration_id
// #####################################################################################################################
module.exports.readByRegistrationId = (req, res, next) =>
{
    const data = {
        id: req.params.registration_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readByRegistrationId:", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "Registration not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// #####################################################################################################################
// Section B (13) . POST/tournament/p1/:{student_id1}/p2/:{student_id2}#################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will take the student_id1 and student_id2 as params
// If one or both of the students is/are not registered for tournament, will response 404 with message : `Student id ${data.player_id} is not registered to be in the tournament`
// If p1_id student_id1 and student_id2 are provided the same, will response 400 with message : `Cannot compete oneself`
// If both students are from the same house, will response 400 with `Both students are from ${req.p1_house}! Students of the same house are not allowed to compete`);
// Otherwise, will compare player1 and player2 based on their ecoPoints gained by doing tasks in Section A, and damage points gained by learning spells in Section B
// EcoPoints will weight 30% and damage will weight 70% regarding the comparism and will POST all tournament data into "tournament" table
// In the case where one of the players have more points,#####################
// Will POST id, ecopoints and damage of the two players along with the winner_id into tournament table
// Will POST the spell_id : 1 (For winning ; 10 damage points) to learntSpell table for the winning player_id
// Will POST the spell_id : 2 (For participating; 5 damage points) to learntSpell table for the losing player_id
// In the case where the compare points are equavalent,#######################
// Will POST id, ecopoints and damage of the two players along with the winner_id as 0 into tournament table
// Will POST the spell_id : 2 (For participating; 5 damage points) to learntSpell table for both players
// In both cases #############################################################
// Will delete the two players from the "registration" table after the tournament because the ecopoints and damage points were taken as of the regisration time
// Considering a player will upgrade himself in terms of both ecoPoints and Damage points before next tournament, that a new register for him with his new ecopoints and damage points is allowed
// #####################################################################################################################
module.exports.checkRegister = (req, res, next) => {
    const data = {
        player1_id: req.params.student_id1,
        player2_id: req.params.student_id2
    };

    const handleError = (statusCode, message) => {
        res.status(statusCode).json({ message });
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkRegister:", error);
            return handleError(500, error);
        }

        if (results[0].length === 0 || results[1].length === 0) {
            const missingPlayer = results[0].length === 0 ? data.player1_id : data.player2_id;
            return handleError(404, `Student id ${missingPlayer} is not registered to be in the tournament`);
        }

        const [player1, player2] = results.map(result => result[0]);

        req.p1_house = player1.house;
        req.p1_ecopoints = player1.ecoPoint;
        req.p1_damage = player1.damage;
        req.p1_Rid = player1.registration_id;
        req.p2_house = player2.house;
        req.p2_ecopoints = player2.ecoPoint;
        req.p2_damage = player2.damage;
        req.p2_Rid = player2.registration_id;

        if (req.p1_Rid === req.p2_Rid) {
            return handleError(400, `Cannot compete oneself`);
        }
        if (req.p1_house === req.p2_house) {
            return handleError(400, `Both students are from ${req.p1_house}! Students of the same house are not allowed to compete`);
        }


        const p1Score = 0.3 * req.p1_ecopoints + 0.7 * req.p1_damage;
        const p2Score = 0.3 * req.p2_ecopoints + 0.7 * req.p2_damage;

        if (p1Score > p2Score) {
            req.better_player = data.player1_id;
            req.participant = data.player2_id;
            req.spell1 = 1;
            req.spell2 = 2;
        } else if (p1Score < p2Score) {
            req.better_player = data.player2_id;
            req.participant = data.player1_id;
            req.spell1 = 2;
            req.spell2 = 1;
        } else {
            // req.tie1 = data.player1_id;
            // req.tie2 = data.player2_id;
            req.spell1 = 2;
            req.spell2 = 2;
            // return res.status(200).json({ message: "It's a Tie! No points are awareded" });
        }

        next();
    };

    model.tournament1(data, callback);
};


module.exports.tournamentrecord = (req, res, next) =>
{ 
    const data = {
       player1_id : req.params.student_id1,
       player1_EcoPoint : req.p1_ecopoints,
       player1_Damage : req.p1_damage,
       spell1 : req.spell1,
       player2_id : req.params.student_id2,
       player2_EcoPoint : req.p2_ecopoints,
       player2_Damage : req.p2_damage,
       spell2 : req.spell2,
       better_player : req.better_player || 0,
       participant : req.participant,
    //    tie1 : req.player1_id,
    //    tie2 : req.player2_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error tournamentrecord:", error);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            if (data.better_player != 0) {
                const response = {message :`Tournament complete! The winner is student ${data.better_player}.
                Student ${data.better_player} has been awarded 10 damage points for winning. 
                Student ${data.participant} has been awarded 5 damage points for participation`
            }
                res.status(201).json(response);

            } else {
                return res.status(200).json({ message: "It's a Tie! 5 points are awareded to each player" });                
            }
            // res.status(200).json(results)
        }
    }
   
    model.insertTournament(data, callback);
}

// #####################################################################################################################
// CA2 | CONTROLLER FOR GET all tournament records #####################################################################
// #####################################################################################################################
module.exports.readAllrecords = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllrecords:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAllTRecs(callback);
}