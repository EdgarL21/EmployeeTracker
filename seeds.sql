DROP DATABASE IF EXISTS employeetrackerdb;
CREATE DATABASE employeetrackerdb;

USE employeetrackerdb;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Lead");

INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 90000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Locke", 1, null);

------------------------------------------------------------------------

INSERT INTO department (name)
VALUES ("Dev Team");

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Dev", 100000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Monica", "Smith", 2, 1);


-- INSERT INTO department (name)
-- VALUES ("Dev Team");

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Dev", 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Davis", 3, 1);

UPDATE role
SET salary = 75000
WHERE role.id = 3;