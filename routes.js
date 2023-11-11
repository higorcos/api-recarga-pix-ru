const express = require("express");
const routes = express.Router();

const routesUsers = require('./routes/routesUsers');
const routesCard = require('./routes/routesCard');
const routesFoodValue = require('./routes/routesFoodValue');
const routesOrderStatusType = require('./routes/order/routesOrderStatusType');
const routesOrderType = require('./routes/order/routesOrderType');
const routesPurchaseOrder = require('./routes/order/routesPurchaseOrder');
const routesApiPix = require('./routes/api/apiPix/routesApiPix');

routes.use(routesCard);
routes.use(routesUsers);
routes.use(routesApiPix);
routes.use(routesFoodValue);
routes.use(routesOrderType);
routes.use(routesPurchaseOrder);
routes.use(routesOrderStatusType);

module.exports = routes;
   