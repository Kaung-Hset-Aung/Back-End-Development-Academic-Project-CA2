const pool = require('../services/db');

// #####################################################################################################################
// Section B (1)  POST /student#########################################################################################
// #####################################################################################################################
module.exports.selectByuserId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Student
    WHERE user_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectByIdWithPoints = (data, callback) =>
{
    const SQLSTATMENT = `
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
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Student (user_id, username, email, house)
    VALUES (?, ?, ?, ?);

    SELECT * FROM Student
    WHERE student_id = LAST_INSERT_ID();  

    `;
    const VALUES = [data.user_id, data.username, data.email , data.house];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section B (2) . GET /student#########################################################################################
// #####################################################################################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Student;
    `;

    pool.query(SQLSTATMENT, callback); 
}

// #####################################################################################################################
// Section B (3) . GET /student/:{student_id}###########################################################################
// #####################################################################################################################
module.exports.selectByStudentId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Student
    WHERE student_id = ?;

    SELECT * FROM Alumni
    WHERE student_id = ?;
    `;
    const VALUES = [data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section B (4) . GET /student/:{house}################################################################################
// #####################################################################################################################
module.exports.selectByHouse = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Student
    WHERE house = ?;
    `;
    const VALUES = [data.housename];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section B (14) . POST /student/graduate/:{student_id}################################################################
// #####################################################################################################################

module.exports.selectByIdWithPoints2 = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT
    COALESCE(SUM(task.points), 0) AS ecoPoints
    FROM
    taskprogress
    LEFT JOIN 
    task ON taskprogress.task_id = task.task_id
    WHERE
    taskprogress.user_id = ?;

    SELECT
    COALESCE(SUM(spells.damage), 0) AS damagePoints
    FROM
    LearntSpells
    JOIN
    Spells ON LearntSpells.spell_id = Spells.spell_id
    WHERE
    LearntSpells.student_id = ?;

    SELECT * FROM User
    WHERE user_id = ?


    `;
    const VALUES = [data.user_id, data.student_id, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertAlumni = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Alumni (student_id, ecoPoints, damage, total_score)
    VALUES (?, ?, ?, ?);

    `;
    const VALUES = [data.student_id, data.ecoPoints, data.damage, data.total_score];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section B (15) . GET /student/alumni#################################################################################
// #####################################################################################################################
module.exports.readAllAlumni = (callback) =>
{
    const SQLSTATMENT = `
    SELECT Alumni.*, Student.user_id, Student.username, Student.email, student.house
    FROM Alumni
    JOIN Student ON Alumni.student_id = Student.student_id;    
    `;

    pool.query(SQLSTATMENT, callback); 
}

// #####################################################################################################################
// Section B (16) . GET /student/alumni/goat############################################################################
// #####################################################################################################################
module.exports.readGOAT = (callback) =>
{
    const SQLSTATMENT = `
    SELECT 
    Alumni.alumni_id,
    Alumni.student_id,
    Student.username,
    Student.email,
    Student.house,
    Alumni.ecoPoints,
    Alumni.damage,
    Alumni.total_score
    FROM Alumni
    JOIN Student ON Alumni.student_id = Student.student_id
    ORDER BY Alumni.total_score DESC
    LIMIT 1;
     
    `;

    pool.query(SQLSTATMENT, callback); 
}
