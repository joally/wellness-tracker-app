const mongoose = require('mongoose');


const formsSchema = new mongoose.Schema({
  
  name : {
    type: String,
    required: true,
  },
  age: {
    type: Number,
   
  },
  healthGoals: {
    type: String,
   
  },
  waterIntake: {
    type: Number,
   
  },
  activities: { 
    type: String,
    enum: ['walking',
      'yoga',
      'strengthTraining',
      'swimming',
      'hiking',
      'dancing'
      
    ],
  },
  
});
const userSchema = new mongoose.Schema({
username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
   
  },
   forms: [formsSchema]
});
const User = mongoose.model('User', userSchema);

module.exports = User;