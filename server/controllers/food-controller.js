const db = require("../db");
const {EventEmitter} = require("events");
const emitter = new EventEmitter();

class FoodController {
    async getListTypeFood(req, res, next) {
        try {
                const typeFood = await db.query("SELECT * FROM type_food");

                return res.json({typeFood: typeFood.rows});

        } catch (e) {
            console.log(e)
        }
    }
    async getListFood(req, res, next) {
        try {
            let food = await db.query("SELECT * FROM food");
            const typeFood = await db.query("SELECT * FROM type_food");
            food = food.rows.map(item => {
                let nameType = typeFood.rows.find(typeItem => typeItem.id === item.id_type_food);
                item.type_food = nameType.name;
                return item;
            })
            return res.json({food: food});
        } catch (e) {
            console.log(e)
        }
    }

    async getListFoodAndDisabled(req, res, next) {
        try {
            res.writeHead(200,{
                'Connection': 'keep-alive',
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
            })
            emitter.on('food', (food) => {
                console.log(food)
                res.write(`data: ${JSON.stringify(food)} \n\n`);
            })
        } catch (e) {
            console.log(e)
        }
    }

    async setIsReady(req, res, next) {
        try {
            let food = req.body;
            const newFood = await db.query("UPDATE food SET is_ready = $1 WHERE id = $2 RETURNING *", [food.is_ready, food.id]);
            emitter.emit('food', newFood.rows[0]);

        } catch (e) {
            console.log(e)
        }
    }
    async getListOrders(req, res, next){
        try {
            const orders = await db.query("SELECT * FROM orders where is_ready = false");
            return res.json(orders.rows);
        } catch (e) {
            console.log(e)
        }
    }
    async getOrders(req, res, next) {
        try {
            res.writeHead(200,{
                'Connection': 'keep-alive',
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
            })
            emitter.on('orders', (orders) => {
                res.write(`data: ${JSON.stringify(orders)} \n\n`);
            })
        } catch (e) {
            console.log(e)
        }
    }

    async setOrders(req, res, next) {
        try {
            let order = req.body;
            const orders = await db.query("INSERT INTO orders(number, food) values($1,$2) RETURNING *", [order.number, JSON.stringify(order.food)]);
            if (order) {
                emitter.emit('orders', orders.rows[0]);
                return res.json();
            }
        } catch (e) {
            console.log(e)
        }
    }

    async deleteOrder(req, res, next) {
        try {
            let order = req.body;
            const result = await db.query("UPDATE orders SET is_ready = $1 WHERE id = $2 RETURNING *", [true, order.id]);
            return res.json(result.rows[0]);
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new FoodController();