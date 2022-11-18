require("dotenv").config()
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json())


const User = require("./model/user");

app.post("/register",(req,res)=>{

    try{
        //get user input
        const {first, last, email, password} = req.body
        //validate
        if(!(first,last,email,password)){
            res.status(400).send("Please fill up all the fields");
        }
        //check and validate if exist
        // const fun = async ()=>{
        //     await User.findOne({email});
        //     if (validUser) {
        //         return res.status(409).send("User Already Exist. Please Login");
        //       }
        // } 
        // fun();
        //encrypt user password
        // const encryptedPassword = await bcrypt.hash(password, 10);
        // const encryptedPassword =await  bcrypt.hashSync(password, saltRounds)
        
        
        //create user in DB
        const user = User.create({
            first,
            last,
            email,
            // password: encryptedPassword,
            password
        })
        // bcrypt.hash(password, 10).then(async function(hash) {
        //     // Store hash in your password DB.
        //     user.password = hash;
        // });
        // console.log(user)
        //create token
        // const token = jwt.sign(
        //     { user_id: user._id, email },
        //     process.env.TOKEN_KEY,
        //     {
        //       expiresIn: "2h",
        //     }
        //   );
        //save user token in our db object
        // user.token = token;
        
        // return new user
        console.log(user)
        res.status(200).send(user);

    }catch(err){
        console.log(err);
    }


})

app.post("/login",(req,res)=>{
    
})

module.exports = app;