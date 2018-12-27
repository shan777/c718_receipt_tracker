const functions = require("./helpers.js");

module.exports = (app, connection) => {

    app.post('/api/manageTags/getUserTags', (request, response) => {
        const userId = request.session.userId;
        const output = {
            tags: []
        };
        if(userId){
            connection.query("SELECT tags.ID, tags.tagName FROM tags WHERE userId = ?",
                                    [userId],
                                    (error, rows) => {
                                        if (error) throw error;
                                        rows.forEach(element => {
                                            let tag = {
                                                tagId: element.ID,
                                                tagName: element.tagName
                                            }
                                            output.tags.push(tag);
                                        });
                                        return response.status(200).send(output);
                                    }
                    );
        }else{
            output.error = "User not logged in.";
            return response.status(401).send(output);
        }
    });

    app.post('/api/manageTags/addTag', (request, response) => {
        const {tagName} = request.body;
        const userId = request.session.userId;
        const output = {
            success: false
        };
        if (userId){
            const data = request.body;
            let data_validation = functions.validator(data);
    
            if(data_validation.pass){
                connection.query("INSERT IGNORE INTO tags (userId, tagName) VALUES (?, ?);",
                            [userId, tagName],
                            (error, result) => {
                                if (error) throw error;
                                if (result.affectedRows === 1){
                                    output.success = true;
                                    output.tagId = result.insertId;
                                    return response.status(200).send(output);
                                }
                                output.error = `${result.affectedRows} rows affected`;
                                return response.status(400).send(output);
                            }
                );
            }
            else{
                output.validation = data_validation;
                return response.status(400).send(output);
            }
        }else{
            output.error = "User not logged in.";
            return response.status(401).send(output);
        }
    });

    app.post('/api/manageTags/deleteTag', (request, response) => {
        const {tagId} = request.body;
        const userId = request.session.userId;

        let output = {
            success: false
        };
        if (userId){
            connection.query(`DELETE FROM tags WHERE tags.ID = ? AND tags.userId = ?;`,
                            [tagId, userId],
                            (error, result) => {
                                if (error) throw error;
                                if (result.affectedRows > 0){
                                    connection.query(`DELETE FROM receipts_tags WHERE receipts_tags.tagId = ?`,
                                                    [tagId],
                                                    (error) => {
                                                        if (error) throw error;
                                                    }
                                    );
                                    output.success = true;
                                    return response.status(200).send(output);
                                }
                                output.error = `${result.affectedRows} rows affected`;
                                return response.status(400).send(output);
                            }
            );
        }else{
            output.error = "User not logged in.";
            return response.status(401).send(output);
        }
    });

    app.post('/api/manageTags/getTagsForReceipt', (request, response) => {
        const {receiptId} = request.body;
        const userId = request.session.userId;

        const output = {
            tags: []
        };
        if (userId){
            connection.query("SELECT receipts_tags.tagId, tags.tagName, tags.ID FROM receipts_tags JOIN tags ON receipts_tags.tagId=tags.ID WHERE receipts_tags.receiptId=?;",
                            [receiptId],
                            (error, rows) => {
                                if (error) throw error;
                                rows.forEach(element => {
                                    let tag = {
                                        tagId: element.tagId,
                                        tagName: element.tagName
                                    }
                                    output.tags.push(tag);
                                });
                                return response.status(200).send(output);
                            }
            );
        }else{
            output.error = "User not logged in.";
            return response.status(401).send(output);
        }
    });

    app.post('/api/manageTags/addReceiptTag', (request, response) => {
        const {receiptId, tagId} = request.body;
        const userId = request.session.userId;

        const output = {
            success: false
        };

        const data = request.body;
        let data_validation = functions.validator(data);

        if(userId){
            if(data_validation.pass){
                connection.query("INSERT IGNORE INTO receipts_tags (receiptId, tagId) VALUES (?, ?);",
                            [receiptId, tagId],
                            (error, result) => {
                                if (error) throw error;
                                if (result.affectedRows > 0){
                                    output.success = true;
                                    return response.status(200).send(output);
                                }
                                output.error = `${result.affectedRows} rows affected`;
                                return response.status(400).send(output);
                            }
                );
            }
            else{
                output.validation = data_validation;
                return response.status(400).send(output);
            }
        }else{
            output.error = "User not logged in.";
            return response.status(401).send(output);
        }
    });

    app.post('/api/manageTags/updateReceiptTags', (request, response) => {
        const {receiptId, tags} = request.body;
        const userId = request.session.userId;

        const output = {
            success: false,
            tagsInserted: []
        };

        if(userId){
            if (tags === undefined || !receiptId){
                output.error = "invalid tag format or receiptId";
                return response.status(400).send(output);
            }else{
                connection.query("DELETE FROM `receipts_tags` WHERE `receipts_tags`.`receiptId` = ?;",
                                [receiptId],
                                (error)=>{
                                    if (error) throw error;
                                    else if (tags.length === 0){
                                        output.success = true;
                                        return response.status(200).send(output);
                                    }else{
                                        connection.query("SELECT tags.ID, tags.tagName FROM tags WHERE tags.userId = ?;",
                                                        [userId],
                                                        (error, rows) => {
                                                            if (error) throw error;
                                                            else if(rows.length){
                                                                let queryString = "INSERT IGNORE INTO receipts_tags (receipts_tags.tagId, receipts_tags.receiptId) VALUES ";
                                                                const valuesArray = [];

                                                                for(let tagIndex=0; tagIndex<tags.length; tagIndex++){
                                                                    for(let rowIndex=0; rowIndex<rows.length; rowIndex++){
                                                                        if (tags[tagIndex].tagId === rows[rowIndex].ID && tags[tagIndex].tagName === rows[rowIndex].tagName){
                                                                            let newTagObject = {
                                                                                tagId: tags[tagIndex].tagId,
                                                                                tagName: tags[tagIndex].tagName,
                                                                                inserted: true
                                                                            };
                                                                            output.tagsInserted.push(newTagObject);
                                                                            valuesArray.push('(' + tags[tagIndex].tagId + ',' + receiptId + ')');
                                                                            break;
                                                                        }
                                                                    }
                                                                }
                                                                if(valuesArray.length){
                                                                    queryString += valuesArray.join(',');
                                                                    connection.query(queryString,
                                                                                    (error)=>{
                                                                                        if (error) throw error;
                                                                                        output.success = true;
                                                                                        return response.status(200).send(output);
                                                                    });
                                                                }else{
                                                                    output.error = 'tags sent do not match any user tags'
                                                                    return response.status(400).send(output);
                                                                }
                                                            }else{
                                                                output.error = 'tags sent do not match any user tags'
                                                                return response.status(400).send(output);
                                                            }
                                        });
                                    }
                });
            }
        }else{
            output.error = "User not logged in.";
            return response.status(401).send(output);
        }
    });

    app.post('/api/manageTags/deleteReceiptTag', (request, response) => {
        const {receiptId, tagId} = request.body;
        const userId = request.session.userId;

        const output = {
            success: false
        };
        if (userId){
            connection.query("DELETE FROM receipts_tags WHERE receipts_tags.receiptId = ? AND receipts_tags.tagId = ?;",
                            [receiptId, tagId],
                            (error, result) => {
                                if (error) throw error;
                                if (result.affectedRows > 0){
                                    output.success = true;
                                    return response.status(200).send(output);
                                }
                                output.error = `${result.affectedRows} rows affected`;
                                return response.status(400).send(output);
                            }
            );
        }else{
            output.error = "User not logged in.";
            return response.status(401).send(output);
        }
    });
};