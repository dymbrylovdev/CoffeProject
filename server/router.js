const Router = require("express").Router;
const UserController = require("./controllers/user-controller");
const FoodController = require("./controllers/food-controller");
const AdminController = require("./controllers/admin-controller");
const router = new Router();

router.post('/registration',[
    // check('login', "Логин не может быть пустым").notEmpty(),
    // check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
] ,UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/test', UserController.test);


router.get('/list_food', FoodController.getListFood);
router.get('/list_type_food', FoodController.getListTypeFood);
router.post('/is_ready', FoodController.setIsReady);
router.get('/is_disabled', FoodController.getListFoodAndDisabled);
router.get('/get_orders', FoodController.getOrders);
router.post('/set_orders', FoodController.setOrders);
router.get('/get_list_orders', FoodController.getListOrders);
router.post('/delete_order', FoodController.deleteOrder);

router.get('/get_list_employee', AdminController.getListEmployee);
router.get('/get_all_list_orders', AdminController.getAllListOrders);
router.delete('/del_all_list_orders', AdminController.delAllListOrders);
router.post('/add_food', AdminController.addFood);
router.post('/delete_employee', AdminController.deleteEmployee);
router.post('/delete_food', AdminController.deleteFood);



router.post('/delete_order', FoodController.deleteOrder);



module.exports = router;