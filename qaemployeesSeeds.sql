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
