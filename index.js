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
            // {
            //     name: "title",
            //     message: "Employee's Title?",
            //     type: "list",
            //     choices: ["QA Tech", "QA Analyst", "QA Engineer", "QA Manager", "QA Director"]
            // },
            // {
            //     name: "annualSalary",
            //     message: "Employee's Salary?",
            //     type: "input"
            // },
            // {
            //     name: "firstname",
            //     message: "Employee's First Name?",
            //     type: "input"
            // },
            // {
            //     name: "lastname",
            //     message: "Employee's Last Name?",
            //     type: "input"
            // },
            // {
            //     name: "erole",
            //     message: "Employee's Role ID?",
            //     type: "list",
            //     choices: ["1", "2", "3", "4", "5"]
            // },
            // {
            //     name: "manager",
            //     message: "Employee's Manager?",
            //     type: "list",
            //     choices: ["4", "5", ""]
            // },
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query("INSERT INTO department set ?",
                    {
                        id: answer.identification,
                        name: answer.departmentName,
                    },
                // ['INSERT INTO role VALUES ?',
                //     {
                //         id: answer.identification,
                //         title: answer.title,
                //         salary: answer.annualSalary,

                //     }],
                // ['INSERT INTO employee VALUES ?',
                //     {
                //         id: answer.identification,
                //         first_name: answer.firstname,
                //         last_name: answer.lastname,
                //         role_id: answer.erole,
                //         manager_id: answer.manager,

                //     }],
                
                (err) => {
                    if (err) throw err;
                    console.log('Your employee item was created successfully!');
                   // re-prompt the user for if they want to continue
                    rolesetup();
                }
            );
        });
};

const rolesetup = () => {
    // prompt for info about the employee being added
    inquirer
        .prompt([
            {
                name: "identification",
                message: "Employees ID?",
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
            
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query("INSERT INTO role set ?",
           {
                id: answer.identification,
                title: answer.title,
                salary: answer.annualSalary,

            },           
                (err) => {
                    if (err) throw err;
                    console.log('Your employee item was created successfully!');
                   // re-prompt the user for if they want to continue
                    employeesetup();
                }
            );
        });
};


const employeesetup = () => {
    // prompt for info about the employee being added
    inquirer
        .prompt([
            {
                name: "identification",
                message: "Employees ID?",
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
                name: "erole",
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
            connection.query("INSERT INTO employee set ?",
                {
                        id: answer.identification,
                        first_name: answer.firstname,
                        last_name: answer.lastname,
                        role_id: answer.erole,
                        manager_id: answer.manager,

                    },
                
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
            connection.query("SELECT * FROM ((employee INNER JOIN department ON employee.id = department.id) INNER JOIN role ON employee.id = role.id)  where first_name= ? and last_name = ?",
                [answer.firstname, answer.lastname],
                (err, data) => {
                    if (err) throw err;
                    console.log('Here is the employee!');
                    console.table(data)
                    // re-prompt the user for if they want to continue
                    start();
                }
            );
        });
};

const allView = () => {
    connection.query("SELECT * FROM ((employee INNER JOIN department ON employee.id = department.id) INNER JOIN role ON employee.id = role.id)",

        (err, data) => {
            if (err) throw err;
            console.log('Here are all the employees!');
            console.table(data)
            // re-prompt the user for if they want to continue
            start();
        }
    );
}
const departmentView = () => {
    // prompt for info about the employee being viewed
    inquirer
        .prompt([
            {
                name: "dname",
                message: "Name of department you wish to view?",
                type: "input"
            },
        ])
        .then((answer) => {
            // when finished prompting, filter db with that info
            connection.query("SELECT * FROM ((department INNER JOIN employee ON department.id = employee.id) INNER JOIN role ON department.id = role.id) where name = ?",
                [answer.dname],
                (err, data) => {
                    if (err) throw err;
                    console.log('Here are the employees in this department!');
                    console.table(data)
                    // re-prompt the user for if they want to continue
                    start();
                }
            );
        });
};

const managerView = () => {
    inquirer
        .prompt([
            {
                name: "mname",
                message: "ID of manager's employees you wish to view?",
                type: "input"
            },
        ])
        .then((answer) => {
            connection.query("SELECT * FROM ((employee INNER JOIN department ON employee.id = department.id) INNER JOIN role ON employee.id = role.id) where manager_id = ?",
                [answer.mname],
                (err, data) => {
                    if (err) throw err;
                    console.log('Here are the employees who report to this manager!');
                    console.table(data)
                    // re-prompt the user for if they want to continue
                    start();
                }
            );
        });
    };

const roleView = () => {
        inquirer
            .prompt([
                {
                    name: "rname",
                    message: "Employee's role you wish to view?",
                    type: "input"
                },
            ])
            .then((answer) => {
                connection.query("SELECT * FROM ((employee INNER JOIN department ON employee.id = department.id) INNER JOIN role ON employee.id = role.id) where role_id = ?",
                    [answer.rname],
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


// function to Update employees roles in the database
const updateEmployee = () => {
    inquirer
        .prompt({
            name: 'updateChoice',
            type: 'list',
            message: 'What do you want to update?',
            choices: ['UPDATE EMPLOYEE ROLE', 'UPDATE EMPLOYEE MANAGER'],
        })
        .then((answer) => {
            // based on their answer, call the one of the functions
            if (answer.updateChoice === 'UPDATE EMPLOYEE ROLE') {
                console.log("Search employee by first and last name")
                roleUpdate();
            } else if (answer.updateChoice === 'UPDATE EMPLOYEE MANAGER') {
                managerUpdate();
            } else {
                connection.end();
                
            }
        });
};



const roleUpdate = () => {
    inquirer
    .prompt([
        {
            name: "fupdate",
            message: "Employee's First Name?",
            type: "input"
        },
        {
            name: "lupdate",
            message: "Employee's Last Name?",
            type: "input"
        },
        {
            name: "rupdate",
            message: "Employee's new role?",
            type: "list",
            choices: ["1", "2", "3", "4", "5"]
        },
    ])
        .then((answer) => {
            connection.query("UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?",
                [answer.rupdate,answer.fupdate,answer.lupdate],
                
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

    const managerUpdate = () => {
        inquirer
        .prompt([
            {
                name: "fupdate",
                message: "Employee's First Name?",
                type: "input"
            },
            {
                name: "lupdate",
                message: "Employee's Last Name?",
                type: "input"
            },
            {
                name: "mupdate",
                message: "Employee's new role?",
                type: "list",
                choices: ["4", "5",""]
            },
        ])
            .then((answer) => {
                connection.query("UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?",
                    [answer.mupdate,answer.fupdate,answer.lupdate],
                    
                    (err, data) => {
                        if (err) throw err;
                        console.log('Your employee has a new manager!');
                        console.table(data)
                        // re-prompt the user for if they want to continue
                        start();
                    }
                );
            });
        };
    
    

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
