const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors())
const Schema =require("./models/Questions")
// mongodb connection
const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://`+process.env.DB_USER+`:`+process.env.DB_PASS+`@interviewprepcluster.ssay4v6.mongodb.net/questions`);
    console.log('DB Connected')
}

connectDB()

app.get('/',async(req,res)=>{
    try{
        // Schema.find()
        // .then((technology)=>
        // {
        //     console.log(technology)
        // })
        // .catch((error)=>{
        //     console.log(error);
        //     res.status(500).json({msg:"Unable to get questions"});
        // })
        const data = await Schema.find({});
    
            // Log the retrieved data
            console.log(data);

    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Unable to get questions"});
    }
    res.send('Working');
})



app.listen(3000, ()=>{
    console.log('app is running');
})