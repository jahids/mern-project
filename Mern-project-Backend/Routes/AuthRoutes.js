const app = require('express');
const AuthController = require('../Controllers/AuthController');
const { register, login } = require('../Controllers/AuthController');
const { checkuser } = require('../Middlewares/AuthMiddlewares');
const router = app.Router();

router.post("/", checkuser);
router.post("/register",AuthController.register)
router.post("/login",AuthController.login)
router.get("/admin",AuthController.admin)
router.post("/update/:id",AuthController.update)
router.post("/User",AuthController.SingleUser)
router.post("/UserE/:id",AuthController.Usar)
router.post("/Delete/:id",AuthController.Delete)

module.exports = router;