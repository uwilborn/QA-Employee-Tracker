// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',

//   // Your port, if not 3306
//   port: 3306,

//   // Your username
//   user: 'root',

//   // Be sure to update with your own MySQL password!
//   password: '',
//   database: 'qaemployees_db',
// });

// const afterConnection = () => {
//   connection.query('SELECT * FROM employee', (err, res) => {
//     if (err) throw err;
//     console.table(res);
//     connection.end();
//   });
// };

// // connect to the mysql server and sql database
// connection.connect((err) => {
//   if (err) throw err;
//   console.log(`connected as id ${connection.threadId}`);
//   // run the start function after the connection is made to prompt the user
//   afterConnection();
// });



