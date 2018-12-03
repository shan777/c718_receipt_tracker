const functions = require("./helpers.js");

module.exports = (app, connection) => {

    app.post('/api/manageReceipts/getUserReceipts', (request, response) => {
        const userId = request.session.userId;
        const output = {
            receipts: [],
            success: false
        };
        if (userId){
            connection.query(`SELECT r.ID, r.storeName, r.total, DATE_FORMAT(r.purchaseDate, "%m/%d/%Y") AS purchaseDate, r.category, r.comment
                              FROM receipts AS r
                              WHERE r.userId = ?
                              AND r.status = 'active'
                              ORDER BY r.purchaseDate DESC;`,
                            [userId],
                            (error, rows) => {
                                if (error){
                                    output.error = error;
                                    return response.status(400).send(output);
                                }else if(rows){
                                    rows.forEach(element => {
                                        output.receipts.push(element);
                                    });
                                    output.success = true;
                                    return response.status(200).send(output);
                                }
            });
        }else{
            output.error = "User not logged in.";
            response.status(401).send(output);
        }
    });

    app.post('/api/manageReceipts/filterReceipts', (request, response) => {
        const userId = request.session.userId;
        const output = {
            receipts: [],
            success: false
        };
        if (userId){
            let dynamicQuery = functions.getQueryForFilters(request.body);
            connection.query(dynamicQuery,
                            [userId],
                            (error, rows) => {
                                if (error){
                                    output.error = error;
                                    return response.status(400).send(output);
                                }else if(rows){
                                    rows.forEach(element => {
                                        output.receipts.push(element);
                                    });
                                    output.success = true;
                                    return response.status(200).send(output);
                                }
            });
        }else{
            output.error = "User not logged in.";
            return response.status(401).send(output);
        }
    });

    app.post('/api/manageReceipts/deleteReceipt', (request, response) => {
        // NOTE: This query is meant for doing a SOFT delete meaning the receipts status will be update to 'inactive' and will NOT be removed from the db
        const {receiptId} = request.body;
        const userId = request.session.userId;
        const output = {
            success: false
        };
        if(userId){
            connection.query("UPDATE receipts SET receipts.status = 'inactive' WHERE receipts.ID = ?;",
                            [receiptId],
                            (error) => {
                                if (error){
                                    output.error = error;
                                    return response.status(400).send(output);
                                }else{
                                    output.success = true;
                                    return response.status(200).send(output);
                                }
                                
            });
        }else{
            output.error = "User not logged in.";
            return response.status(401).send(output);
        }
    });
    
    app.post('/api/manageReceipts/addReceipt', (request, response) => {
        const userId = request.session.userId;
        const output = {
            success: false,
            tagsInserted: []
        };
        if (userId){
            request.body.userId = userId;
            let data_validation = functions.validator(request.body);
            if(data_validation.pass){
                var tags = [];
                if(request.body.tags){
                    tags = request.body.tags.slice();
                    delete request.body.tags;
                }
                connection.query("INSERT INTO receipts SET ?;",
                                [request.body],
                                (error, results) => {
                                    if(error){
                                        output.error = error;
                                        output.success = false;
                                        return response.status(400).send(output);
                                    }
                                    const newReceiptId = results.insertId;
                                    if(tags.length>0 && newReceiptId){
                                        connection.query("SELECT tags.ID, tags.tagName FROM tags WHERE tags.userId = ?;",
                                                            [userId],
                                                            (error, rows) => {
                                                                if (error) throw error;
                                                                else if(rows.length){
                                                                    let queryString = "INSERT INTO receipts_tags (receipts_tags.tagId, receipts_tags.receiptId) VALUES ";
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
                                                                                valuesArray.push('(' + tags[tagIndex].tagId + ',' + newReceiptId + ')');
                                                                            }
                                                                        }
                                                                    }
                                                                    if(valuesArray.length){
                                                                        queryString += valuesArray.join(',');
                                                                        connection.query(queryString, (error)=>{
                                                                            if (error) throw error;
                                                                            output.success = true;
                                                                            return response.status(200).send(output);
                                                                        });
                                                                    }
                                                                }
                                                            }
                                        );
                                    }else{
                                        output.success = true;
                                        return response.status(200).send(output);   
                                    }
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
    
    app.post('/api/manageReceipts/updateReceipt', (request, response) => {
        const userId = request.session.userId;
        const output = {
            success: false
        };
        if (userId){
            let data_validation = functions.validator(request.body);
            if(data_validation.pass){
                const {receiptId} = request.body;
                delete request.body.receiptId;
                const query = connection.query("UPDATE receipts SET ? WHERE receipts.ID = ?;",
                                [request.body, receiptId],
                                (error) => {
                                    if(error) throw error;
                                    output.success = true;
                                    return response.status(200).send(output);
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
};