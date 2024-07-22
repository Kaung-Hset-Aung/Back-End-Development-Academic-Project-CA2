const model = require ('../models/secB_studentModel');
const houseList = ['Asile_Tea','Triple_Aye','Issac_Emp']
// #####################################################################################################################
// Section B (1)  POST /student#########################################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Body will take user_id eg.{user_id : 1} 
// Will check the following:
// If provided user_id is already a student, will response 409 conflict with message: "User is already enrolled as a student"
// If user_id is not defined in the body, will response 400 with "Error: "Missing required data"
// If provided user_id does not exist, will response 404 with message: "User not found"
// Otherwise, continue
// Will check the total_points gained by the provided user_id from the "taskProgress" table
// Only the user who did tasks and have earned points in the past will be allowed to admission as a student
// And if the user has no points, admission to the school will be rejected
// The user who are accepted as stuents will be randomly assigned to one of the three SOC inspired houses
// 'Asile Tea'- inspired by DIT ,'Triple Aye'- inspired by DAAA (D triple A) or 'Issac Emp'- inspired by DISM
// const houseList = ['Asile Tea','Triple Aye','Issac Emp']
// #####################################################################################################################

module.exports.readStudentByUserId = (req, res, next) =>
{
    if(req.body.user_id === undefined)
    {
        res.status(400).send("Error: Missing required data");
        return;
    }

    const data = {
        id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readStudentById:", error);
            res.status(500).json(error);
        } else {
            if(results.length != 0) 
            {
                res.status(409).json({
                    message: "User is already enrolled as a student"
                });
            }
            else 
            next();
        }
    }

    model.selectByuserId(data, callback);
}
module.exports.readUserbyIdWithPoints= (req, res, next) =>
{

    const data = {
        user_id: req.body.user_id
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
            } else if (results[0].total_points === 0 ) {
                res.status(400).json({
                    message : "Users with no eco points are not eligible for admission",
                })

            } else {
            req.username = results[0].username;
            req.email = results[0].email
            next();
            // res.status(200).json(results)
        }
        }
    }

    model.selectByIdWithPoints(data, callback);
}

module.exports.createNewStudent = (req, res, next) =>
{ 
    function getRandomNumber() {
    const randomNumber = Math.random() * 3;
    const randomInteger = Math.floor(randomNumber);
    return randomInteger;
    }
    const houseid = getRandomNumber();
    // const houseList = ['Asile_Tea','Triple_Aye','Issac_Emp']
    const housename = houseList[houseid]

    const data = {
        user_id : req.body.user_id,
        username : req.username,
        email : req.email,
        house : housename
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewStudent:", error);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            res.status(200).json({message : `Admission successsful! You have been assigned to ${results[1][0].house}`})
            // res.status(201).json({message : "New Student Created Successfully"});
        }
    }
   
    model.insertSingle(data, callback);
}

