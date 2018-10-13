module.exports = {
    
    getCurrentDate: function(){
        let today = new Date();
        let current_date = today.toISOString().slice(0,10);
        return current_date;
    }
    
}