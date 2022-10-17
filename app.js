const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req,res){
    
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
   
    const data={
        members : [                 
            {   
                email_address:email,
                status : "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jasonData=JSON.stringify(data);
    
    const url="https://us12.api.mailchimp.com/3.0/lists/be2bee9ec7";

    const options={
        method : "POST",
        auth: "rameeskh:6789d843024d4b947a3b46c7c7b0b59e-us12"
    }

   const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }


            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
    });

    request.write(jasonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000,function(){
    console.log("listen at 3000"); 
})


//api - key 6789d843024d4b947a3b46c7c7b0b59e-us12

//audience id :-  be2bee9ec7

//https://{dc}.admin.mailchimp.com/lists/members/?id={web_id}.
//https://us19.admin.mailchimp.com/;