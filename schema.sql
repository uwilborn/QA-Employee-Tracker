DROP DATABASE IF EXISTS qaemployees_db;

create database qaemployees_db;

USE qaemployees_db;

--Design a database schema containing three tables:--
create table department (
    id int Primary key; 
    name varchar(30)
);

create table role (
    id int primary key; 
    title varchar(30); 
    salary decimal(10,2)
);

create table employee (
    id int primary key;
    first_name varchar(30); 
    last_name varchar(30);
    role_id int;
    manager_id int null))

-- Creates new rows containing data in all named columns --
INSERT INTO department (id, name)
VALUES (344, "Ahmed");


--Command-line application that allows the user to add departments, roles, employees:--

--Command-line application that allows the user to view departments, roles, employees:--

--Command-line application that allows the user to update roles:-- 



-- Updates the row where the column name is peter --
UPDATE people
SET has_pet = true, pet_name = "Franklin", pet_age = 2
WHERE id = 4;

SELECT * FROM people;


--Command-line application that allows the user to update manager_id:--
--Command-line application that allows the user to view manager_id:--
--Command-line application that allows the user to delete departments, roles, employees:--
 

 --Command-line application that allows the user to view the total utilized budget of a department (ie the combined salaries of all employees in that department):--
