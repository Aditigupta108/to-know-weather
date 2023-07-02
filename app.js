const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
     const city=req.body.cityname;
    const appkey="bd11bb899f0d5b9256be7474097ba16a";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ appkey +"&units=metric";

    https.get(url,function(response){
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const descrip=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>the temperature is: "+ temp+ " degree celcius</h1>");
            res.write("<p>"+ descrip +"</p>");
            res.write("<img src="+ imageurl +">");
            res.send();

        
        });
    });
});
app.listen(3000,function(){
    console.log("server is listening");
});