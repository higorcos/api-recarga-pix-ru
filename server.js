var bodyParser = require('body-parser')
var routes = require("./routes")
const cors = require('cors');
var express = require("express")
var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//cors
app.use(
    cors({
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      origin: "*",
      allowedHeaders: "*",
    })
  );

app.use(routes);

app.listen(3003,() => {
    console.log("Servidor rodando")
});
