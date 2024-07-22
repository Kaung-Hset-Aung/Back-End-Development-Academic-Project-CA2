const model = require ('../models/taskprogressModel');

// #####################################################################################################################
// Section A (11). POST /task_progresss#################################################################################
// #####################################################################################################################
module.exports.checkUserAndTaskId = (req, res, next) =>
{
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserAndTaskId:", error);
            res.status(500).json(error);
        } else {
            if (results[0].length === 0 && results[1].length ===0) {
                res.status(404).json({
                    message : "User Id and Task Id do not exist"
                })
            } else if(results[0].length === 0) 
            {
                res.status(404).json({
                    message: "User Id does not exist"
                });
            } else if (results[1].length === 0) {
                res.status(404).json({
                    message : "Task Id does not exist"
                })
            } 
            else next();
        }
    }

    model.checkUserAndTaskbyId(data, callback);
}

module.exports.createNewTask = (req, res, next) =>
{ 
    
    if(req.body.user_id === undefined || req.body.task_id === undefined || req.body.completion_date === undefined || req.body.notes === undefined)
    {
        res.status(400).send("Error: Missing required data");
        return;
    }

    var data = {
       user_id : req.body.user_id,
       task_id : req.body.task_id,
       completion_date : req.body.completion_date,
       notes : req.body.notes
      
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            // res.status(200).json(results)
          
            res.status(200).json(results[1][0]);
        }
    }
   
    model.insertNewTask(data, callback);
}

// #####################################################################################################################
// Section A (12). GET /task_progress/{progress_id}#####################################################################
// #####################################################################################################################
module.exports.readTaskProgressById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results.length === 0) 
            {
                res.status(404).json({
                    message: "TaskProgress not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// #####################################################################################################################
// Section A (13). PUT /task_progress/{progress_id}#####################################################################
// #####################################################################################################################
module.exports.updateTaskProgressById = (req, res, next) =>
{
    if(req.body.notes === undefined)
    {
        res.status(400).json({
            message: "Error: missing required data"
        });
        return;
    }

    const data = {
      notes : req.body.notes,
      id : req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatetaskProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows === 0) 
            {
                res.status(404).json({
                    message: "taskProgress not found"
                });
            }
            else res.status(200).json(results[1][0]);
        }
    }

    model.updateTaskProgressById(data, callback);
}

// #####################################################################################################################
// Section A (14). DELETE/task_progress/{progress_id}###################################################################
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
            if(results.affectedRows === 0) 
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


// #####################################################################################################################
// CA2 | CONTROLLER FOR SELECT TASK PROGRESS BY USER ID ################################################################
// #####################################################################################################################
module.exports.readTPbyUserId = (req, res, next) =>
{
    const data = {
        id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTPbyUserId:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "_WHATEVER not found"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectTPbyUserId(data, callback);
}