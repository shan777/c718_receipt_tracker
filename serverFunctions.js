
module.exports = {
    
    getCurrentDate: function(){
        let today = new Date();
        let current_date = today.toISOString().slice(0,10);
        return current_date;
    },

    getTagsForReceipt: function(receiptId, connection){
        let tags = [];

        let receiptIdRegEx = /^[1-9][\d]*/;

        if (receiptIdRegEx.test(receiptId)){
            connection.query("SELECT receipts_tags.tagId,tags.tagName FROM receipts_tags JOIN tags ON receipts_tags.tagId=tags.ID WHERE receipts_tags.receiptId=?;",
                            [receiptId],
                            (error, rows) => {
                                console.log('get tags for receipt query made');
                                if (error){
                                    console.log('get tags for receipt query error', error);
                                }
                                rows.forEach(element => {
                                    tags.push(element.tagName);
                                });
                            }
            );
        }
        return tags;
    }
};