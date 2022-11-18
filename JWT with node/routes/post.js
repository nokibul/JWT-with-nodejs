const router = require("express").Router();
const privatePost = require("../model/privatepost");
const publicPost = require("../model/publicpost");
const checkAuth = require("../middleware/auth");

router.get('/public',async (req,res)=>{
    const post = await publicPost.find({});
    if(post){
        res.json(post);
    }
})

router.get('/private',checkAuth,async (req,res)=>{
    const post = await privatePost.find({});
    if(post){
        res.json(post);
    }
})



module.exports = router;