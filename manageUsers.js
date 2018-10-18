const mysql = require('mysql');
const functions = require("./helpers.js");

module.exports = (app, connection) => {

    app.post('/api/manageUsers/checkLoginStatus', (request, response) => {
        const userId = request.session.userId;
        const output = {
            success: true,
        }
    
        if (userId){
            output.loggedIn = true;
        }
        else{
            output.loggedIn = false;
        };
        return response.status(200).send(output);
    });
    
    app.post('/api/manageUsers/login', (request, response) => {
        const {userName, password} = request.body;
        const output = {
            success: false,
            loggedIn: false
        };
    
        const status = 'active';
        connection.query("SELECT users.ID FROM users WHERE users.username=? AND users.password=SHA1(?) AND users.status=?",
                        [userName, password, status],
                        (error, rows) => {
                            output.success = true;
                            if (error){
                                output.error = error;
                                return response.status(400).send(output);
                            }else if (rows.length > 0){
                                output.userId = rows[0].ID;
                                output.loggedIn = true;
                                request.session.userId = output.userId;
                                return response.status(200).send(output);
                            }
                            output.error = 'User name or password invalid.';
                            return response.status(401).send(output);
        });
    });
    
    app.post('/api/manageUsers/logout', (request, response) => {
        const userId = request.session.userId;
        const output = {
            success: true,
            loggedIn: null
        };
        if (userId){
            request.session.destroy();
            output.loggedIn = false;
            return response.status(200).send(output);
        }else{
            output.error = 'User not logged in.'
            return response.status(400).send(output);
        }
    });
    
    app.post('/api/manageUsers/signUp', (request, response) => {
        const data = request.body;
    
        const output = {
            success: false
        };
    
        let data_validation = functions.validator(data);
    
        if(data_validation.pass){
            const encryptedPassword = mysql.raw(`SHA1('${request.body.password}')`);
            data.password = encryptedPassword;
            data.status = "active";
            
            connection.query("INSERT INTO users SET ?;",
                            [data],
                            (error, result) => {
                                if(error){
                                    output.error = error;
                                    return response.status(400).send(output);
                                }
                                connection.query("SELECT users.ID FROM users WHERE users.username=? AND users.password=? AND users.status=?",
                                                [data.userName, data.password, data.status],
                                                (error, rows) => {
                                                    output.success = true;
                                                    if (error){
                                                        output.error = error;
                                                        return response.status(400).send(output);
                                                    }else if (rows){
                                                        output.userId = rows[0].ID;
                                                        output.loggedIn = true;
                                                        request.session.userId = output.userId;
                                                        return response.status(200).send(output);
                                                    } 
                                                }
                                );
                            }
            );
        }
        else{
            output.validation = data_validation;
            return response.send(output);
        }
    });
};