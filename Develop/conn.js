const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root1234",
  database: "employeeTrackerDB",
});

// Connection to Database
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  // connection.end();
  start();
});

const start = () => {
  inquirer
    .prompt([
      {
        name: "task",
        message: "What do you want to do?",
        type: "list",
        choices: [
          "Add Department",
          "Add Role",
          "Add Employee",
          "View Departments",
          "View roles",
          "View Employees",
          "Update Employee Role",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.task) {
        case "Add a Department":
          break;
        case "Add a Role":
          break;
        case "Add an Employee":
          break;
        case "View all Departments":
          break;
        case "View all Roles":
          break;
        case "View all Employees":
          break;
        case "Update Employee Role":
          break;
        default:
          console.log(`Invalid action: ${answer.task}`);
          break;
      }
    });
};
