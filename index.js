const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(cors())
const FrontendModel =require("./models/FrontendSchema");
const BackendModel =require("./models/BackendSchema");
const SDEModel = require("./models/SDESchema");
// mongodb connection
const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://`+process.env.DB_USER+`:`+process.env.DB_PASS+`@interviewprepcluster.ssay4v6.mongodb.net/questions`);
    console.log('DB Connected')
}

connectDB()

app.use(bodyParser.json());

app.get('/',async(req,res)=>{
    // try{
    //     const data = await FrontendModel.find();
    //                     console.log(data);

    //                 }catch(error){
    //                     console.log(error);
    //                     res.status(500).json({msg:"Unable to get questions"});
    //                 }
    // try{
    //     const data = await BackendModel.find();
    //                     console.log(data);

    //                 }catch(error){
    //                     console.log(error);
    //                     res.status(500).json({msg:"Unable to get questions"});
    //                 }
    
    // try{
    //     const data = await SDEModel.find();
    //                     console.log(data);

    //                 }catch(error){
    //                     console.log(error);
    //                     res.status(500).json({msg:"Unable to get questions"});
    //                 }
        
        res.send('Working');
})
const getModelByTestType = (testType) => {
    switch (testType) {
      case 'frontend':
        return FrontendModel;
      case 'backend':
        return BackendModel;
      case 'sde':
        return SDEModel;
      default:
        throw new Error('Invalid test type');
    }
  };
  
  // Function to select questions based on criteria
  const selectQuestions = async (model, technologies, numQuestions) => {
    const questions = [];
    const questionsPerTech = Math.floor(numQuestions / technologies.length);
    const extraQuestions = numQuestions % technologies.length;
    let remainingQuestions = numQuestions;
    console.log(questionsPerTech,extraQuestions)
    for (const tech of technologies) {
        const mediumQuestions = await model.aggregate([
          { $match: { technology: tech } },
          { $match: { difficulty: 'Medium' } },
          { $unwind: '$questions' },
          
          { $sample: { size: Math.floor((questionsPerTech + extraQuestions) * 2 / 3) } },
          { $group: { _id: '$_id', questions: { $push: '$questions' } } }
        ]);
        const easyQuestions = await model.aggregate([
            { $match: { technology: tech } },
            { $match: { difficulty: 'Easy' } },
            { $unwind: '$questions' },
            { $sample: { size: Math.floor((questionsPerTech + extraQuestions) * 1 / 3) } },
            { $group: { _id: '$_id', questions: { $push: '$questions' } } }
          ]);
          const hardQuestions = await model.aggregate([
            { $match: { technology: tech } },
            { $match: { difficulty: 'Hard' } },
            { $unwind: '$questions' },
            { $sample: { size: questionsPerTech + extraQuestions - mediumQuestions.length - easyQuestions.length } },
            { $group: { _id: '$_id', questions: { $push: '$questions' } } }
          ]);
      console.log(easyQuestions)
      questions.push(...mediumQuestions, ...easyQuestions, ...hardQuestions);
      remainingQuestions -= questions.length;
    }
  
    return questions;
  };
  
  app.post('/api/getQuestions', async (req, res) => {
    try {
      const { testType, technologies, duration } = req.body;
      const numQuestions = duration === 60 ? 10 : duration === 90 ? 15 : 0;
  
      if (!numQuestions) {
        return res.status(400).json({ error: 'Invalid duration' });
      }
  
      const model = getModelByTestType(testType);
      const questions = await selectQuestions(model, technologies, numQuestions);
  
      res.json({ questions });
    } catch (error) {
        console.log(req.body)
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.listen(3000, ()=>{
    console.log('app is running');
})