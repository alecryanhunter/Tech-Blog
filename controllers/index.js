const router = require("express").Router();

const apiRoutes = require("./api");
const viewRoutes = require("./viewController");

router.use("/api",apiRoutes);
router.use("/",viewRoutes);

// Redirects any queries to any non-specified route to the home page
router.use("*",(req,res)=>{
    res.redirect("/home");
})

module.exports = router;