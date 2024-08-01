const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// mongodb connection
const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://`+process.env.DB_USER+`:`+process.env.DB_PASS+`@interviewprepcluster.ssay4v6.mongodb.net/questions`);
    console.log('DB Connected')
}

connectDB()

app.get('/',(req,res)=>{
    res.send('Working');
})

app.listen(3000, ()=>{
    console.log('app is running');
})