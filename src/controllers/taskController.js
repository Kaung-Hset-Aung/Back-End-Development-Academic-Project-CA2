const model = require ('../models/taskModel');

// #####################################################################################################################
// Section A (6) . POST /tasks##########################################################################################
// #####################################################################################################################
module.exports.createNewTask = (req, res, next) =>
{ 
    
    if(req.body.title === undefined || req.body.description === undefined || req.body.points === undefined)
    {
        res.status(400).send("Error: Missing required data");
        return;
    }

    const data = {
       title : req.body.title,
       description : req.body.description,
       points : req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            const resultId = results.insertId;
            req.resultId = resultId;
            next();
        }
    }
   
    model.insertTask(data, callback);
}

module.exports.readTaskbyId201= (req, res, next) => 
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
            else res.status(201).json(results[0]);
        }
    }

    model.selectTaskById(data, callback);
}

// #####################################################################################################################
// Section A (7) . GET /tasks###########################################################################################
// #####################################################################################################################
module.exports.readAllTasks = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTasks:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// #####################################################################################################################
// Section A (8) . GET /tasks/{task_id}#################################################################################
// #####################################################################################################################
module.exports.readTaskById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectTaskById(data, callback);
}

// #####################################################################################################################
// Section A (9) .  PUT /tasks/{task_id}################################################################################
// #####################################################################################################################
module.exports.updateTaskById = (req, res, next) =>
{
    if(req.body.title === undefined || req.body.description === undefined || req.body.points === undefined)
    {
        res.status(400).json({
            message: "Error: missing required data"
        });
        return;
    }

    const data = {
        title : req.body.title,
        description : req.body.description,
        points : req.body.points,
        id : req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows === 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[1][0]);
        }
    }

    model.updateTaskById(data, callback);
}

// #####################################################################################################################
// Section A (10) . DELETE /tasks/{task_id}#############################################################################
// #####################################################################################################################
module.exports.deleteTaskById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows === 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(204).send();            
        }
    }

    model.deleteTaskById(data, callback);
}
