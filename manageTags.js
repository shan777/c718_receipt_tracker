const mysql = require('mysql');
const sqrlDbCreds = require('./sqrlDbCreds');
const connection = mysql.createConnection(sqrlDbCreds);

module.exports = function(app) {

    app.post('/api/manageTags/getUserTags', (req, res) => {
        const userId = req.session.userId;
        
        let response = {
            tags: []
        };

        connection.query("SELECT tags.ID, tags.tagName FROM tags WHERE userId = ?",
                        [userId],
                        (error, rows) => {
                            console.log('get user tags query made');
                            if (error){
                                console.log('get user tags query error', error);
                            }
                            rows.forEach(element => {
                                let tag = {
                                    tagId: element.ID,
                                    tagName: element.tagName
                                }
                                response.tags.push(tag);
                            });
                            res.send(response);
                        }
        );

    });

    app.post('/api/manageTags/addTag', (req, res) => {
        const {tagName} = req.body;
        const userId = req.session.userId;

        let response = {
            success: false
        };
        
        connection.query("INSERT IGNORE INTO tags (userId, tagName) VALUES (?, ?);",
                        [userId, tagName],
                        (error, result) => {
                            console.log('add user tag query made');
                            if (error){
                                console.log('add user tag query error', error);
                            }
                            else if(result.affectedRows === 0){
                                response.message = `${result.affectedRows} rows affected`;
                            }
                            else if(result.affectedRows > 0){
                                response.success = true;
                                response.message = `${result.affectedRows} rows affected`;
                            }
                            res.json(response);
                        }
        ); 
    });

    app.post('/api/manageTags/deleteTag', (req, res) => {
        const {tagId} = req.body;

        let response = {
            success: false
        };

        connection.query("DELETE FROM tags WHERE tags.ID = ?;",
                        [tagId],
                        (error, result) => {
                            console.log('delete user tag query made');
                            if (error){
                                console.log('delete user tag query error', error);
                            }
                            else if(result.affectedRows === 0){
                                response.message = `${result.affectedRows} rows affected`;
                            }
                            else if(result.affectedRows > 0){
                                response.success = true;
                                response.message = `${result.affectedRows} rows affected`;
                            }
                            res.send(response);
                        }
        );
    });

    app.post('/api/manageTags/getTagsForReceipt', (req, res) => {
        const {receiptId} = req.body;

        let response = {
            tags: []
        };

        connection.query("SELECT receipts_tags.tagId, tags.tagName, tags.ID FROM receipts_tags JOIN tags ON receipts_tags.tagId=tags.ID WHERE receipts_tags.receiptId=?;",
                        [receiptId],
                        (error, rows) => {
                            console.log('get tags for receipt query made');
                            if (error){
                                console.log('get tags for receipt query error', error);
                            }
                            rows.forEach(element => {
                                let tag = {
                                    tagId: element.tagId,
                                    tagName: element.tagName
                                }
                                response.tags.push(tag);
                            });
                            res.send(response);
                        }
        );
    });

    app.post('/api/manageTags/addReceiptTag', (req, res) => {
        const {receiptId, tagId} = req.body;

        let response = {
            success: false
        };

        connection.query("INSERT IGNORE INTO receipts_tags (receiptId, tagId) VALUES (?, ?);",
                        [receiptId, tagId],
                        (error, result) => {
                            console.log('add receipt_tag query made');
                            if (error){
                                console.log('add receipt_tag query error', error);
                            }
                            else if(result.affectedRows === 0){
                                response.message = `${result.affectedRows} rows affected`;
                            }
                            else if(result.affectedRows > 0){
                                response.success = true;
                                response.message = `${result.affectedRows} rows affected`;
                            }
                            res.send(response);
                        }
        );
    });

    app.post('/api/manageTags/deleteReceiptTag', (req, res) => {
        const {receiptId, tagId} = req.body;

        let response = {
            success: false
        };

        connection.query("DELETE FROM receipts_tags WHERE receipts_tags.receiptId = ? AND receipts_tags.tagId = ?;",
                        [receiptId, tagId],
                        (error, result) => {
                            console.log('delete receipt_tag query made');
                            if (error){
                                console.log('delete receipt_tag query error', error);
                            }
                            else if(result.affectedRows === 0){
                                response.message = `${result.affectedRows} rows affected`;
                            }
                            else if(result.affectedRows > 0){
                                response.success = true;
                                response.message = `${result.affectedRows} rows affected`;
                            }
                            res.send(response);
                        }
        );
    });

};