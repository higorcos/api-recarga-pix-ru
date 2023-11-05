const express = require("express")
const router = express.Router();
const AdminAuth = require('../middleware/admin/AdminAuth');
const AllAuth = require('../middleware/secondary/allAuth');
const TokenVerification = require('../middleware/secondary/DefaultAuth');
const OrderStatusTypeController = require('../controllers/OrderStatusTypeController')


router.post('/order-status-type', OrderStatusTypeController.created); //Criar Status
router.patch('/order-status-type/:id', OrderStatusTypeController.updated); //Atualiza
router.get('/order-status-type', OrderStatusTypeController.listAll); //Mostrar Informações de uma
router.get('/order-status-type/:id', OrderStatusTypeController.listById); //Mostrar um 



module.exports = router;