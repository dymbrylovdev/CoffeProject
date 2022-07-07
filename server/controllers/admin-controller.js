const db = require("../db");
const {EventEmitter} = require("events");
const emitter = new EventEmitter();


class AdminController {

    async getListEmployee(req, res, next) {
        try {
            const employee = await db.query("SELECT * FROM employee");
            return res.json(employee.rows);
        }catch (err) {
            console.log(err)
        }
    }

    async getAllListOrders(req, res, next) {
        try {
            const orders = await db.query("SELECT * FROM orders");
            return res.json(orders.rows);
        }catch (err) {
            console.log(err)
        }
    }

    async delAllListOrders(req, res, next) {
        try {
            const result = await db.query("DELETE FROM orders");
            return res.json(result.rows);
        }catch (err) {
            console.log(err)
        }
    }

     async addFood(req, res, next) {
        try {
            const food = req.body;
            const newFood = await db.query("INSERT INTO food(name, img, price, id_type_food) values ($1, $2, $3, $4) RETURNING *", [food.name, food.img, food.price, food.id_type_food]);
            if (newFood) {
                return res.json({message:"Блюдо добавленно"});
            }else {
                return res.json({message:"Что то пошло не так"});
            }
        }catch (err) {
            console.log(err)
        }
    }

     async deleteEmployee(req, res, next) {
        try {
            const list = req.body;
            let result;
            console.log(req)
            for (let id of list) {
                result = await db.query("DELETE FROM employee WHERE id = $1",[id]);
            }
             if (result) {
                return res.json({message:"Удаление прошло успешно"});
            }else {
                return res.json({message:"Что то пошло не так"});
            }
        }catch (err) {
            console.log(err)
        }
    }

     async deleteFood(req, res, next) {
        try {
            const list = req.body;
            let result;
            for (let id of list) {
                result = await db.query("DELETE FROM food WHERE id = $1",[id]);
            }
            if (result) {
                return res.json({message:"Удаление прошло успешно"});
            }else {
                return res.json({message:"Что то пошло не так"});
            }
        }catch (err) {
            console.log(err)
        }
    }


}


module.exports = new AdminController();