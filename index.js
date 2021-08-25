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
    database: 'employees_db',
});

// const afterConnection = () => {
//     connection.query('SELECT * FROM employee', (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         connection.end();
//     });
// };

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    // run the start function after the connection is made to prompt the user
    //   afterConnection();
    start();
});


// function which prompts the user for add, view, update, and delete employees
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
//function to add employee to the DEPARTMENT table
const addEmployee = () => {
    inquirer
    .prompt({
        name: 'viewChoice',
        type: 'list',
        message: 'Please add required information?',
        choices: ['ADD DEPARTMENT', 'ADD ROLE', 'ADD EMPLOYEE INFORMATION'],
    })
    .then((answer) => {
        // based on their answer, call one of the functions
        if (answer.viewChoice === 'ADD DEPARTMENT') {
            departmentesetup();
        } else if (answer.viewChoice === 'ADD ROLE') {
            rolesetup();
        } else if (answer.viewChoice === 'ADD EMPLOYEE INFORMATION') {
            employeesetup();
       } else {
           start()

        }
    });

    const departmentesetup = ()=>{
    //prompt for info about the department being added
    inquirer
        .prompt([
            {
                name: "departmentName",
                message: "Department Name?",
                type: "input"
            },

        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query("insert into department(name) values(?);",
               answer.departmentName,                 
                (err) => {
                    if (err) throw err;
                    console.log('Your department was added successfully!');
                    // re-prompt the user for if they want to continue
                    start();
                }
            );
        });
    }
};

//function to add employee to the ROLE table

const rolesetup = () => {
    // prompt for info about the employee being added
    inquirer
        .prompt([
            {
                name: "title",
                message: "Role Title?",
                type: "input",
            },
            {
                name: "annualSalary",
                message: "Role Salary?",
                type: "input"
            },
            {
                name: "departmentid",
                message: "Department ID?",
                type: "list",
                choices: [1,2,3,4],
            },

        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query("insert into role(title,salary,department_id)values(?,?,?);",
                [answer.title,answer.annualSalary,answer.departmentid],
                (err) => {
                    if (err) throw err;
                    console.log('Your role was created successfully!');
                    // re-prompt the user for if they want to continue
                    start();
                }
            );
        });
};

//function to add employee to the EMPLOYEE table

const employeesetup = () => {
    // prompt for info about the employee being added
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
            {
                name: "erole",
                message: "Employee's Role ID?",
                type: "list",
                choices: [1,2,3,4,5,6,7,8],
            },
            {
                name: "manager",
                message: "Employee's Manager?",
                type: "list",
                choices: [1,2,3,4],
            },
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query("insert into employee (first_name,last_name,role_id,manager_id) values (?,?,?,?);",
            [answer.firstname,answer.lastname,answer.erole,answer.manager],
                (err) => {
                    if (err) throw err;
                    console.log('Your employee was created successfully!');
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
            choices: ['VIEW AN EMPLOYEE', 'VIEW ALL EMPLOYEES', 'VIEW EMPLOYEES BY DEPARTMENT', 'VIEW EMPLOYEES BY ROLE'],
        })
        .then((answer) => {
            // based on their answer, call one of the functions
            if (answer.viewChoice === 'VIEW AN EMPLOYEE') {
                console.log("Search employee by first and last name")
                idView();
            } else if (answer.viewChoice === 'VIEW ALL EMPLOYEES') {
                allView();
            } else if (answer.viewChoice === 'VIEW EMPLOYEES BY DEPARTMENT') {
                departmentView();
            // } else if (answer.viewChoice === 'VIEW EMPLOYEES BY MANAGER') {
            //     managerView();
            } else if (answer.viewChoice === 'VIEW EMPLOYEES BY ROLE') {
                roleView();
            } else {
               start()

            }
        });
};


//View an individual employee record
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
            connection.query("SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id  where first_name= ? and last_name = ?;",
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

//View all the employees records

const allView = () => {
    connection.query("SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id;",

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
            connection.query("SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id where name= ?;",
                [answer.dname],
                (err, data) => {
                    if (err) throw err;
                    console.log('Here are the employees in this department!');
                    console.table(data)
                    // re-prompt the user for if they want to continue
                    departmentSum()
                }
            );
        });
};

//Sum the total salaries for a department
const departmentSum = () => {
    // prompt for info about the employee being viewed
    inquirer
        .prompt([
            {
                name: "dsum",
                message: "Would you like the total salaries for this department? (Y or N)",
                type: "input"
            }
        ])
        .then((answer) => {
            // when finished prompting, filter db with that info

            if (answer.dsum === 'Y') {
                connection.query("SELECT SUM(salary) FROM role",
                    [answer.dname],
                    (err, data) => {
                        if (err) throw err;
                        console.log(data);

                        // re-prompt the user for if they want to continue
                        start()
                }
        )};
        });
};


//View the records of employees with the same manager 
// const managerView = () => {
//     inquirer
//         .prompt([
//             {
//                 name: "mname",
//                 message: "ID of manager's employees you wish to view?",
//                 type: "input"
//             },
//         ])
//         .then((answer) => {
//             connection.query("SELECT * FROM ((employee INNER JOIN department ON employee.id = department.id) INNER JOIN role ON employee.id = role.id) where manager_id = ?",
//                 [answer.mname],
//                 (err, data) => {
//                     if (err) throw err;
//                     console.log('Here are the employees who report to this manager!');
//                     console.table(data)
//                     // re-prompt the user for if they want to continue
//                     start();
//                 }
//             );
//         });
// };


//View the records of employees with the same role
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
                [answer.rupdate, answer.fupdate, answer.lupdate],

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
                choices: ["4", "5", ""]
            },
        ])
        .then((answer) => {
            connection.query("UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?",
                [answer.mupdate, answer.fupdate, answer.lupdate],

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

const deleteEmployee = () => {
    inquirer
        .prompt([
            {
                name: "fdelete",
                message: "Employee's First Name?",
                type: "input"
            },
            {
                name: "ldelete",
                message: "Employee's Last Name?",
                type: "input"
            },
        ])
        .then((answer) => {
            connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?",
                [answer.fdelete, answer.lupdate],

                (err, data) => {
                    if (err) throw err;
                    console.log('Your employee item was deleted successfully!');
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
