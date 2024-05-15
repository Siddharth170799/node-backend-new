import express from "express";
import Todo from "../Schema/Schema.js";
import expressAsyncHandler from "express-async-handler";
import ToDo2 from "../Schema/Schema2.js";
import jwt from "jsonwebtoken";

const router = express.Router();
async function authenticateUser(Email, Password) {
const user = await ToDo2.findOne({ Email: Email, Password: Password });
  return user;
}

router.post(
  "/todo",
  expressAsyncHandler(async (req, res) => {
    try {
      let token=req.headers.authorization;
      let TokenResult=jwt.verify(token,"your_secret_key");
      const toDoItems = req.body.text;
      const toDoItems2 = new Todo({ text: toDoItems,UserID:TokenResult.userId});
      const toDoItems3 = await toDoItems2.save();
      res.send({ message: "to do item added", data: toDoItems3, status: 200 });
    } catch (err) {
      console.log(err, "error ocurred");
      res.send({ message: "error ocurred", status: 500 });
    }
  })
);






router.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    try {
      const { FirstName, LastName, Email, Password,input1 } = req.body;
      console.log(input1)
      const userSignUpDetails = new ToDo2({
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Password: Password,
        
      });
      const details2 = await userSignUpDetails.save();
      res.send({
        message: "sign up details added successfully",
        data: details2,
        status: 200,
      });
    } catch (err) {
      console.log(err, "error occurred in sending signupdetails");
      res.send({ message: "error ocurreed", status: 500 });
    }
  })
);
// router.post('/newTodo',async(req,res)=>{
//   const {text}=req.body
//   console.log(text)
//   const details= new ToDo2({
//     ToDOs: text
//   })

//   const details2=await details.save()
//   res.send({message:"todos sent successffully",data:details2,status:200})
// })



router.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    
    const user = await authenticateUser(req.body.Email, req.body.Password);
    if (user) {
      const token = jwt.sign({ userId: user._id }, "your_secret_key", {
        expiresIn: "1h",
      }); 
      res.status(200).send({ message: "Sign in successful", token });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  })
);

router.get("/todo", async (req, res) => {
  // let token= req.headers.authorization;
  // let TokenResult=jwt.verify(token,"Shh");
  // let userTaskData= Todo.find({UserID:TokenResult.userId})
  try {
    let token= req.headers.authorization;
  let TokenResult=jwt.verify(token,"your_secret_key");
   let userTaskData=await Todo.find({UserID:TokenResult.userId})
 
    res.send(userTaskData);
  } catch (error) {
    console.error("Error fetching todo items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo item deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo item:", err);
  }
});

router.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndUpdate(id,req.body);
    res.send({ message: "todo item updated successfully" });
  } catch (err) {
    console.log(err, "error occurred");
  }
});
export default router;
