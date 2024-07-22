const model = require ('../models/ca2_messagesModel');

// #####################################################################################################################
// CA2 MESSAGES "POST" #################################################################################################
// #####################################################################################################################
module.exports.createNewMessage = (req, res, next) =>
{ 
    
    if(req.body.message == undefined)
    {
        res.status(400).send("Error: Missing required data");
        return;
    }

    const data = {
       message : req.body.message,
       user_id : req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewMessage:", error);
            res.status(500).json({message: "Internal Server Error"});
        } else {
            // res.status(200).json(results)
            res.status(201).json(results);
        }
    }
   
    model.insertmessage(data, callback);
}

// #####################################################################################################################
// CA2 MESSAGES "GET" all###############################################################################################
// #####################################################################################################################
module.exports.readAllGMessages = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllGMessages:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAllMessages(callback);
}

// #####################################################################################################################
// CA2 MESSAGES "DELETE" ###############################################################################################
// #####################################################################################################################
module.exports.deleteMessagesById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessagesById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Messages not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteMesById(data, callback);
}

// #####################################################################################################################
// CA2 MESSAGES "PUT" ##################################################################################################
// #####################################################################################################################
module.exports.updateMessageById = (req, res, next) =>
{
    if(req.body.message == undefined)
    {
        res.status(400).json({
            message: "Error: missing required data"
        });
        return;
    }

    const data = {
        id : req.params.id,
        message : req.body.message
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } else {
            if(results[1].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results); // 204 No Content
        }
    }

    model.editMessage(data, callback);
}

// #####################################################################################################################
// CA2 MESSAGES "GET" by id ############################################################################################
// #####################################################################################################################
module.exports.readMessageById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readMessageById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectMessageById(data, callback);
}
