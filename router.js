const express = require('express');
const router = express();
const bp = require("body-parser");
const validator = require('validator');
router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));
require("./database.js");
const { EcommerceRegister,EcommerceUser } = require("./collections.js")

router.post("/registerData", async (req, res) => {
    const { username, email, password, confirmpass } = req.body;
    if (username !== "" && email !== "" && password !== "" && confirmpass !== "") {

        try {
            if (!validator.isEmail(email)) {
                return res.status(422).json({ error: "emailrejected" });
            }
            if (!validator.isStrongPassword(password)) {
                return res.status(422).json({ error: "passwordrejected" });
            }

            const userdata = await EcommerceRegister.find({})
            const finduser = userdata.find((user) => {
                return user.email === email
            })

            if (finduser) {
                return res.status(422).json({ error: "UserExist" });
            }

            const register = new EcommerceRegister({
                username, email, password, confirmpass
            })
            await register.save();
            return res.status(201).json({ message: 'Success' })
        }
        catch (e) {
            res.json(e);
        }

    }

    else {
        return res.status(422).json("");
    }
})

router.post("/LoginData", async (req, res) => {
    const { username, email, password } = req.body;

    if (username !== "" && email !== "" && password !== "") {
        try {
            const userdata = await EcommerceRegister.find({})
            const finduser = userdata.find((user) => {
                return user.email === email
            })

            if (finduser === undefined) {
                return res.status(422).json({ error: 'UserNotFound' })
            }
            else if (finduser.password !== password) {

                return res.status(422).json({ error: "passwordincorrect" });
            }
            else {
                return res.status(201).json({ message: "Success" });
            }



        } catch (error) {
            return res.send("error")

        }
    }

    else {
        return res.status(422).json("");
    }
})
router.post("/addtocart", async (req, res) => {
    // console.log(req.body);
    const {email,value,name,img,price,features}=req.body;
    const info={
        name,img,price,features
    }
   
     try {

        const userdata = await EcommerceUser.find({});

        const userfind = userdata.find((u) => {
            return u.email == email;
        })
        

        var d=[];
       

        if (userfind) {
            
            console.log("user found",email)
            d = userfind.Data;
            const deleteuser = await EcommerceUser.findOneAndDelete({email:email});

            if(value=='0'){
                 
                d=d.filter((ele)=>{
                    return ele.name!==name;
                })
                d.push(info)
            }
            else{
                d=d.filter((ele)=>{
                    return ele.name!==name;
                })
            }
        }
        else {
            d.push(info)
            console.log("no user found")
        }
       
        const em=email
        
        const userTT = new EcommerceUser({
            email: em,
            Data: d
        })
       
       
          await userTT.save();
          console.log(em)
       
// console.log(userTT)
 return res.status(201).json({ message: "Success" });

    }
    catch (e) {
       return res.status(404).json({ message: "error" });
    }

   
})
router.post("/getProducts",async(req,res)=>{
    const {email}=req.body;
 try{
       const users=await EcommerceUser.find({});

       const findUser=users.find((user)=>{
         return user.email==email;
       })
     
       if(findUser){
              
         return res.status(201).json({message:findUser.Data});
       }
       else{
              return res.status(401).json({message:"user not found"});
       }


 }
 catch(e){
     return res.send("e");
 }
})

router.post('/emptycart', async(req, res) => {
    const {email} = req.body;
    
    try {
        const deleteuser = await EcommerceUser.findOneAndDelete({ email: email });
        return res.status(201).json({message: 'done'});
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;