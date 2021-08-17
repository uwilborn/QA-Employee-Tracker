// packages needed for this application
const fs = require('fs');
var inquirer = require('inquirer');
const mysql = require('mysql');

//Connections
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port, if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: '',
    database: 'qaemployees_db',
});

const afterConnection = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
};

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    // run the start function after the connection is made to prompt the user
    //   afterConnection();
    start();
});


// function which prompts the user for what action they should take (i.e. add, view, update, delete)
const start = () => {
    inquirer
        .prompt({
            name: 'itemChoice',
            type: 'list',
            message: 'Would you like to [ADD], [VIEW], [UPDATE] or [DELETE] an employee?',
            choices: ['ADD', 'VIEW', 'UPDATE', 'DELETE', "EXIT"],
        })
        .then((answer) => {
            // based on their answer, call the one of the functions
            if (answer.itemChoice === 'ADD') {
                addEmployee();
            } else if (answer.itemChoice === 'VIEW') {
                viewEmployee();
            } else if (answer.itemChoice === 'UPDATE') {
                updateEmployee();
            } else if (answer.itemChoice === 'DELETE') {
                deleteEmployee();
            } else {
                connection.end();
                process.exit(0);
            }
        });
};



// function to handle ADDING new employees to the database
const addEmployee = () => {
    // prompt for info about the employee being added
    inquirer
        .prompt([
            {
                name: "identification",
                message: "Employees ID?",
                type: "input"
            },
            {
                name: "departmentName",
                message: "Department Name?",
                type: "input"
            },
            {
                name: "title",
                message: "Employee's Title?",
                type: "list",
                choices: ["QA Tech", "QA Analyst", "QA Engineer", "QA Manager", "QA Director"]
            },
            {
                name: "annualSalary",
                message: "Employee's Salary?",
                type: "input"
            },
            {
                name: "firstname",
                message: "Employee's First Name?",
                type: "input"
            },
            {
                name: "lastname",
                message: "Employee's Last Name?",
                type: "input"
            },
            {
                name: "role",
                message: "Employee's Role ID?",
                type: "list",
                choices: ["1", "2", "3", "4", "5"]
            },
            {
                name: "manager",
                message: "Employee's Manager?",
                type: "list",
                choices: ["4", "5", ""]
            },
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                ['INSERT INTO department SET ?',
                    {
                        id: answer.identification,
                        name: answer.departmentName,

                    }],
                ['INSERT INTO role SET ?',
                    {
                        id: answer.identification,
                        title: answer.title,
                        salary: answer.annualSalary,

                    }],
                ['INSERT INTO employee SET ?',
                    {
                        id: answer.identification,
                        first_name: answer.firstname,
                        last_name: answer.lastname,
                        role_id: answer.role,
                        manager_id: answer.manager,

                    }]
                ,
                (err) => {
                    if (err) throw err;
                    console.log('Your employee item was created successfully!');
                    // re-prompt the user for if they want to continue
                    start();
                }
            );
        });
};


// function to handle VIEWING employees in the database
const viewEmployee = () => {
    inquirer
        .prompt({
            name: 'viewChoice',
            type: 'list',
            message: 'How would you like to view an employee(s)?',
            choices: ['VIEW AN EMPLOYEE', 'VIEW ALL EMPLOYEES', 'VIEW EMPLOYEES BY DEPARTMENT', 'VIEW EMPLOYEES BY MANAGER', 'VIEW EMPLOYEES BY ROLE'],
        })
        .then((answer) => {
            // based on their answer, call the one of the functions
            if (answer.viewChoice === 'VIEW AN EMPLOYEE') {
                console.log("Search employee by first and last name")
                idView();
            } else if (answer.viewChoice === 'VIEW ALL EMPLOYEES') {
                allView();
            } else if (answer.viewChoice === 'VIEW EMPLOYEES BY DEPARTMENT') {
                departmentView();
            } else if (answer.viewChoice === 'VIEW EMPLOYEES BY MANAGER') {
                managerView();
            } else if (answer.viewChoice === 'VIEW EMPLOYEES BY ROLE') {
                roleView();
            } else {
                connection.end();
            }
        });
};



const idView = () => {
    // prompt for info about the employee being viewed
    inquirer
        .prompt([
            {
                name: "firstname",
                message: "Employee's First Name?",
                type: "input"
            },
            {
                name: "lastname",
                message: "Employee's Last Name?",
                type: "input"
            },
        ])
        .then((answer) => {
            // when finished prompting, filter db with that info
            connection.query("select * from employee where first_name= ? and last_name = ?;",
                [answer.firstname, answer.lastname],


                (err, data) => {
                    if (err) throw err;
                    console.log('Your employee item was created successfully!');
                    console.table(data)
                    // re-prompt the user for if they want to continue
                    start();
                }
            );
        });
};

const allView = () => {
    connection.query("select * from employee;",

        (err, data) => {
            if (err) throw err;
            console.log('Your employee item was created successfully!');
            console.table(data)
            // re-prompt the user for if they want to continue
            start();
        }
    );
    }

// Create a function to initialize app
function init() {
    inquirer.prompt(questions)
        .then(function (response) {
            console.log(response)

            console.log(READMEContent);

            fs.writeFile('README.md', READMEContent, function (err, message) {
                console.log('file generated');
                console.table(res);
                connection.end();
            })
        })
}

// Function call to initialize app
// init();


