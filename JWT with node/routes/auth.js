const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { hash } = require("bcryptjs");
const JWT = require('jsonwebtoken');

router.post('/signup', [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a valid password").isLength({
        min: 6
    })
],async (req, res)=>{
    const { password, email } = req.body;
    const errors = validationResult(req)
    console.log(password, email)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    
    // userr.save()
    // res.json(password)
    
    //validate if doesnt exist
    
    const user = await User.findOne({email: email})
    // if(user){
    //     return res.status(500).json("The user exists");
    // }
    // console.log(user.email);
    

    if(user){
        return res.status(400).json({
                "errors": [
                    {
                        "msg": "User Already exists",
                    }
                ]
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);
    // console.log(hashedPassword)

    User.create({
        email,
        password: hashedPassword
    })
    
    const token = await JWT.sign({email},"randomplaintext",{
        expiresIn:36000
    })

    res.json({token});
    // userr.save()
    // res.send("validationed");
})

router.post('/login',async (req,res)=>{
    const { password, email } = req.body;
    
    const user = await User.findOne({email: email})

    if(!user){
        return res.status(400).json({
                "errors": [
                    {
                        "msg": "Invalid Credentials",
                    }
                ]
        })
    }

    // await is very very important
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({
                "errors": [
                    {
                        "msg": "Invalid Credentials",
                    }
                ]
        })
    }

    const token = await JWT.sign({email},"randomplaintext",{
        expiresIn:36000
    })

    res.json({token});

})

module.exports = router;