const users = [
    {
        user_name: 'chaseCaine',
        first_name: 'chase',
        last_name: 'caine',
        email: 'chaseCaine@squirrelreceipts.com',
        password: 'chase123',
        phone: 1233214422,
        ID: 1,
        reports : [
            {
                report_name: 'My Spending',
                ID: 1,
                receipts: [
                    {
                        store_name: 'nordstrom',
                        total: 100.00,
                        tax: 8.75,
                        credit_card_name: 'Visa',
                        credit_card_digits: 1234,
                        purchase_date: new Date(),
                        catagory: 'clothes',
                        comment: 'a couple shirts and some socks',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                        ID: 1
                    }
                ]
            }
        ]
    },
    {
        user_name: 'kylePamintuan',
        first_name: 'kyle',
        last_name: 'pamintuan',
        email: 'kylePamintuan@squirrelreceipts.com',
        password: 'kyle123',
        phone: 4325341524,
        ID: 2,
        reports : [
            {
                report_name: 'Paris Trip',
                ID: 2,
                receipts: [
                    {
                        store_name: 'louvre gift shop',
                        total: 10.00,
                        tax: 5.00,
                        credit_card_name: 'AMEX',
                        credit_card_digits: 1234,
                        purchase_date: new Date(),
                        catagory: 'gifts',
                        comment: 'a tiny replica of the mona lisa',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                        ID: 2
                    },
                    {
                        store_name: 'cartier',
                        total: 10000.00,
                        tax: 500.00,
                        credit_card_name: 'AMEX',
                        credit_card_digits: 1234,
                        purchase_date: new Date(),
                        catagory: 'gifts',
                        comment: 'a sweet watch with a diamond bezel',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                        ID: 3
                    },
                    {
                        store_name: 'La Creme',
                        total: 150.00,
                        tax: 500.00,
                        credit_card_name: 'AMEX',
                        credit_card_digits: 1234,
                        purchase_date: new Date(),
                        catagory: 'dinner',
                        comment: 'took the team out to dinner',
                        reimburseable: true,
                        receiptImg: 'dummy receipt image',
                        ID: 4
                    }
                ]
            }
        ]
    },
    {
        user_name: 'estherSuh',
        first_name: 'esther',
        last_name: 'suh',
        email: 'estherSuh@squirrelreceipts.com',
        password: 'ester123',
        phone: 3214325544,
        ID: 3,
        reports : [
            {
                report_name: 'Shopping',
                ID: 3,
                receipts: [
                    {
                        store_name: 'Loft',
                        total: 200.00,
                        tax: 18.75,
                        credit_card_name: 'MasterCard',
                        credit_card_digits: 1234,
                        purchase_date: new Date(),
                        catagory: 'clothes',
                        comment: 'some pants and a couple blouses',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                        ID: 5
                    },
                    {
                        store_name: 'Banana Repulic',
                        total: 30.00,
                        tax: 4.75,
                        credit_card_name: 'MasterCard',
                        credit_card_digits: 1234,
                        purchase_date: new Date(),
                        catagory: 'clothes',
                        comment: 'a belt',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                        ID: 6
                    }
                ]
            },
            {
                report_name: 'Groceries',
                ID: 4,
                receipts: [
                    {
                        store_name: 'Ralphs',
                        total: 150.00,
                        tax: 18.75,
                        credit_card_name: 'Visa',
                        credit_card_digits: 1234,
                        purchase_date: new Date(),
                        catagory: 'food',
                        comment: 'got some food to restock the fridge',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                        ID: 7
                    },
                    {
                        store_name: 'Korean Market',
                        total: 33.00,
                        tax: 3.75,
                        credit_card_name: '',
                        credit_card_digits: null,
                        purchase_date: new Date(),
                        catagory: 'food',
                        comment: 'noodles',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                        ID: 8
                    }
                ]
            }
        ]
    },
    {
        user_name: 'sarahHan',
        first_name: 'sarah',
        last_name: 'han',
        email: 'sarahHan@squirrelreceipts.com',
        password: 'sarah123',
        phone: 2312324534,
        ID: 4,
        reports : [
            {
                report_name: 'Meals',
                ID: 5,
                receipts: [
                    {
                        store_name: 'Pho King Way',
                        total: 18.00,
                        tax: 2.75,
                        credit_card_name: 'Discover',
                        credit_card_digits: 1234,
                        purchase_date: new Date(),
                        catagory: 'lunch',
                        comment: 'bun and a coke',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                        ID: 9
                    }
                ]
            }
        ]
    },
    {
        user_name: 'steveBenedict',
        first_name: 'steve',
        last_name: 'benedict',
        email: 'steveBenedict@squirrelreceipts.com',
        password: 'steve123',
        phone: 4455678908,
        ID: 5,
        reports : [
            {
                report_name: 'Street Wear',
                ID: 6,
                receipts: [
                    {
                        store_name: 'Supreme',
                        total: 68.00,
                        tax: 10.75,
                        credit_card_name: 'MasterCard',
                        credit_card_digits: 1234,
                        purchase_date: new Date(),
                        catagory: 'clothes',
                        comment: 'box logo tee',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                        ID: 10
                    },
                    {
                        store_name: 'Supreme',
                        total: 250.00,
                        tax: 10.75,
                        credit_card_name: 'MasterCard',
                        credit_card_digits: 1234,
                        purchase_date: new Date(),
                        catagory: 'clothes',
                        comment: 'box logo hoodie',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                        ID: 11
                    }
                ]
            }
        ]
    },
];