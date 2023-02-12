const express=require('express');
const app=express();
const registerRouter=require('./router.js')
const port=process.env.PORT||5000;
const path=require("path");
require("./router.js")

app.use(registerRouter)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    })
  }

  
app.listen(port,(res,req)=>{
    console.log("I am running on port "+port+`\nhttp://localhost:${port}`)
})