const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    var email = req.body.email;
    var firstName = req.body.fName;
    var lastName = req.body.lName;

    console.log(email);

    var data = {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                  FNAME:firstName,
                  LNAME:lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = " https://us9.api.mailchimp.com/3.0/lists/574c9ea39e";

    const options = {
        method:"post",
        auth: "temmy9:70794c4682265e22525229e7747541a4-us9"
        
    }
    
    const request = https.request(url, options, function(response){
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();




});

// API KEY
//70794c4682265e22525229e7747541a4-us9

//List iD
//574c9ea39e.

app.post("/failure.html", function(req, res){
    res.redirect("/")
})



app.listen(5501, function(){
    console.log("server is running at port 3000")
});