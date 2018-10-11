
module.exports = {
    
    getCurrentDate: function(){
        let today = new Date();
        let current_date = today.toISOString().slice(0,10);
        return current_date;
    },

    getUserTags: function(userId, connection){
        let response = {
            tags: []
        };
    
        connection.query("SELECT tagName FROM tags WHERE userId = ?",
                        [userId],
                        (error, rows) => {
                            console.log('get tags query made');
                            if (error){
                                console.log('get tags query error', error);
                            }
                            rows.forEach(element => {
                                let tag = {
                                    tagId: element.ID,
                                    tagName: element.tagName
                                }
                                response.tags.push(tag);
                            });                 
                        }
        );

        return response;
    },

    addTag: function(userId, tagName, connection){
        let response = {
            success: false
        };
        
        let tagNameRegEx = /^[a-zA-Z \d-_]{2,}$/;

        if (tagNameRegEx.test(tagName)){
            connection.query("INSERT IGNORE INTO tags (userId, tagName) VALUES (?, ?);",
                            [userId, tagName],
                            (error, result) => {
                                console.log('add tag query made');
                                if (error){
                                    console.log('add tag query error', error);
                                }
                                else if(result.affectedRows === 0){
                                    response.message = `${result.affectedRows} rows affected`;
                                }
                                else if(result.affectedRows > 0){
                                    response.success = true;
                                    response.message = `${result.affectedRows} rows affected`;
                                }
                            }
            ); 
        }

        return response;
    },

    deleteTag: function(tagId, connection){
        let response = {
            success: false
        };

        connection.query("DELETE FROM tags WHERE tags.ID = ?;",
                        [tagId],
                        (error, rows) => {
                            console.log('delete tag query made');
                            if (error){
                                console.log('delete tag query error', error);
                            }
                            else if(rows.length===0){
                                response.result = "0 rows affected";
                            }
                            else if(result.affectedRows > 0){
                                response.success = true;
                                response.message = `${result.affectedRows} rows affected`;
                            }
                        }
        );

        return response;
    },

    getTagsForReceipt: function(receiptId, connection){
        let response = {
            tags: []
        };

        connection.query("SELECT receipts_tags.tagId,tags.tagName, tags.ID FROM receipts_tags JOIN tags ON receipts_tags.tagId=tags.ID WHERE receipts_tags.receiptId=?;",
                        [receiptId],
                        (error, rows) => {
                            console.log('get tags for receipt query made');
                            if (error){
                                console.log('get tags for receipt query error', error);
                            }
                            rows.forEach(element => {
                                let tag = {
                                    tagId: element.ID,
                                    tagName: element.tagName
                                }
                                response.tags.push(tag);
                            });            
                        }
        );

        return response;
    },

    addReceiptTag: function(receiptId, tagId, connection){
        let response = {
            success: false
        };

        connection.query("INSERT IGNORE INTO receipt_tags (receiptId, tagId) VALUES (?, ?);",
                        [receiptId, tagId],
                        (error, rows) => {
                            console.log('add receipt_tag query made');
                            if (error){
                                console.log('add receipt_tag query error', error);
                            }
                            else if(rows.length===0){
                                response.result = "0 rows affected";
                            }
                            else if(result.affectedRows > 0){
                                response.success = true;
                                response.message = `${result.affectedRows} rows affected`;
                            }
                        }
        );

        return response;
    },

    deleteRecieptTag: function(receiptId, tagId, connection){
        let response = {
            success: false
        };

        connection.query("DELETE FROM receipt_tags WHERE tags.ID = ?;",
                        [receiptId, tagId],
                        (error, rows) => {
                            console.log('delete receipt_tag query made');
                            if (error){
                                console.log('delete receipt_tag query error', error);
                            }
                            else if(rows.length===0){
                                response.result = "0 rows affected";
                            }
                            else if(result.affectedRows > 0){
                                response.success = true;
                                response.message = `${result.affectedRows} rows affected`;
                            }
                        }
        );

        return response;
    },    
};