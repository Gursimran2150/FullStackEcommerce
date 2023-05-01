const app = require('./app');
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')



// for environment variables
dotenv.config({path:'backend/config/config.env'});

//connecting to database

connectDatabase();

cloudinary.config({
    cloud_name: 'ddxyb4vhk',
    api_key: '382641331129869',
    api_secret:'cWowmPkDJyZbHCSgrXdOIJIKp0U'

})




//creating server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})