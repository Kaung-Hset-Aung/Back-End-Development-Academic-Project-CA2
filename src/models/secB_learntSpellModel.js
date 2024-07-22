const pool = require('../services/db');

// #####################################################################################################################
// Section B (7) . POST /learn##########################################################################################
// #####################################################################################################################
module.exports.insertLearner1 = (data, callback) =>
{
    const SQLSTATMENT = `

    SELECT * FROM Student
    WHERE student_id = ?;

    SELECT * FROM Spells
    WHERE spell_id = ?;

    SELECT * FROM LearntSpells
    WHERE student_id =? AND spell_id = ?

    `;
    const VALUES = [data.student_id, data.spell_id, data.student_id, data.spell_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertLearner2 = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO LearntSpells (student_id, spell_id)
    VALUES (?, ?);

    SELECT * FROM LearntSpells 
    WHERE learnt_id = LAST_INSERT_ID();

    `;
    const VALUES = [data.student_id, data.spell_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// Section B (8) . GET /learn/student_id/:{student_id}##################################################################
// #####################################################################################################################
module.exports.selectSpellByStudentId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Student
    WHERE student_id = ?;

    SELECT
    Spells.spell, spells.spell_id
    FROM
    LearntSpells
    JOIN
    Spells ON LearntSpells.spell_id = Spells.spell_id
    WHERE
    LearntSpells.student_id = ?;

    SELECT
    SUM(Spells.damage) AS total_damage
    FROM
    LearntSpells
    JOIN
    Spells ON LearntSpells.spell_id = Spells.spell_id
    WHERE
    LearntSpells.student_id = ?;

    SELECT * FROM learntSpells
    WHERE student_id = ?
    
    `;
    const VALUES = [data.id, data.id, data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}