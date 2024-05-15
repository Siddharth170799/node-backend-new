// // import mongoose from "mongoose";

// // const Product1=mongoose.Schema({
// //   Name:  {type:String,required:true,unique:false},
// //   Price:{type:Number,required:true,unique:false},
// //   description :{type:String,required:false,unique:false}

// // })

// // const Product=mongoose.model("product details",Product1)
// // export default Product
// // Backend: models/Todo.js

// import mongoose from 'mongoose';

// const todoSchema = new mongoose.Schema({
//   text: {
//     type: String,
//     required: true
//   }, 


// });

// const Todo = mongoose.model('Todo', todoSchema);


// export default Todo;
import mongoose from "mongoose";
const { ObjectId } = mongoose;
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
 
UserID:{
        type: ObjectId,
        required:true
    }

  })

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;

