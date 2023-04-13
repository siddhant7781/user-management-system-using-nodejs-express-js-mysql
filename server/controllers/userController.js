const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'usermanagement',

})


exports.view = (req, res) => {


    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("database connected as ID ", connection.threadId);

        //user the connection
        connection.query(`SELECT * FROM user WHERE status='active'; `, (err, rows) => {
            //when done with connection,release it
            connection.release();

            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }
            // console.log('the data from user table: \n', rows);
        });
    });

}

//find user by search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("database connected as ID ", connection.threadId);


        let searchTerm = req.body.search;

        //user the connection
        connection.query(`SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? `, ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            //when done with connection,release it
            connection.release();

            if (!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }
            // console.log('the data from user table: \n', rows);
        });
    });


}

//add new user
exports.form = (req, res) => {

    res.render('add-user')


}