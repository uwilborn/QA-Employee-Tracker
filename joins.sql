use employees_db;

SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id
 INNER JOIN department ON department.id = role.department_id where first_name= 'Yoger'and last_name = 'Max';


SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id
 INNER JOIN department ON department.id = role.department_id;


SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id
 INNER JOIN department ON department.id = role.department_id where name='R&D';

select * from employee;
select * from department;
select * from role;

SELECT * FROM ((employee INNER JOIN department ON employee.id = department.id) INNER JOIN role ON employee.id = role.id)