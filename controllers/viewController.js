const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// HOME PAGE
router.get("/home",(req,res)=>{
    Post.findAll({
        include: {
            model: User
        }
    })
    .then(allPosts=>{
        const posts = allPosts.map(post=>post.get({plain:true}))
        res.render("home",{posts})
    })
})

// DASHBOARD
router.get("/dashboard",(req,res)=>{
    res.render("dashboard");
});

// LOGIN
router.get("/login",(req,res)=>{
    res.render("login");
});

// SIGNUP
router.get("/signup",(req,res)=>{
    res.render("signup");
});

// POST
router.get("/post/:id",(req,res)=>{
    console.log(req.params.id);
    Post.findByPk(req.params.id)
    res.render("post")
});

module.exports = router;