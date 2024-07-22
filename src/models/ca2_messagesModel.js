const pool = require('../services/db');

// #####################################################################################################################
// CA2 MESSAGES "POST" #################################################################################################
// #####################################################################################################################
module.exports.insertmessage = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Messages (user_id, messAGE_text)
    VALUES (?, ?);

    SELECT * FROM Messages 
    WHERE id = LAST_INSERT_ID();

    `;
    const VALUES = [data.user_id, data.message];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// CA2 MESSAGES "GET" all###############################################################################################
// #####################################################################################################################
module.exports.selectAllMessages = (callback) =>
{
    const SQLSTATMENT = `
    SELECT Messages.*, User.username
    FROM Messages
    JOIN User ON Messages.user_id = User.user_id
    ORDER BY Messages.created_at DESC;
    `;

    pool.query(SQLSTATMENT, callback); 
}

// #####################################################################################################################
// CA2 MESSAGES "DELETE" ###############################################################################################
// #####################################################################################################################
module.exports.deleteMesById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Messages
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// CA2 MESSAGES "PUT" ##################################################################################################
// #####################################################################################################################
module.exports.editMessage = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages 
    WHERE id = ?;

    UPDATE Messages
    SET message_text = ?,
        created_at = NOW()
    WHERE id = ?;
    

    SELECT * FROM Messages 
    WHERE id = ?;
    `;
    const VALUES = [data.id, data.message, data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// #####################################################################################################################
// CA2 MESSAGES "GET" bt id ############################################################################################
// #####################################################################################################################
module.exports.selectMessageById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM messages
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
