const db = require("../db");
const bcrypt = require("bcrypt");



class UserController {

    async registration(req, res, next) {
        try {
            let employee = req.body
            if (employee.login != '') {
                const user = await db.query(`SELECT *
                                             FROM employee
                                             WHERE login = $1`, [employee.login])
                if (user.rows.length > 0) {
                    return res.json({message: `Сотрудник с логином ${employee.login} уже существует`});
                }
            }
            const role = await db.query('SELECT * FROM employee_type WHERE code = $1', [employee.id_employee_type])
            const hashPass = await bcrypt.hash(employee.password, 3);
            employee.password = hashPass;
            if (employee.id_employee_type === '') {
                return res.json({message: `Выбирите должность`});
            }
            employee.id_employee_type = String(role.rows[0].id);
            console.log(Object.values(employee))
            const newUser = await db.query(`INSERT INTO employee(name, surname, patronymic, id_employee_type, birthday,
                                                                 address, phone, snils, login, password)
                                            values ($1, $2, $3, $4, $5, $6, $7, $8, $9,
                                                    $10) RETURNING *`, Object.values(employee))
            return res.status(201).json({value: newUser, message: "Сотрудник зарегестрирован"});

        } catch (e) {
            return res.status(500).json({message: "Произошла ошика на стороне сервера"});
        }
    }

    async login(req, res, next) {
        try {
            let employee = req.body;
            console.log(employee)
            if (employee.login != '' && employee.password != '') {
                console.log("-")
                const dbEmployee = await db.query(`SELECT *
                                                   FROM employee
                                                   WHERE login = $1`, [employee.login])

                if (dbEmployee.rows.length === 0) {
                    return res.json({message: `Не верный логин или пароль`});
                } else {
                    let newEmployee = dbEmployee.rows[0]
                    const role = await db.query('SELECT * FROM employee_type WHERE id = $1', [newEmployee.id_employee_type])
                    newEmployee.id_employee_type = role.rows[0].code;
                    const comparePass = bcrypt.compareSync(employee.password, newEmployee.password);
                    if (comparePass) {
                        return res.json({message: `Добро пожаловать`, employee: newEmployee});
                    } else {
                        return res.json({message: `Не верный логин или пароль`});
                    }
                }
            } else {
                return res.json({message: `Заполните поля`});
            }
        } catch (e) {
            console.log(e)
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async test(req, res, next) {
        try {
            res.json(['1', '2'])
        } catch (e) {

        }
    }
}

module.exports = new UserController();