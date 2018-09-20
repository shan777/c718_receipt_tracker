const users = [
    {
        userName: 'chase',
        firstName: 'chase',
        lastName: 'caine',
        password: 'chase123',
        reports : [
            {
                reportName: 'My Spending',
                receipts: [
                    {
                        receiptName: 'nordstrom',
                        totalAmount: 100.00,
                        tax: 8.75,
                        creditCardType: 'Visa',
                        creditCardDigits: 1234,
                        date: new Date(),
                        catagory: 'clothes',
                        comment: 'a couple shirts and some socks',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                    }
                ]
            }
        ]
    },
    {
        userName: 'kyle',
        firstName: 'kyle',
        lastName: 'pamintuan',
        password: 'kyle123',
        reports : [
            {
                reportName: 'Paris Trip',
                receipts: [
                    {
                        receiptName: 'louvre gift shop',
                        totalAmount: 10.00,
                        tax: 5.00,
                        creditCardType: 'AMEX',
                        creditCardDigits: 1234,
                        date: new Date(),
                        catagory: 'gifts',
                        comment: 'a tiny replica of the mona lisa',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                    },
                    {
                        receiptName: 'cartier',
                        totalAmount: 10000.00,
                        tax: 500.00,
                        creditCardType: 'AMEX',
                        creditCardDigits: 1234,
                        date: new Date(),
                        catagory: 'gifts',
                        comment: 'a sweet watch with a diamond bezel',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                    },
                    {
                        receiptName: 'La Creme',
                        totalAmount: 150.00,
                        tax: 500.00,
                        creditCardType: 'AMEX',
                        creditCardDigits: 1234,
                        date: new Date(),
                        catagory: 'dinner',
                        comment: 'took the team out to dinner',
                        reimburseable: true,
                        receiptImg: 'dummy receipt image',
                    }
                ]
            }
        ]
    },
    {
        userName: 'esther',
        firstName: 'esther',
        lastName: 'suh',
        password: 'ester123',
        reports : [
            {
                reportName: 'Shopping',
                receipts: [
                    {
                        receiptName: 'Loft',
                        totalAmount: 200.00,
                        tax: 18.75,
                        creditCardType: 'MasterCard',
                        creditCardDigits: 1234,
                        date: new Date(),
                        catagory: 'clothes',
                        comment: 'some pants and a couple blouses',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                    },
                    {
                        receiptName: 'Banana Repulic',
                        totalAmount: 30.00,
                        tax: 4.75,
                        creditCardType: 'MasterCard',
                        creditCardDigits: 1234,
                        date: new Date(),
                        catagory: 'clothes',
                        comment: 'a belt',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                    }
                ]
            },
            {
                reportName: 'Groceries',
                receipts: [
                    {
                        receiptName: 'Ralphs',
                        totalAmount: 150.00,
                        tax: 18.75,
                        creditCardType: 'Visa',
                        creditCardDigits: 1234,
                        date: new Date(),
                        catagory: 'food',
                        comment: 'got some food to restock the fridge',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                    },
                    {
                        receiptName: 'Korean Market',
                        totalAmount: 33.00,
                        tax: 3.75,
                        creditCardType: '',
                        creditCardDigits: null,
                        date: new Date(),
                        catagory: 'food',
                        comment: 'noodles',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                    }
                ]
            }
        ]
    },
    {
        userName: 'sarah',
        firstName: 'sarah',
        lastName: 'han',
        password: 'sarah123',
        reports : [
            {
                reportName: 'Meals',
                receipts: [
                    {
                        receiptName: 'Pho King Way',
                        totalAmount: 18.00,
                        tax: 2.75,
                        creditCardType: 'Discover',
                        creditCardDigits: 1234,
                        date: new Date(),
                        catagory: 'lunch',
                        comment: 'bun and a coke',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                    }
                ]
            }
        ]
    },
    {
        userName: 'steve',
        firstName: 'steve',
        lastName: 'benedict',
        password: 'steve123',
        reports : [
            {
                reportName: 'Street Wear',
                receipts: [
                    {
                        receiptName: 'Supreme',
                        totalAmount: 68.00,
                        tax: 10.75,
                        creditCardType: 'MasterCard',
                        creditCardDigits: 1234,
                        date: new Date(),
                        catagory: 'clothes',
                        comment: 'box logo tee',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                    },
                    {
                        receiptName: 'Supreme',
                        totalAmount: 250.00,
                        tax: 10.75,
                        creditCardType: 'MasterCard',
                        creditCardDigits: 1234,
                        date: new Date(),
                        catagory: 'clothes',
                        comment: 'box logo hoodie',
                        reimburseable: false,
                        receiptImg: 'dummy receipt image',
                    }
                ]
            }
        ]
    },
];