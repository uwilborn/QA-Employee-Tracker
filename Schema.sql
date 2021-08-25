DROP DATABASE IF EXISTS employees_db;

create database employees_db;

USE employees_db;

-- Design a database schema containing three tables

CREATE TABLE department (
    id integer Primary key Auto_increment, 
    name varchar(30)
);

create table role (
    id integer primary key Auto_increment  , 
    title varchar(30), 
    salary decimal(10,2),
    department_id integer,
    foreign key fk1(department_id) references department(id)
);

create table employee (
    id integer primary key auto_increment,
    first_name varchar(30), 
    last_name varchar(30),
    role_id integer,
       manager_id integer null,
    foreign key fk2(role_id) references role(id)
    );









