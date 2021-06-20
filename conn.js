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
        message: "What would you like to do?",
        type: "list",
        choices: [
          "Add Department",
          "Add Role",
          "Add Employee",
          "View Departments",
          "View Roles",
          "View Employees",
          "Update Employee Role",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
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
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Departments":
          viewDepartment();
          break;
        case "View Roles":
          viewRole();
          break;
        case "View Employees":
          viewEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Employee":
          deleteEmployee();
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
      message: "What's the name of the Department you want to add?",
    })
    .then((answer) => {
      const db = "INSERT INTO department SET ?";
      connection.query(db, answer, (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("You added a new Department");
        console.log(
          "---------------------------------------------------------------------"
        );
        start();
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What's the name of the Role you want to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this Role?",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the Department Id that goes with this Role?",
      },
    ])
    .then((answer) => {
      const db = "INSERT INTO role SET ?";
      connection.query(db, answer, (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("You added a new Role");
        console.log(
          "---------------------------------------------------------------------"
        );
        start();
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What's the first name of the Employee you want to add?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What's the last name of the Employee you want to add?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What's the Role Id that goes with this Employee?",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What's the Manager Id that goes with this Employee?",
      },
    ])
    .then((answer) => {
      const db = "INSERT INTO employee SET ?";
      connection.query(db, answer, (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("You added a new Employee");
        console.log(
          "---------------------------------------------------------------------"
        );
        start();
      });
    });
};

const viewDepartment = () => {
  console.log(
    "--------------------------Departments Table--------------------------"
  );
  const db = "SELECT * FROM department";
  connection.query(db, (err, res) => {
    if (err) throw err;
    res.forEach(({ id, name }) => {
      console.log(
        "---------------------------------------------------------------------"
      );
      console.log(`ID: ${id} || Name: ${name}`);
      console.log(
        "---------------------------------------------------------------------"
      );
      // console.log("View Department");
    });
    // console.table(res);
    console.log("We are in viewDepartment function!");
    console.log(
      "---------------------------------------------------------------------"
    );
    start();
  });
};

const viewRole = () => {
  console.log(
    "-----------------------------Roles Table-----------------------------"
  );
  const db = "SELECT * FROM role";
  connection.query(db, (err, res) => {
    if (err) throw err;
    res.forEach(({ id, title, salary, department_id }) => {
      console.log(
        "---------------------------------------------------------------------"
      );
      console.log(
        `ID: ${id} || Title: ${title} || Salary: $${salary}.00 || Department ID: ${department_id}`
      );
      console.log(
        "---------------------------------------------------------------------"
      );
    });
    console.log(" We are in the ViewRole function");
    console.log(
      "---------------------------------------------------------------------"
    );
    start();
  });
};

const viewEmployee = () => {
  console.log(
    "---------------------------Employees Table---------------------------"
  );
  const db = "SELECT * FROM employee";
  connection.query(db, (err, res) => {
    if (err) throw err;
    res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
      console.log(
        "---------------------------------------------------------------------"
      );
      console.log(
        `ID: ${id} || First Name: ${first_name} || Last Name: ${last_name} || Role ID: ${role_id} || Manager ID: ${manager_id}`
      );
      console.log(
        "---------------------------------------------------------------------"
      );
    });
    console.log(" We are in the ViewEmployee function");
    console.log(
      "---------------------------------------------------------------------"
    );
    start();
  });
};

const deleteDepartment = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What's the id of the Department you want to delete?",
      },
    ])
    .then((answer) => {
      const db = "DELETE FROM department WHERE ?";
      connection.query(db, answer, (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("You deleted a Department");
        console.log(
          "---------------------------------------------------------------------"
        );
        start();
      });
    });
  console.log("We are in the Delete Department function");
};

const deleteRole = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What's the id of the Role you want to delete?",
      },
    ])
    .then((answer) => {
      const db = "DELETE FROM role WHERE ?";
      connection.query(db, answer, (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("You deleted a Role");
        console.log(
          "---------------------------------------------------------------------"
        );
        start();
      });
    });
  console.log("We are in the Delete Role function");
};

const deleteEmployee = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What's the id of the Employee you want to delete?",
      },
    ])
    .then((answer) => {
      const db = "DELETE FROM employee WHERE ?";
      connection.query(db, answer, (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("You deleted a Employee");
        console.log(
          "---------------------------------------------------------------------"
        );
        start();
      });
    });
  console.log("We are in the Delete Employee function");
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Do you want to update the Title?",
      },
      // {
      //   name: "salary",
      //   type: "input",
      //   message: "Do you want to update the Salary",
      // },
      {
        name: "id",
        type: "input",
        message: "What is the id of the Role you want to update?",
      },
    ])
    .then((answer) => {
      // connection.query('SELECT * FROM role JOIN employee ON role.id = employee.role_id');
      connection.query("INSERT INTO role SET title = ? WHERE id = ?", [answer.title, answer.id], (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("You updated the Role");
        start();
      });
    });










  // inquirer
  //   .prompt([
  //     {
  //       name: "title",
  //       type: "input",
  //       message: "Do you want to update the Title",
  //     },
  //     {
  //       name: "salary",
  //       type: "input",
  //       message: "Do you want to update the Salary",
  //     },
  //     {
  //       name: "id",
  //       type: "input",
  //       message: "What is the ID that goes with this Role that you're updating?",
  //     },
  //   ])
  //   .then((answer) => {
  //     const db = "UPDATE role SET salary = 70000 WHERE role.id = 3";
  //     connection.query(db, (err, res) => {});
  //     // const db = "UPDATE role SET ? WHERE ?";
  //   });

  // connection.query(db);

  // console.log("We are in the Update Employee function");
  // start();
};
