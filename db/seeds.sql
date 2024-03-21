INSERT INTO department (id, name)
VALUES  (001, "Sales"),
        (002, "Legal"),
        (003, "Human Resources");

INSERT INTO role (id, title, salary, department_id)
VALUES  (001, "Salesman", 80000, 001),
        (002, "Sales Manager", 100000, 001),
        (003, "Lawyer", 150000, 002),
        (004, "Paralegal", 75000, 002),
        (005, "HR manager", 90000, 003);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES  (001, "Serg", "Malyshka", 002, NULL),
        (002, "Andrew", "Hojo", 001, 001);
