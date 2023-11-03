const express = require("express");
const routes = express.Router();

const routesUsers = require('./routes/routesUsers')
const routesCard = require('./routes/routesCard')
const routesFoodValue = require('./routes/routesFoodValue')
const routesOrderStatusType = require('./routes/routesOrderStatusType')


routes.use(routesUsers)
routes.use(routesCard)
routes.use(routesOrderStatusType)

module.exports = routes;
   