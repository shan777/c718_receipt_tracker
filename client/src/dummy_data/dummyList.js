const users = [
    {
        userName: 'chaseCaine',
        firstName: 'chase',
        lastName: 'caine',
        email: 'chaseCaine@squirrelreceipts.com',
        password: 'chase123',
        phone: 1233214422,
        ID: 1,
        receipts: [
            {
                storeName: 'nordstrom',
                total: 100.00,
                tax: 8.75,
                creditCardName: 'Visa',
                creditCardDigits: 1234,
                purchaseDate: new Date(),
                catagory: 'Clothing',
                comment: 'a couple shirts and some socks',
                reimburseable: false,
                ID: 1,
                tagId: 1
            }
        ],
        tags: [
            {
                tagName: 'My Spending',
                ID: 1
            }
        ]
    },
    {
        userName: 'kylePamintuan',
        firstName: 'kyle',
        lastName: 'pamintuan',
        email: 'kylePamintuan@squirrelreceipts.com',
        password: 'kyle123',
        phone: 4325341524,
        ID: 2,
        receipts : [
            {
                storeName: 'louvre gift shop',
                total: 10.00,
                tax: 5.00,
                creditCardName: 'AMEX',
                creditCardDigits: 1234,
                purchaseDate: new Date(),
                catagory: 'gifts',
                comment: 'a tiny replica of the mona lisa',
                reimburseable: false,
                ID: 8,
                tagId: 4
            },
            {
                storeName: 'cartier',
                total: 10000.00,
                tax: 500.00,
                creditCardName: 'AMEX',
                creditCardDigits: 1234,
                purchaseDate: new Date(),
                catagory: 'gifts',
                comment: 'a sweet watch with a diamond bezel',
                reimburseable: false,
                ID: 9,
                tagId: 4
            },
            {
                storeName: 'La Creme',
                total: 150.00,
                tax: 500.00,
                creditCardName: 'AMEX',
                creditCardDigits: 1234,
                purchaseDate: new Date(),
                catagory: 'dinner',
                comment: 'took the team out to dinner',
                reimburseable: true,
                ID: 10,
                tagId: 4
            }
        ],
        tags: [
            {
                tagName: 'Paris Trip',
                ID: 4
            }
        ]
    },
    {
        userName: 'estherSuh',
        firstName: 'esther',
        lastName: 'suh',
        email: 'estherSuh@squirrelreceipts.com',
        password: 'ester123',
        phone: 3214325544,
        ID: 3,
        receipts : [
            {
                storeName: 'Loft',
                total: 200.00,
                tax: 18.75,
                creditCardName: 'MasterCard',
                creditCardDigits: 1234,
                purchaseDate: new Date(),
                catagory: 'clothes',
                comment: 'some pants and a couple blouses',
                reimburseable: false,
                ID: 1,
                tagId: 2
            },
            {
                storeName: 'Banana Repulic',
                total: 30.00,
                tax: 4.75,
                creditCardName: 'MasterCard',
                creditCardDigits: 1234,
                purchaseDate: new Date(),
                catagory: 'clothes',
                comment: 'a belt',
                reimburseable: false,
                ID: 2,
                tagId: 2
            },
            {
                storeName: 'Ralphs',
                total: 150.00,
                tax: 18.75,
                creditCardName: 'Visa',
                creditCardDigits: 1234,
                purchaseDate: new Date(),
                catagory: 'food',
                comment: 'got some food to restock the fridge',
                reimburseable: false,
                ID: 5,
                tagId: 3
            },
            {
                storeName: 'Korean Market',
                total: 33.00,
                tax: 3.75,
                creditCardName: '',
                creditCardDigits: null,
                purchaseDate: new Date(),
                catagory: 'food',
                comment: 'noodles',
                reimburseable: false,
                ID: 6,
                tagId: 3
            },
        ],
        tags: [
            {
                tagName: 'Shopping',
                ID: 2
            },
            {
                tagName: 'Food',
                ID: 3
            }
        ]
    },
    {
        userName: 'sarahHan',
        firstName: 'sarah',
        lastName: 'han',
        email: 'sarahHan@squirrelreceipts.com',
        password: 'sarah123',
        phone: 2312324534,
        ID: 4,
        receipts : [
            {
                storeName: 'Pho King Way',
                total: 18.00,
                tax: 2.75,
                creditCardName: 'Discover',
                creditCardDigits: 1234,
                purchaseDate: new Date(),
                catagory: 'lunch',
                comment: 'bun and a coke',
                reimburseable: false,
                ID: 11,
                tagId: 5
            }
        ],
        tags: [
            {
                tagName: 'Meals',
                ID: 5
            }
        ]
    },
    {
        userName: 'steveBenedict',
        firstName: 'steve',
        lastName: 'benedict',
        email: 'steveBenedict@squirrelreceipts.com',
        password: 'steve123',
        phone: 4455678908,
        ID: 5,
        receipts : [
            {
                storeName: 'Supreme',
                total: 68.00,
                tax: 10.75,
                creditCardName: 'MasterCard',
                creditCardDigits: 1234,
                purchaseDate: new Date(),
                catagory: 'clothes',
                comment: 'box logo tee',
                reimburseable: false,
                ID: 12,
                tagId: 6
            },
            {
                storeName: 'Supreme',
                total: 250.00,
                tax: 10.75,
                creditCardName: 'MasterCard',
                creditCardDigits: 1234,
                purchaseDate: new Date(),
                catagory: 'clothes',
                comment: 'box logo hoodie',
                reimburseable: false,
                ID: 13,
                tagId: 6
            }
        ],
        tags: [
            {
                tagName: 'Streetwear',
                ID: 6
            }
        ]
    },
];

export default users;
