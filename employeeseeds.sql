use employees_db;

-- insert into employee (first_name,last_name,role_id,manager_id) values ('Jim','Spring',1,0);
-- insert into employee (first_name,last_name,role_id,manager_id) values ('Hallo','Cast',2,0);
-- insert into employee (first_name,last_name,role_id,manager_id) values ('Talli','Juckle',3,0);
-- insert into employee (first_name,last_name,role_id,manager_id) values ('Yoger','Max',4,0);

insert into employee (first_name,last_name,role_id,manager_id) values ('Harper','Lee',5,1);
insert into employee (first_name,last_name,role_id,manager_id) values ('Jane','Meyers',6,2);
insert into employee (first_name,last_name,role_id,manager_id) values ('Denzel','Washington',7,3);
insert into employee (first_name,last_name,role_id,manager_id) values ('Chris','Tucker',8,4);

insert into employee (first_name,last_name,role_id,manager_id) values ('Opera','Goldberg',5,1);
insert into employee (first_name,last_name,role_id,manager_id) values ('Halle','Berry',6,2);
insert into employee (first_name,last_name,role_id,manager_id) values ('Don','Johnson',7,3);
insert into employee (first_name,last_name,role_id,manager_id) values ('Eddie','King',8,4);

select * from employee;

delete from employee where id>4;
