const pool = require('../services/db');

// #####################################################################################################################
// Section B (9) . POST /tournament/registration/:{student_id}###########################################################
// #####################################################################################################################

module.exports.apply1 = (data, callbackk) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Student
    WHERE student_id = ?;

    SELECT * FROM registration 
    WHERE student_id = ?;

    SELECT
    SUM(Spells.damage) AS total_damage
    FROM
    LearntSpells
    JOIN
    Spells ON LearntSpells.spell_id = Spells.spell_id
    WHERE
    LearntSpells.student_id = ?;
    
    `;
    const VALUES = [data.id, data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callbackk);
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
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.apply2 = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO registration (student_id, house, damage, ecoPoint)
    VALUES (?, ?, ?, ?);

    `;
    const VALUES = [data.student_id, data.house, data.damage, data.ecoPoint];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section B (10) . DELETE /tournament/registration/:{registration_id}##################################################
// #####################################################################################################################
module.exports.deleteRegistrationById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Registration
    WHERE registration_id = ?;

    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section B (11) . GET/tournament/registration#########################################################################
// #####################################################################################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT Registration.*, Student.username, Student.user_id
    FROM Registration
    JOIN Student ON Registration.student_id = Student.student_id;
    `;

    pool.query(SQLSTATMENT, callback); 
}

// #####################################################################################################################
// Section B (12) . GET/tournament/registration/:{registration_id}######################################################
// #####################################################################################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Registration 
    WHERE registration_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section B (13) . POST/tournament/p1/:{student_id1}/p2/:{student_id2}#################################################
// #####################################################################################################################
module.exports.tournament1 = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Registration
    WHERE student_id = ?;

    SELECT * FROM Registration
    WHERE student_id = ?;
    `;
    const VALUES = [data.player1_id, data.player2_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertTournament = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Tournament (player1_id, player1_EcoPoint, player1_Damage, player2_id, player2_EcoPoint, player2_Damage, winner_id)
    VALUES (?, ?, ?, ?, ?, ?, ?);

    INSERT INTO LearntSpells (student_id, spell_id)
    VALUES (?, ?);

    INSERT INTO LearntSpells (student_id, spell_id)
    VALUES (?, ?);

    DELETE FROM Registration
    WHERE student_id = ?;

    DELETE FROM Registration
    WHERE student_id = ?;

    `;
    const VALUES = [data.player1_id, data.player1_EcoPoint, data.player1_Damage, data.player2_id, data.player2_EcoPoint, data.player2_Damage, data.better_player, data.player1_id, data.spell1, data.player2_id, data.spell2, data.player1_id, data.player2_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// CA2 | MODEL FOR GET all tournament records ##########################################################################
// #####################################################################################################################
module.exports.selectAllTRecs = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Tournament;
    `;

    pool.query(SQLSTATMENT, callback); 
}
