const pool = require('../services/db');

// #####################################################################################################################
// Section A (1)  POST /users###########################################################################################
// #####################################################################################################################
module.exports.selectByEmail = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE email = ?;
    `;
    const VALUES = [data.email, data. username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.doesusernameExist = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertuser = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);
    `;
    const VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section A (2)  GET /users###########################################################################################
// #####################################################################################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT user_id, username, email FROM User
    `;

    pool.query(SQLSTATMENT, callback); 
}

// #####################################################################################################################
// Section A (3)  GET /users/{user_id}##################################################################################
// #####################################################################################################################
module.exports.selectByIdWithPoints = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT
    user.user_id,
    user.username,
    user.email,
    student.student_id,
    COALESCE(SUM(task.points), 0) AS total_points
FROM
    user
LEFT JOIN 
    taskprogress ON user.user_id = taskprogress.user_id
LEFT JOIN 
    task ON taskprogress.task_id = task.task_id
LEFT JOIN 
    student ON user.user_id = student.user_id
WHERE
    user.user_id = ?
GROUP BY
    user.user_id, user.username, user.email, student.student_id;


    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section A (4)  PUT /users/{user_id}##################################################################################
// #####################################################################################################################
module.exports.selectByNameAndEmail = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User 
    WHERE username = ?;

    SELECT * FROM User
    WHERE email = ?;

    `;
    const VALUES = [data.username, data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE User
    SET username = ?, email = ?
    WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.email,data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section A (5)  . DELETE /users/{user_id}#############################################################################
// #####################################################################################################################
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM User
    WHERE user_id = ?;

    DELETE FROM taskProgress 
    WHERE  user_id = ?;

    DELETE FROM student
    WHERE user_id = ?
     
    `;
    const VALUES = [data.id,data.id,data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// CA2 | MODEL##### FOR LOG IN #########################################################################################
// #####################################################################################################################
module.exports.selectByIdforlogin = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// CA2 | MODEL##### FOR LOG IN #########################################################################################
// #####################################################################################################################
module.exports.selectPasswordByUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}