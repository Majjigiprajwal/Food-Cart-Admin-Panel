const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT;



app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser())



const authRoutes = require('./Routes/auth');
// const userRoutes = require('./Routes/user');
// const menuRoutes = require('./Routes/menu');
const adminRoutes = require('./Routes/admin');


app.use('/auth', authRoutes);
// router.use('/user', userRoutes);
// router.use('/menu', menuRoutes);
app.use('/admin', adminRoutes);



const connectDb = async ()=>{
    try{
            await mongoose.connect(process.env.MONGOOSE_URL)
            app.listen(PORT)
            console.log('connected')
          }
    catch(error){
            console.log(error)
          }
      }

connectDb()