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
        res.render("home",{ posts: posts, cookie: req.session})
    })
})

// DASHBOARD
router.get("/dashboard",(req,res)=>{
    res.render("dashboard",{cookie: req.session});
});

// LOGIN
router.get("/login",(req,res)=>{
    res.render("login",{cookie: req.session});
});

// SIGNUP
router.get("/signup",(req,res)=>{
    res.render("signup",{cookie: req.session});
});

// POST
router.get("/post/:id",(req,res)=>{
    console.log(req.params.id);
    Post.findByPk(req.params.id,{
        include: [{
            model: Comment,
            include: User
        },User],
        required: true
    })
    .then(post=>{
        res.render("post",{post: post, cookie: req.session})
    })
});

module.exports = router;