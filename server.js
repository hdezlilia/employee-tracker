const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: '',
        user: 'root',
        password: '',
        database:'employee_tracker'
    },
    console.log(`Connected to the employee_tracker database.`)
);

const mainMenu = () => { 
    inquirer.createPromptModule({
        type: 'list',
        name:'action',
        message:'What would you like to do?',
        choices: [
            'View All Employees', 
            'Add Employee', 
            'Update Employee Role',
            'Add Role',
            'View All Department',
            'Add Department',
        ]
    }).then (({action}) => {
        switch (action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();;
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            default:
                console.log('Goodbye');
                db.end();
        }
    });
};

const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

const viewAllRoles = () => {
    const sql = `SELECT role.id, title, salary, name AS department FROM role LEFT JOIN department ON department.id = role.department_id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

const viewAllEmployees = () => {
    const sql = `SELECT e.id,e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
    }).then(({ name }) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        db.query(sql, [name], (err, res) => {
            if (err) throw err;
            console.log(`${name} Department Added`);
            mainMenu();
        });
    });
};