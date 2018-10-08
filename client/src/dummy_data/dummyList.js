import Overview from '../components/overview';

const response = [
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
                storeName: 'Nordstrom',
                total: 10000,
                tax: 875,
                creditCardName: 'Visa',
                creditCardDigits: '1234',
                purchaseDate: '2018-09-24',
                catagory: 'Clothing',
                comment: 'a couple shirts and some socks',
                reimburseable: 0,
                ID: 7,
                tags: ['shirts', 'socks']
            }
        ],
        tags: [
            {
                tagName: 'shirts',
                ID: 1
            },
            {
                tagName: 'socks',
                ID: 32
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
                storeName: 'Louvre Gift Shop',
                total: 1000,
                tax: 500,
                creditCardName: 'AMEX',
                creditCardDigits: '1234',
                purchaseDate: '2018-09-08',
                catagory: 'Shopping',
                comment: 'a tiny replica of the mona lisa',
                reimburseable: 0,
                ID: 8,
                tags: ['Paris Trip', 'Gift']
            },
            {
                storeName: 'cartier',
                total: 10000.00,
                tax: 500.00,
                creditCardName: 'AMEX',
                creditCardDigits: '1234',
                purchaseDate: '2018-09-08',
                catagory: 'Shopping',
                comment: 'a sweet watch with a diamond bezel',
                reimburseable: 0,
                ID: 9,
                tags: ['Paris Trip']
            },
            {
                storeName: 'La Creme',
                total: 150.00,
                tax: 500.00,
                creditCardName: 'AMEX',
                creditCardDigits: '1234',
                purchaseDate: '2018-09-09',
                catagory: 'Dining',
                comment: 'took the team out to dinner',
                reimburseable: 1,
                ID: 10,
                tags: ['Paris Trip', 'Team']
            }
        ],
        tags: [
            {
                tagName: 'Paris Trip',
                ID: 4
            },
            {
                tagName: 'Gift',
                ID: 33
            },
            {
                tagName: 'Team',
                ID: 35
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
                total: 20000,
                tax: 1875,
                creditCardName: 'MasterCard',
                creditCardDigits: '1234',
                purchaseDate: '2018-10-01',
                catagory: 'Clothing',
                comment: 'some pants and a couple blouses',
                reimburseable: 0,
                ID: 1,
                tags: ['Pants', 'Blouse']
            },
            {
                storeName: 'Banana Repulic',
                total: 1999,
                tax: 475,
                creditCardName: 'MasterCard',
                creditCardDigits: '1234',
                purchaseDate: '2018-10-02',
                catagory: 'Clothing',
                comment: 'a belt',
                reimburseable: 0,
                ID: 2,
                tags: ['Belt']
            },
            {
                storeName: 'Ralphs',
                total: 15000,
                tax: 1875,
                creditCardName: 'Visa',
                creditCardDigits: '1234',
                purchaseDate: '2018-09-15',
                catagory: 'Groceries',
                comment: 'got some food to restock the fridge',
                reimburseable: 0,
                ID: 5,
                tags: []
            },
            {
                storeName: 'Korean Market',
                total: 3300,
                tax: 375,
                creditCardName: '',
                creditCardDigits: '',
                purchaseDate: '2018-09-29',
                catagory: 'Groceries',
                comment: 'noodles',
                reimburseable: 0,
                ID: 6,
                tags: []
            },
        ],
        tags: [
            {
                tagName: 'Pants',
                ID: 2
            },
            {
                tagName: 'Blouse',
                ID: 3
            },
            {
                tagName: 'Belt',
                ID: 36
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
                total: 1800,
                tax: 275,
                creditCardName: 'Discover',
                creditCardDigits: '1234',
                purchaseDate: '2018-09-05',
                catagory: 'Dining',
                comment: 'bun and a coke',
                reimburseable: 0,
                ID: 11,
                tags: ['Lunch']
            }
        ],
        tags: [
            {
                tagName: 'Lunch',
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
                total: 6800,
                tax: 1075,
                creditCardName: 'MasterCard',
                creditCardDigits: '1234',
                purchaseDate: '2018-10-05',
                catagory: 'Clothing',
                comment: 'box logo tee',
                reimburseable: 0,
                ID: 12,
                tags: ['Streetwear']
            },
            {
                storeName: 'Supreme',
                total: 25000,
                tax: 1075,
                creditCardName: 'MasterCard',
                creditCardDigits: '1234',
                purchaseDate: '2018-10-05',
                catagory: 'Clothing',
                comment: 'box logo hoodie',
                reimburseable: false,
                ID: 13,
                tags: ['Streetwear']
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

export default response;