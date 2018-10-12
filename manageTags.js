const mysql = require('mysql');
const sqrlDbCreds = require('./sqrlDbCreds');
const connection = mysql.createConnection(sqrlDbCreds);

module.exports = function(app) {

    app.get('/api/manageTags/get/:userId', (req, res) => {
        let response = {
            tags: []
        };
    
        connection.query("SELECT tags.ID, tags.tagName FROM tags WHERE userId = ?", [req.params.userId],
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
                    console.log(tag);
                    response.tags.push(tag);
                });
                res.send(response);
            }
        );

    });

    app.post('/api/manageTags/addTag', (req, res) => {
        const { userId, tagName } = req.body;

        let response = {
            success: false
        };
        
        let tagNameRegEx = /^[a-zA-Z \d-_]{2,}$/;

        if (tagNameRegEx.test(tagName)){
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
        }
    });

    // deleteTag: function(tagId, connection){
    //     let response = {
    //         success: false
    //     };

    //     connection.query("DELETE FROM tags WHERE tags.ID = ?;",
    //                     [tagId],
    //                     (error, result) => {
    //                         console.log('delete user tag query made');
    //                         if (error){
    //                             console.log('delete user tag query error', error);
    //                         }
    //                         else if(result.affectedRows === 0){
    //                             response.message = `${result.affectedRows} rows affected`;
    //                         }
    //                         else if(result.affectedRows > 0){
    //                             response.success = true;
    //                             response.message = `${result.affectedRows} rows affected`;
    //                         }
    //                     }
    //     );

    //     return response;
    // },

    // getTagsForReceipt: function(receiptId, connection){
    //     let response = {
    //         tags: []
    //     };

    //     connection.query("SELECT receipts_tags.tagId, tags.tagName, tags.ID FROM receipts_tags JOIN tags ON receipts_tags.tagId=tags.ID WHERE receipts_tags.receiptId=?;",
    //                     [receiptId],
    //                     (error, rows) => {
    //                         console.log('get tags for receipt query made');
    //                         if (error){
    //                             console.log('get tags for receipt query error', error);
    //                         }
    //                         rows.forEach(element => {
    //                             let tag = {
    //                                 tagId: element.tagId,
    //                                 tagName: element.tagName
    //                             }
    //                             response.tags.push(tag);
    //                         });
    //                     }
    //     );

    //     return response;
    // },

    // addReceiptTag: function(receiptId, tagId, connection){
    //     let response = {
    //         success: false
    //     };

    //     connection.query("INSERT IGNORE INTO receipt_tags (receiptId, tagId) VALUES (?, ?);",
    //                     [receiptId, tagId],
    //                     (error, result) => {
    //                         console.log('add receipt_tag query made');
    //                         if (error){
    //                             console.log('add receipt_tag query error', error);
    //                         }
    //                         else if(result.affectedRows === 0){
    //                             response.message = `${result.affectedRows} rows affected`;
    //                         }
    //                         else if(result.affectedRows > 0){
    //                             response.success = true;
    //                             response.message = `${result.affectedRows} rows affected`;
    //                         }
    //                     }
    //     );

    //     return response;
    // },

    // deleteRecieptTag: function(receiptId, tagId, connection){
    //     let response = {
    //         success: false
    //     };

    //     connection.query("DELETE FROM receipt_tags WHERE receipt_tags.receiptId = ? AND receipt_tags.tagId = ?;",
    //                     [receiptId, tagId],
    //                     (error, result) => {
    //                         console.log('delete receipt_tag query made');
    //                         if (error){
    //                             console.log('delete receipt_tag query error', error);
    //                         }
    //                         else if(result.affectedRows === 0){
    //                             response.message = `${result.affectedRows} rows affected`;
    //                         }
    //                         else if(result.affectedRows > 0){
    //                             response.success = true;
    //                             response.message = `${result.affectedRows} rows affected`;
    //                         }
    //                     }
    //     );

    //     return response;
    // },    
};