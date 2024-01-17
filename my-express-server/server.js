const express = require('express');
const app = express();

app.get("/", (req,res)=>{
    res.send("<h1>Hello, World! </h1>");
})

app.get("/contact", (req,res)=>{
    res.send("<h1>Contact me at: benedictavenido@gmail.com</h1>");
})

app.get("/about", (req,res)=>{
    res.send("<h1>This is the About Page!</h1>");
});

app.get("/hobbies", (req,res)=>{
    res.send("This is my hobby");
});

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
});