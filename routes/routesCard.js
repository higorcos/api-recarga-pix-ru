const express = require("express")
const router = express.Router();
const AdminAuth = require('../middleware/admin/AdminAuth');
const AllAuth = require('../middleware/secondary/allAuth');
const TokenVerification = require('../middleware/secondary/DefaultAuth');
const CardController = require('../controllers/CardController')


// router.get('/card', UserController.login);
router.post('/card', CardController.created);
router.patch('/card/add', CardController.addAndUpdate);
// router.patch('/card/subtract', CardController.subtractAndUpdate);
// router.patch('/user/card/:id', UserController.updateCard);

module.exports = router;