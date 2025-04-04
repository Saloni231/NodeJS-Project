var express = require('express');
var userRouter = express.Router();
const { logIn, fetchUsers } = require('../Controllers/userController');

userRouter.get("/users", fetchUsers);
userRouter.get("/", function(req,res){
    res.render("login");
})
userRouter.post("/", logIn);

module.exports = userRouter;