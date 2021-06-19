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
          "View Roles",
          "View Employees",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.task) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          break;
        case "Add Employee":
          break;
        case "View Departments":
          viewDepartment();
          break;
        case "View Roles":
          viewRole();
          break;
        case "View Employees":
          break;
        case "Update Employee Role":
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "You want to add a Department",
    })
    .then((answer) => {
      const db = "INSERT INTO department SET ?";
      connection.query(db, answer, (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("You add a new Department");
        start();
      });
    });
};

const viewDepartment = () => {
  const db = "SELECT * FROM department;";
  connection.query(db, (err, res) => {
    if (err) throw err;
    res.forEach(({ id, name }) => {
      console.log(`Id: ${id} || Name: ${name}`);
      console.log("View Department");
    });
    // console.table(res);
    console.log("We are in viewDepartment function!");
    start();
  });
};

const viewRole = () => {
  console.log(" We go the ViewRole function");
  start();
};
