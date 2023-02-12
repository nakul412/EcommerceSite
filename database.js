
const mongoose=require("mongoose");
// console.log(process.env.SECRET_KEY)
const DB=`${process.env.SECRET_KEY}`;
mongoose.set('strictQuery', true)
mongoose.connect(DB,{
    useNewUrlParser: true,
}).then(()=>{
    console.log("connection successfull");
}).catch(()=>{
    console.log("error no connection")
});