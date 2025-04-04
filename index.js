let express = require("express");
let app = express();

const mongoose = require('mongoose');
const path = require('path');
const body_parser = require('body-parser'); 
const products = require('./Router/Product_route.js');
const users = require('./Router/User_route.js');
const dashboard = require('./Router/dashboard_route');
const category = require('./Router/category_route');
const {isLoggedIn} = require('./tokenGenerator');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./swagger.json");

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")))
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());

app.use('/products', isLoggedIn ,products);
app.use('/login', users);
app.use("/dashboard", dashboard);
app.use("/category", category);

app.get("/", function(req,res){
    res.render("index")
})

app.get("*", function(req,res) {
    res.status(401).send("Page Not Found");
})

mongoose.connect('mongodb://127.0.0.1:27017/Project_Nature_App', (error,db) => {
    if(!error) {
        console.log("Connected to MongoDB")
    }
    else {
        console.log('Error in connecting to monogodb');
    }
});


app.listen(3001);