// #####################################################################################################################
// Section B (2) . GET /student#########################################################################################
// #####################################################################################################################
// TASK DESCRIPTION
// 
// Will display all the students in the 'Student' table
// #####################################################################################################################
module.exports.readAllStudents = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllStudents:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// #####################################################################################################################
// Section B (3) . GET /student/:{student_id}###########################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will take student_id as a param 
// If the provided student_id does not exist, response 404 with message: "Student not found"
// Otherwise, display all from table Student where the student_id is equal to the taken param
// #####################################################################################################################
module.exports.readStudentById = (req, res, next) =>
{
    const data = {
        id: req.params.student_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readStudentById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].length === 0) 
            {
                res.status(404).json({
                    message: "Student not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectByStudentId(data, callback);
}


// #####################################################################################################################
// Section B (4) . GET /student/house/:{house}##########################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will take the housename as a param
// If the provied housename is not included in the randomized house list, will response 404 with message : 'Invalid House'
// If there are no students with the provide housename, will response 404 with  message: `No Students under ${req.params.housename}`
// Otherwise, will diaplay all from table Student where the house is equal to the taken param
// #####################################################################################################################
module.exports.readStudentByHouse = (req, res, next) =>
{
    const requestedHouseName = req.params.housename;

    if (!houseList.includes(requestedHouseName)) {
        res.status(400).send("Error: Invalid house");
    }
    else {
    const data = {
        housename: req.params.housename
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readStudentByHouse:", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message : `No students under ${req.params.housename}`
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectByHouse(data, callback);}
}

// #####################################################################################################################
// Section B (14) . POST /student/graduate/:{student_id}################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will take the student_id as a param
// If the provided student_id does not exist, will response 404 with  message: "Student not found"
// If the provided student_id has (30% of ecoPoints + 70% of damage points) < 50, proposal for graduation will be denied
// If the provided student_id has (30% of ecoPoints + 70% of damage points) > 50 , proposal for graduation will be accepted
// student_id, ecoPoints, damage and total_score will be posted to the "Alumni" table
// #####################################################################################################################
module.exports.check_student = (req, res, next) =>
{
    const data = {
        id: req.params.student_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking student:", error);
            res.status(500).json(error);
        } else {
            if(results[0].length === 0) 
            {
                res.status(404).json({
                    message: "Student not found"
                });
            }
            else {
                if (results[1].length != 0) {
                    res.status(409).json({message: 'Student already graduated'})
                }else {
                    req.user_id = results[0][0].user_id
                    next()
                }
            } ;
        }
    }

    model.selectByStudentId(data, callback);
}

module.exports.getEcoPointsAndDamage= (req, res, next) =>
{
    const data = {
        user_id: req.user_id,
        student_id : req.params.student_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByIdWithPoints", error);
            res.status(500).json(error);
        } else {
            if(results[0].length === 0 && results[1]) {
                res.status(404).json({message: "Ecopoints and Damage not found"})
            } else {
                if (results[0][0].length === 0 ) {
                res.status(404).json({message: "Ecopoints not found"})}
                else {
                    if (results[1][0].damagePoints === 0) {
                        res.status(400).json({message: "Student do not pass the graduation criteria because 0 damage points"})
                    }
                    else {
                        req.ecoPoints = results[0][0].ecoPoints
                        req.damagePoints = results[1][0].damagePoints
                        const resultscore = parseInt((0.3* req.ecoPoints) + (0.7 * req.damagePoints))
                        req.total_score = resultscore

                        if ((resultscore) < 50) {
                            // res.status(200).json(results)
                            res.status(400).json({message : `Sorry, ${results[2][0].username.toUpperCase()}. You have only ${resultscore} graduation score points. Less than 50 cannnot graduate `})
                            } else if(resultscore >= 50) {
                                next()
                            }
                    };
                    }
                }
        }
    }

    model.selectByIdWithPoints2(data, callback);
}

module.exports.graduation = (req, res, next) =>
{ 

    const data = {
       student_id : req.params.student_id,
       ecoPoints : req.ecoPoints,
       damage : req.damagePoints,
       total_score : req.total_score
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error graduation:", error);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            // res.status(200).json(results)
            const grad_id = results.insertId
            res.status(201).json({message : `Congratulations! Student ${req.params.student_id} has ${data.total_score} graduation points and been graduated with graduation_id ${grad_id} from THE MAGIC ACADEMY`});
        }
    }
   
    model.insertAlumni(data, callback);
}

// #####################################################################################################################
// Section B (15) . GET /student/alumni#################################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// Will diaplay the list of graduated students (Magic Academy's Alumni list)
// #####################################################################################################################
module.exports.readAllAlumni = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllAlimni:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.readAllAlumni(callback);
}

// #####################################################################################################################
// Section B (16) . GET /student/alumni/goat############################################################################
// #####################################################################################################################
// TASK DESCRIPTION
//
// To find the GREATEST OF ALL TIME
// Will display all information of the alumni whose total_score is the highest as of current time.
// #####################################################################################################################
module.exports.readGOAT = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readGOAT:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.readGOAT(callback);
}