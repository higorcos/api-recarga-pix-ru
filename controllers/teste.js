const UsersModel = require('../models/User');

    const user = await UsersModel.findAll();
    console.log(user)
           