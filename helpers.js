module.exports = {
    
    getCurrentDate: function(){
        let today = new Date();
        let current_date = today.toISOString().slice(0,10);
        return current_date;
    },

    isValid: function(data){
        const receiptIdRegex = /^[1-9][\d]*$/;
        const storeNameRegex = /^[a-zA-Z \d-_]{2,32}$/;
        const totalRegex = /^[1-9][\d]{1,10}$/;
        const taxRegex = /^[1-9][\d]{1,10}$/;
        const creditCardNameRegex = /^[a-zA-Z ]{2,20}$/;
        const creditCardDigitsRegex = /^[\d]{4}$/;
        const purchaseDateRegex = /^\d{4}-{1}\d{2}-{1}\d{2}$/;
        const categoryRegex = /^[a-zA-Z]{1,20}$/;
        const commentRegex = /^[a-zA-Z\d .\-*\/$%!?()+=]{1,255}$/;
        const reimbursableRegex = /^[01]{1}$/;
        const userNameRegEx = /^(?=.{8,32}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
        const passwordRegEx = /^(?=[a-zA-Z])(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z]).*$/;
        const firstNameRegEx = /^[\. \-'a-zA-Z]{2,32}$/;
        const lastNameRegEx = /^[\. \-'a-zA-Z]{2,50}$/;
        const emailRegEx = /^[0-9a-zA-Z_\.]+@[0-9a-zA-Z_\.]{8,255}$/;
        const phoneRegEx = /^([1])?\(?\s*?[-]?([0-9]{3})\)?\s*?[-]?([0-9]{3})\s*?[-]?([0-9]{4})$/;
        let tagNameRegEx = /^[a-zA-Z \d-_]{2,}$/;
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