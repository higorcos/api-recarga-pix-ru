const express = require("express")
const router = express.Router();
const AdminAuth = require('../../middleware/admin/AdminAuth');
const AllAuth = require('../../middleware/secondary/allAuth');
const TokenVerification = require('../../middleware/secondary/DefaultAuth');
const PurchaseOrderController = require('../../controllers/order/PurchaseOrderController')


router.post('/purchase-order', PurchaseOrderController.created); //Criar
router.get('/purchase-order/:matriculation', PurchaseOrderController.listAll); //Mostrar Informações de uma
router.get('/purchase-order/:matriculation/:txid', PurchaseOrderController.findQRcodeById); //Verificar buscar qrcode mudar status se necessário
// router.patch('/purchase-order/:id', PurchaseOrderController.updated); //Atualiza
// router.get('/purchase-order/:id', PurchaseOrderController.listById); //Mostrar um 



module.exports = router;