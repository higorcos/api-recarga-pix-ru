var bodyParser = require('body-parser')
var express = require("express")
var app = express()
var routes = require("./routes")
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(routes);

app.listen(3003,() => {
    console.log("Servidor rodando")
});
