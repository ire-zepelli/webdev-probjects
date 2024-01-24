const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{

    res.sendFile(__dirname + "/index.html");

});

app.post("/", (req,res)=>{

    console.log("Post request recieved.");
    const query = req.body.cityName;
    const apiKey = "secret";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid=" + apiKey;

    https.get(url, (response)=>{
        console.log(response.statusCode); 
        
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data);
            
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherData);

            res.write(`<h1>The temperature in ${query} is ${temp} Celcius</h1>`)
            res.write(`<p>The weather is currently ${weatherDescription}</p>`);
            res.write(`<img src="${imageURL}" alt="weatherImage">`);
            res.send();
        });
    });
});

app.listen(3000, ()=>{
    console.log("Server is running on port 30000");
});