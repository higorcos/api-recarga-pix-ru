const express = require("express");
const routes = express.Router();

const routesUsers = require('./routes/routesUsers')
const routesCard = require('./routes/routesCard')
const routesFoodValue = require('./routes/routesFoodValue')


routes.use(routesUsers)
routes.use(routesCard)
routes.use(routesFoodValue)

module.exports = routes;
   