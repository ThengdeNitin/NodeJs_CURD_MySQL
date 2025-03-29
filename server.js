const express = require('express');
const color = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mysqlPool = require('./config/db');

//config
dotenv.config();

//rest object 
const app = express();

//middleware
app.use(express.json());  
app.use(morgan("dev"));


//port
const PORT = process.env.port || 8080;

//routes
app.use("/api/v1/student", require("./routes/studentRoutes"));

app.get('/', (req,res) => {
  res.status(200).send('<h1>Welcome</h1>');
});

//conditionally listen
mysqlPool.query('SELECT 1')
.then(() =>{
  //mysql
  console.log("MySQL DB Connected".bgCyan.white);
//listen
app.listen(PORT , ()=>{
  console.log(`Server is Running on port ${PORT}!!!`.yellow);
});
})
.catch((error) => {
 console.log(error)
})

