const express=require('express');
const port=7000;
const cors=require('cors');
const webpush=require('web-push');
const app=express();

app.use(cors())

app.use(express.json());

const vapidKeys={
    publicKey:'BPBmFbhfrby7KVOLtTgehTrNYhhh6wvDTcRtNjo7EbiwlZIitfBcIdj1XfISDXkKL7xRH1F3Pz7MXM1nY5g5yh8',
    privateKey:'XcrN-ytOg3kfrvDJvb7GBkDAaVEUuKncM8gG89Cl66E'
}
webpush.setVapidDetails('mailto:akilesh23@gmail.com',vapidKeys.publicKey,vapidKeys.privateKey )

app.get('/',(req,res)=>{
    return res.json({message:"hello from /"})
})

const db = [];

app.post('/save-subscription',(req,res)=>{
    db.push(req.body);
    return res.status(201).json({message:"Succesfully saved the subscribe object in db ...!",db});
})

app.get('/send-notification',(req,res)=>{
    webpush.sendNotification(db[0],"hello world from server");
    return res.status(201).json({message:"successfully send payload from server to push service ...!"});
})
app.listen(port,()=>{
    console.log("server running in "+port);
    
})

