const express = require("express");
const routes = express.Router();

const routesUsers = require('./routes/routesUsers')
const routesCard = require('./routes/routesCard')


routes.use(routesUsers)
routes.use(routesCard)

module.exports = routes;
   