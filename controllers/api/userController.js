const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET ROUTE - ALL
router.get("/",(req,res)=>{
    User.findAll()
    .then(users=>{
        res.json(users);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
});

// GET ROUTE - SINGULAR BY ID
router.get("/:id",(req,res)=>{
    User.findByPk(req.params.id)
    .then(user=>{
        res.json(user);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
});

// POST ROUTE
// JSON FORMAT
// name: STRING
// password: STRING len[8]
router.post("/",(req,res)=>{
    User.create({
        name: req.body.name,
        password: req.body.password,
    })
    .then(newUser=>{
        res.json(newUser);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
})

// POST ROUTE - LOGIN
router.post("/login",async (req,res)=>{
    try {
        const user = User.findOne({
            where: {
                name: req.body.username
            }
        })
        
        // Checks if there is a user by that username
        if(!user){
            return res.json({msg:"error occured",code: 4444});
        }
        
        // Checks for validity of password
        const validPass = await user.checkPassword(req.body.password);
        if(!validPass){
            return res.json({msg:"error occured",code: 4555});
        }

        req.session.save(()=>{
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.json({msg:"logged in!",user})
        })
    } catch (err) {
        res.json({msg:"error occured",err})
    }



})

// DELETE ROUTE
router.delete("/:id",(req,res)=>{
    User.destroy({
        where:{
            id: req.params.id
        }})
    .then(delUser=>{
        if (!delUser) {
            res.json({msg:"No user to delete.",result:delUser})
        } else {
            res.json({msg:"User deleted successfully.",result:delUser});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured",err});
    });
})

module.exports = router;