
import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
// import ProductDetailsRoute from './Routes/ProductRoute.js';
import router from './Routes/ProductRoute.js';
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(cors()); 
app.use('/api',router)

let uri ="mongodb+srv://boorgusiddharth:siddharthjuly99@siddharth.fiuilki.mongodb.net/?retryWrites=true&w=majority&appName=Siddharth";
mongoose.connect(uri)
.then(()=>{
    console.log("DB connected")
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



