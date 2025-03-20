const mongoose = require('mongoose');


const formsSchema = new mongoose.Schema({
  
  name : {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  healthGoals: {
    type: String,
    required: true,
  },
  waterIntake: {
    type: Number,
    required: true,
  },
  activities: { 
    type: String,
    enum: ['Walking',
      'Yoga',
      'Strength Training',
      'Swimming',
      'Hiking',
      'Dancing'
      
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
    required: true,
  },
   forms: [formsSchema]
});
const User = mongoose.model('User', userSchema);

module.exports = User;