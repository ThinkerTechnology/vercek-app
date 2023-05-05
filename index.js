import express from "express";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use(express.static('public')); 

// app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    return res.status(200).send({message:"Hello World"});
})

app.post("/send",(req,res)=>{
    if(!req.body) return res.status(400).send({message:"bad request"})
    return res.status(200).json(req.body);
})

let server = "";
const SECURE_PORT = process.env.SECURE_PORT;
const PORT = process.env.PORT

if(process.env.NODE_ENV == "production"){
    var privateKey  = fs.readFileSync('server.key', 'utf8');
    var certificate = fs.readFileSync('server.crt', 'utf8');
    const credentials = {key: privateKey, cert: certificate};
    server = https.createServer(credentials,app).listen(SECURE_PORT,()=>{
        console.log(`You are live on ${SECURE_PORT}`);
    })
}else{
    server = app.listen(PORT,()=>{        
        console.log(`You are live on ${PORT}`);
    })
}
