const pool = require('../services/db');

// #####################################################################################################################
// Section A (6) . POST /tasks##########################################################################################
// #####################################################################################################################
module.exports.insertTask = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?);

    `;
    const VALUES = [data.title, data.description, data.points];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectTaskById = (data, callback) => //also used in task 8
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section A (7) . GET /tasks###########################################################################################
// #####################################################################################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task;
    `;

    pool.query(SQLSTATMENT, callback); 
}

// #####################################################################################################################
// Section A (8) . GET /tasks/{task_id}#################################################################################
// #####################################################################################################################
//re-use the model from task 6 

// #####################################################################################################################
// Section A (9) .  PUT /tasks/{task_id}################################################################################
// #####################################################################################################################
module.exports.updateTaskById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Task
    SET title = ?, description = ?, points = ?
    WHERE task_id = ?;

    SELECT * FROM Task 
    WHERE task_id = ?;
    `;
    const VALUES = [data.title, data.description, data.points, data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section A (10) . DELETE /tasks/{task_id}#############################################################################
// #####################################################################################################################
module.exports.deleteTaskById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Task
    WHERE task_id = ?;

    DELETE FROM TaskProgress
    WHERE task_id = ?

    `;
    const VALUES = [data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
