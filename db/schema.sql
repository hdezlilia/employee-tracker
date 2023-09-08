DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db_db;

use employee_db;

-- MINI PROJECT 
CREATE TABLE departmentes (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30)
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30), 
    salary DECIMAL, 
    department_id INTEGER
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);