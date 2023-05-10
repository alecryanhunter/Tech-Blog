const router = require("express").Router();
const { User, Post, Comment } = require("../models");

const apiRoutes = require("./api");

// HTML ROUTES
router.get("/home",(req,res)=>{
    res.send("home page");
})

router.get("/dashboard",(req,res)=>{
    res.send("dashboard");
})

router.get("/login",(req,res)=>{
    res.send("login");
})

router.get("/signup",(req,res)=>{
    res.send("signup");
})
// END HTML ROUTES

router.use("/api",apiRoutes);

module.exports = router;