module.exports = {

    validator: (data)=>{
        const regex_patterns = {
            //user table fields
            userId: /^[1-9][\d]{0,9}$/,
            //status is missing
            phone: /^([1])?\(?\s*?[-]?([0-9]{3})\)?\s*?[-]?([0-9]{3})\s*?[-]?([0-9]{4})$/,
            email: /^[0-9a-zA-Z_\.]+@[0-9a-zA-Z_\.]{8,255}$/,
            
            lastName: /^[a-zA-Z_.\- ']{2,32}$/,
            // lastName: /^[\. \-'a-zA-Z]{2,50}$/,

            firstName: /^[a-zA-Z_.\- ']{2,32}$/,
            // firstName: /^[\. \-'a-zA-Z]{2,32}$/,

            password: /^(?=[a-zA-Z])(?=.{8,32}$)(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).*$/,
            // password: /^(?=[a-zA-Z])(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[\d]).*$/,

            userName: /^(?=.{5,15}$)(?!.*[_]{2})^[a-zA-Z]\w+$/,
            // userName: /^(?=.{8,32}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,

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
            
            storeName: /^[äéa-zA-Z \d-&'_!\.,\?\+]{1,32}$/,
            // storeName: /^[äéa-zA-Z \d-&'_!\.,\?\+]{2,32}$/,

            //tag table fields
            tagName: /^[a-zA-Z \d-_']{2,15}$/,
            tagId: /^[1-9][\d]{0,9}$/
        }

        let data_entries = Object.entries(data);
        let results = {};
        results.pass = true;

        for (let [key, value] of data_entries){
            if(key==="tags")
                continue;
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

    getQueryForFilters: (filters)=>{
        let insert = "";
        let propertyNames = Object.getOwnPropertyNames(filters);
        let values = Object.values(filters);
        for(var i=0; i < propertyNames.length; i++){
            let prop = propertyNames[i];
            let val = values[i];

            let temp;
            if(prop==="tagName" || prop==="tagId")
                (typeof val !== "number")? temp = `AND t.${prop} = '${val}' `: temp = `AND t.${prop} = ${val} `;
            else if(prop==="minDate")
                temp = `AND r.purchaseDate >= '${val}' `;
            else if(prop==="maxDate")
                temp = `AND r.purchaseDate <= '${val}' `;
            else
                (typeof val !== "number")? temp = `AND r.${prop} = '${val}' `: temp = `AND r.${prop} = ${val} `;
            insert += temp;
        }
        let query;
        if(propertyNames.includes("tagName") || propertyNames.includes("tagId"))
            query = `SELECT DISTINCT r.storeName, r.total, DATE_FORMAT(r.purchaseDate, "%m/%d/%Y") AS purchaseDate, r.category, r.comment FROM receipts AS r LEFT JOIN receipts_tags AS rt ON r.ID = rt.receiptId LEFT JOIN tags AS t ON rt.tagId = t.ID WHERE r.userId = ? ${insert} AND r.status = 'active';`;
        else
            query = `SELECT r.storeName, r.total, DATE_FORMAT(r.purchaseDate, "%m/%d/%Y") AS purchaseDate, r.category, r.comment FROM receipts AS r WHERE r.userId = ? ${insert} AND r.status = 'active';`;
        return query;
    },

    formatPhoneNum: (phoneNum)=>{
        const removeChars = /[\s-()]+/g;
        let result = phoneNum.replace(removeChars, '');
        return parseInt(result);
    }
}
