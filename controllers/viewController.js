const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("sequelize")

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
    // Redirects user to login if they aren't logged in
    if (!req.session.logged_in){
        res.redirect("/login")
    }
    Post.findAll({
        where: {
            UserId: req.session.user_id
        },
        include: User
    })
    .then(ownPosts=>{
        const posts = ownPosts.map(post=>post.get({plain:true}))
        res.render("dashboard",{posts: posts, cookie: req.session});
    })
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
        attributes: {
            include: [
                // Formats the createdAt date field to MMM DD YYYY
                [
                    sequelize.fn(
                        "DATE_FORMAT",
                        sequelize.col("Post.createdAt"),
                        "%M %d, %Y"
                    ),
                    "createdAt"
                ]
            ]
        },
        include: [{
            model: Comment,
            attributes: {
            include: [
                [
                    // Formats the createdAt date field to MMM DD YYYY
                    sequelize.fn(
                        "DATE_FORMAT",
                        sequelize.col("Post.createdAt"),
                        "%M %d, %Y"
                    ),
                    "createdAt"
                ]
            ]
        },
            include: User
        },User],
        required: true
    })
    .then(gotPost=>{
        const post = gotPost.get({plain:true})
        res.render("post",{post: post, cookie: req.session})
    })
});

module.exports = router;