const express = require("express")
const router = express.Router();
const AdminAuth = require('../../middleware/admin/AdminAuth');
const AllAuth = require('../../middleware/secondary/allAuth');
const OwnerOrAdmin = require('../../middleware/secondary/OwnerOrAdmin');
const TokenVerification = require('../../middleware/secondary/DefaultAuth');
const PurchaseOrderController = require('../../controllers/order/PurchaseOrderController')


router.post('/purchase-order', TokenVerification, OwnerOrAdmin, PurchaseOrderController.created); //Criar
router.get('/purchase-order/:matriculation', TokenVerification, OwnerOrAdmin, PurchaseOrderController.listAll); //Mostrar Informações de uma
router.get('/purchase-order/:matriculation/:txid', TokenVerification, OwnerOrAdmin, PurchaseOrderController.findQRcodeById); //Verificar buscar qrcode mudar status se necessário
// router.patch('/purchase-order/:id', PurchaseOrderController.updated); //Atualiza
// router.get('/purchase-order/:id', PurchaseOrderController.listById); //Mostrar um 



module.exports = router;