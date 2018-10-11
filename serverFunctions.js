
module.exports = {
    
    getCurrentDate: function(){
        let today = new Date();
        let current_date = today.toISOString().slice(0,10);
        return current_date;
    },

    getTagsForReceipt: function(receiptId, connection){
        let tags = [];

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
                                tags.push(tag);
                            });            
                        }
        );

        return tags;
    },

    getUserTags: function(userId, connection){
        let tags = [];
    
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
                                tags.push(tag);
                            });
                            output.success = true;                   
                        }
        );
    },

    addTag: function(userId,tagName, connection){
        let success = false;
        let tagNameRegEx = /^[a-zA-Z \d-_]{2,}$/;

        if (tagNameRegEx.test(tagName)){
            connection.query("SELECT tagName, userId FROM tags WHERE userId = ? AND tagName = ?;",
                [userId, tagName],
                (error, rows) => {
                    console.log('look up tag query made', rows, rows.length);
                    if (error){
                        console.log('look up query error', error);
                    }
                    else if(rows.length===0){
                        connection.query("INSERT INTO tags (userId, tagName) VALUES (?, ?);",
                            [userId, tagName],
                            (error, result) => {
                                console.log('insert query made');
                                if (error){
                                    console.log('insert query error', error);
                                }
                                success = true;
                            }
                        );
                    }
                    else{
                        console.log('tag already exists');
                    }  
                }
            );
        }

        return success;
    },

    deleteTag: function(tagId, connection){
        let success = false;

        connection.query("DELETE FROM tags WHERE tags.ID = ?;",
            [tagId],
            (error, result) => {
                console.log('insert query made');
                if (error){
                    console.log('insert query error', error);
                }
                success = true;
            }
        );

        return success;
    }
};