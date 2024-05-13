import mongoose from 'mongoose';


const toDoSchema2= new mongoose.Schema({
    FirstName:{type:String,required:false,unique:false},
    LastName:{type:String,required:false,unique:false},
    Email:{type:String,required:false,unique:false},
    Password:{type:String,required:false,unique:false},
  
  })


  const ToDo2=mongoose.model("Todo2",toDoSchema2)
  export default ToDo2