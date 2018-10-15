module.exports = {
    
    getCurrentDate: function(){
        let today = new Date();
        let current_date = today.toISOString().slice(0,10);
        return current_date;
    },

    validator: function(data){
        const regex_patterns = {
            //user table fields
            userId: /^[1-9][\d]{0,9}$/,
            //status is missing
            phone: /^([1])?\(?\s*?[-]?([0-9]{3})\)?\s*?[-]?([0-9]{3})\s*?[-]?([0-9]{4})$/,
            email: /^[0-9a-zA-Z_\.]+@[0-9a-zA-Z_\.]{8,255}$/,
            lastName: /^[\. \-'a-zA-Z]{2,50}$/,
            firstName: /^[\. \-'a-zA-Z]{2,32}$/,
            password: /^(?=[a-zA-Z])(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z]).*$/,
            userName: /^(?=.{8,32}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            //receipt table fields
            receiptId: /^[1-9][\d]{0,9}$/,
            reimbursable: /^[01]{1}$/,
            //status is missing
            comment: /^[a-zA-Z\d'\s\+\?\.]{0,255}$/,
            category: /^[a-zA-Z]{1,20}$/,
            purchaseDate: /^\d{4}-{1}\d{2}-{1}\d{2}$/,
            creditCardDigits: /^[\d]{4}$/,
            creditCardName: /^[a-zA-Z ]{2,20}$/,
            tax: /^[1-9][\d]{0,9}$/,
            total: /^[1-9][\d]{0,9}$/,
            storeName: /^[a-zA-Z \d-&'_!]{2,32}$/,
            //tag table fields
            tagName: /^[a-zA-Z \d-_]{2,15}$/,
            tagId: /^[1-9][\d]{0,9}$/
        }

        let data_entires = Object.entries(data);
        let results = {};
        results.pass = true;

        for (let [key, value] of data_entires){
            if(!regex_patterns.hasOwnProperty(key)){
                results[key] = "data does not match any columns in the database";
                results.pass = false;
                continue;
            }
            let curr_regex = RegExp(regex_patterns[key])
        	let result = curr_regex.test(value);
            if(!result){
                results[key] = "invalid";
                results.pass = false;
            }else
                results[key] = "valid";
        }
        
        return results;
    },

    formatPhoneNum: function(phoneNum){
        // let tempPhoneNumber = '';
        // for (let index=1; index<phoneNumArray.length; index++){
        //     if(phoneNumArray[index]){
        //         tempPhoneNumber += phoneNumArray[index];
        //     }
        // }
        // let phoneNum = parseInt(tempPhoneNumber);
    }
}