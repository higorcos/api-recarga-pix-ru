const express = require("express")
const router = express.Router();
const AdminAuth = require('../../middleware/admin/AdminAuth');
const AllAuth = require('../../middleware/secondary/allAuth');
const TokenVerification = require('../../middleware/secondary/DefaultAuth');
const OrderTypeController = require('../../controllers/order/OrderTypeController')


router.post('/order-type', AdminAuth, OrderTypeController.created); //Criar Status
router.patch('/order-type/:id', AdminAuth, OrderTypeController.updated); //Atualiza
router.get('/order-type', TokenVerification, OrderTypeController.listAll); //Mostrar Informações de uma
router.get('/order-type/:id', TokenVerification, OrderTypeController.listById); //Mostrar um 



module.exports = router;