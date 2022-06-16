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
    // var name = req.body.name;
    var name = req.body.name;
    var check = req.body.check;
    var date = req.body.date;
    var time = req.body.time;

    var data = {
        // "name": name,
        "email" : name,
        "check" : check,
        "date": date,
        "time":time
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('index.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
})
app.listen(5530,()=>{
    console.log("Done2");
})
