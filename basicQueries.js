//const express = require('express');
const mysql = require('mysql');
const sqrlDbCreds = require('./sqrlDbCreds');
const request = {
    body: {
        userId: '3'
    }
}

const connection = mysql.createConnection(sqrlDbCreds);

connection.query("SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.userId = ?",
                 [`${request.body.userId}`],
                 (error, rows) => {
                    if (error){
                        console.log('query ', error);
                    }
                    rows.forEach(element => {
                        console.log(element);
                    });
                 });
connection.end(() => {
    console.log('connection ended');
});