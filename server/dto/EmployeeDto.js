export class EmployeeDto {
    name
    surname
    patronymic
    employee_type
    birthday
    address
    phone
    snils
    login
    password

    constructor(body) {
        this.name = body.name;
        this.surname = body.surname;
        this.patronymic = body.patronymic;
        this.employee_type = body.employee_type;
        this.birthday = body.birthday;
        this.address = body.address;
        this.phone = body.phone;
        this.snils = body.snils;
        this.login = body.login;
        this.password = body.password;
    }
}