const express = require("express")
const router = express.Router();
const AdminAuth = require('../middleware/admin/AdminAuth');
const AllAuth = require('../middleware/secondary/allAuth');
const TokenVerification = require('../middleware/secondary/DefaultAuth');
const OrderTypeController = require('../controllers/OrderTypeController')


router.post('/order-type', OrderTypeController.created); //Criar Status
router.patch('/order-type/:id', OrderTypeController.updated); //Atualiza
router.get('/order-type', OrderTypeController.listAll); //Mostrar Informações de uma
router.get('/order-type/:id', OrderTypeController.listById); //Mostrar um 



module.exports = router;