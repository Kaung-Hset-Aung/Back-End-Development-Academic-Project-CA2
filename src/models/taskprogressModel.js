const pool = require('../services/db');

// #####################################################################################################################
// Section A (11). POST /task_progresss#################################################################################
// #####################################################################################################################
module.exports.checkUserAndTaskbyId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;

    SELECT * FROM Task
    WHERE task_id = ?;
    `;
    const VALUES = [data.user_id,data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertNewTask = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?);

    SELECT * FROM TaskProgress
    WHERE progress_id = LAST_INSERT_ID();

    `;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes, data.insertId];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section A (12). GET /task_progress/{progress_id}#####################################################################
// #####################################################################################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section A (13). PUT /task_progress/{progress_id}#####################################################################
// #####################################################################################################################
module.exports.updateTaskProgressById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE taskProgress
    SET  notes = ?
    WHERE progress_id = ?;

    SELECT * FROM TaskProgress 
    WHERE progress_id = ?;
    `;
    const VALUES = [data.notes, data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section A (14). DELETE/task_progress/{progress_id}###################################################################
// #####################################################################################################################
module.exports.deleteTaskById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM taskprogress
    WHERE progress_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectTPbyUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT taskProgress.progress_id, taskProgress.task_id, task.title, task.points, user.username, taskProgress.user_id, taskProgress.completion_date
    FROM taskProgress
    JOIN task ON 
        taskProgress.task_id = task.task_id
    JOIN user ON 
        taskProgress.user_id = user.user_id
    WHERE 
        taskProgress.user_id = ?;

    SELECT
    user.user_id,
    user.username,
    user.email,
    COALESCE(SUM(task.points), 0) AS total_points
    FROM
        user
    LEFT JOIN 
        taskprogress ON user.user_id = taskprogress.user_id
    LEFT JOIN 
        task ON taskprogress.task_id = task.task_id
    WHERE
        user.user_id = ?
    GROUP BY
        user.user_id, user.username, user.email;

    `;
    const VALUES = [data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}