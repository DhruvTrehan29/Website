var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const app = express()

app.use(bodyParser.json())
app.use(express.static('HTML'));
app.use('/node_modules', express.static('node_modules'));
app.use('/img', express.static('img'));
app.use('/JS', express.static('JS'));
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/myPrect',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var Areacode = req.body.Areacode;
    var telnum = req.body.telnum;
    var email = req.body.email;
    var approve = req.body.approve;
    var feedback = req.body.feedback;
    var data = {
        
        "FirstName" : firstname,
        "lastname" : lastname,
        "Areacode": Areacode,
        "telephone no.":telnum,
        "Email":email,
        "approve":approve,
        "feedback":feedback
    }

    db.collection('fee').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('contactus.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('contactus.html');
});
app.listen(5531,()=>{
    console.log("Done");
})
