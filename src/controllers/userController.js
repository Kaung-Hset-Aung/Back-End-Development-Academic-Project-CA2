const model = require ('../models/userModel');

// #####################################################################################################################
// Section A (1)  POST /users###########################################################################################
// #####################################################################################################################
module.exports.checkByEmail= (req, res, next) =>
{
    const data = {
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readByEmail:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                if (results[0].username != req.body.username) {
                    res.status(409).json({
                        message: "Provided email is already associated with a user"
                    });
                } else {
                    res.status(409).json({ message: "User already exists" });
                }
            } else {
                next();
            }
            
        }
    }

    model.selectByEmail(data, callback);
}

module.exports.readbyusernameexistance = (req, res, next) =>
{
    const data = {
        username : req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readbyusernameexistance:", error);
            res.status(500).json(error);
        } else {
            if(results.length > 0) 
            {
                res.status(404).json({
                    message: "Username already exist. Please select a unique username"
                });
            }
            else next();
        }
    }

    model.doesusernameExist(data, callback);
}

module.exports.createNewUser = (req, res, next) =>
{ 
    
    // if(req.body.username === undefined || req.body.email === undefined || req.body.password === undefined)
    // {
    //     res.status(400).send("Error: Missing required data");
    //     return;
    // }

    const data = {
       username : req.body.username,
       email : req.body.email,
       password : res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json({messemail: "Internal Server Error"});
        } else {
            const resultId = results.insertId;
            req.resultId = resultId;
            res.locals.userId = resultId
            next();
        }
    }
   
    model.insertuser(data, callback);
}

module.exports.readUserbyId201= (req, res, next) => 
{
    const data = {
        id: req.resultId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(201).json({message : `New user successfully created with UserId: ${results[0].user_id}`, Username: `${results[0].username}`, token: `${res.locals.token}`});
            ;
        }
    }

    model.selectById(data, callback);
}

// #####################################################################################################################
// Section A (2)  GET /users############################################################################################
// #####################################################################################################################
module.exports.readAllUser= (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// #####################################################################################################################
// Section A (3)  GET /users/{user_id}##################################################################################
// #####################################################################################################################
module.exports.readUserbyIdWithPoints= (req, res, next) =>
{
    const data = {
        id: req.params.id
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
            else res.status(200).json(results[0]);
        }
    }

    model.selectByIdWithPoints(data, callback);
}

// #####################################################################################################################
// Section A (4)  PUT /users/{user_id}##################################################################################
// #####################################################################################################################
module.exports.checkByNameAndEmail= (req, res, next) =>
{
    const data = {
        username : req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking username and email:", error);
            res.status(500).json(error);
        } else {
            if (results[0].length > 0 && results[0][0].user_id != req.params.id && results[1].length > 0 && results[1][0].user_id != req.params.id) {
                res.status(409).json({
                    message: `Provided username is already associated with another user, userID ${results[0][0].user_id} and provided email is already associated with user, userID ${results[1][0].user_id}`
                });
            } else if (results[0].length > 0 && results[0][0].user_id != req.params.id) {
                res.status(409).json({
                    message: `Provided username is already associated with another user, userID ${results[0][0].user_id}`
                });
            } else if (results[1].length > 0 && results[1][0].user_id != req.params.id) {
                res.status(409).json({
                    message: `Provided email is already associated with another user, userID ${results[1][0].user_id}`
                });
            } else {
                 originalusername = (results[0][0] && results[0][0].username) || (results[1][0] && results[1][0].username);
                req.originalusername = originalusername

                 originalemail = (results[0][0] && results[0][0].email) || (results[1][0] && results[1][0].email)
                req.originalemail = originalemail
                next();
            }
        }
    };
    model.selectByNameAndEmail(data, callback);
}

module.exports.updateUserById = (req, res, next) =>
{
    if(req.body.username === null && req.body.email === null)
    {
        res.status(400).json({
            message: "Error: missing required data"
        });
        return;
    }

    // if (req.body.username === null) {req.body.username = req.originalusername}
    // if (req.body.email === null) {req.body.email = req.originalemail}  


    const data = {
        username: req.body.username !== undefined ? req.body.username : req.originalusername,
        email: req.body.email !== undefined ? req.body.email : req.originalemail,
        user_id: req.params.id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows === 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                const resultId = req.params.id 
                req.resultId = resultId
                next();}
        }
    }

    model.updateById(data, callback);
}
module.exports.readUserbyId200= (req, res, next) => 
{
    const data = {
        id: req.resultId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// #####################################################################################################################
// Section A (5)  . DELETE /users/{user_id}#############################################################################
// #####################################################################################################################
module.exports.deleteUserById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows === 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send();           
        }
    }

    model.deleteById(data, callback);
}


// #####################################################################################################################
// CA2 | CONTROLLER FOR LOG IN #########################################################################################
// #####################################################################################################################
module.exports.login = (req, res, next) =>
{
    const data = {
        username : req.body.username,
        password : req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                res.locals.hash = results[0].password;
                res.locals.userId = results[0].user_id;
                next();
            };
        }
    }

    model.selectByIdforlogin(data, callback);
}

// #####################################################################################################################
// CA2 | CONTROLLER FOR GET HASH PASSWORD ##############################################################################
// #####################################################################################################################
module.exports.readPASSById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPASSById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "PASS not found"
                });
            }
            else {
                res.locals.hash = results[0].password;
                res.locals.userId = results[0].user_id;
                next();
            }
        }
    }

    model.selectPasswordByUserId(data, callback);
}