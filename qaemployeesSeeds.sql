DROP DATABASE IF EXISTS qaemployees_db;

create database qaemployees_db;

USE qaemployees_db;

-- Design a database schema containing three tables

CREATE TABLE department (
    id integer Primary key, 
    name varchar(30)
);

create table role (
    id integer primary key, 
    title varchar(30), 
    salary decimal(10,2)
);

create table employee (
    id integer primary key,
    first_name varchar(30), 
    last_name varchar(30),
    role_id integer,
    manager_id integer null
    );

-- Creates new rows containing data in all named columns--
INSERT INTO department (id, name)
VALUES (010203, "Quality");

INSERT INTO role (id, title, salary)
VALUES (476, "QA Engineer", 87000.34);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (76, "Jessica", "Stallworth", 4, 5);


-- Command-line application that allows the user to add departments, roles, employees;

-- Command-line application that allows the user to view departments, roles, employees

-- Command-line application that allows the user to update roles;

-- Command-line application that allows the user to update manager_id;
-- Command-line application that allows the user to view manager_id;
-- Command-line application that allows the user to delete departments, roles, employees;
 

 -- Command-line application that allows the user to view the total utilized budget of a department (ie the combined salaries of all employees in that department);
