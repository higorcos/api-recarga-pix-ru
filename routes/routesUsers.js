const express = require("express")
const router = express.Router();
const AdminAuth = require('../middleware/admin/AdminAuth');
const AllAuth = require('../middleware/secondary/allAuth');
const TokenVerification = require('../middleware/secondary/DefaultAuth');
const UserController = require('../controllers/UserController')
const HomeController = require('../controllers/HomeController')


router.post('/login', UserController.login);
router.get('/user',TokenVerification,UserController.index);
router.get('/userr', UserController.index);
router.post('/user', UserController.create);
router.get('/user/:id', UserController.findById);
router.patch('/user/role/:id', UserController.updateRole);

router.post('/recovery-password', UserController.recoveryPassword);
router.put('/recovery-password/:token', UserController.changePassword);
router.get('/recovery-password/:token', (req,res)=>{
    return res.send("Redirect para rota de formulário para nova senha");
});


router.get('/', HomeController.index);

module.exports = router;