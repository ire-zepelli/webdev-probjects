const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + `/index.html`);
});

app.post("/", (req,res)=>{

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1+num2;

    res.send(`The result of the calculation is ${result}`);
});

app.get("/bmicalculator", (req,res)=>{
    res.sendFile(__dirname + `/bmiCalculator.html`);
});

app.post("/bmicalculator", (req,res)=>{
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);

    var result = (weight/height)**2;

    res.send("Your BMI is "+ result);
});

app.listen(3000, ()=>{
    console.log("Server is active");
}); 