INSERT INTO department (name)
VALUES  ("Sales"),
        ("Legal"),
        ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES  ("Salesman", 80000, 001),
        ("Sales Manager", 100000, 001),
        ("Lawyer", 150000, 002),
        ("Paralegal", 75000, 002),
        ("HR manager", 90000, 003);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("Serg", "Malyshka", 002, NULL),
        ("Andrew", "Hojo", 001, 001);
