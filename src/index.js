const express = require('express')
const app = express() 

const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


const cookieParser = require("cookie-parser");

// Importing Routes
const superAdminRoute = require('../src/routes/superAdmin.routes')
const franchiseRoute = require('../src/routes/franchise.routes')
const franchiseAdminRoute = require('../src/routes/franchiseAdmin.routes')
const AuthRoute = require('../src/routes/auth.routes')
// const patientRoute = require('../src/routes/patient.routes')


// Middleware

app.use(cookieParser());
app.use(express.json()) 


app.use('/api/superadmin', superAdminRoute)
app.use('/api/franchise', franchiseRoute)
app.use('/api/franchise/admin', franchiseAdminRoute)
app.use('/api/auth', AuthRoute)
// Routes
// app.use("/api/auth", require("./routes/auth.routes"));



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB')
    // Start the server after successful DB connection
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`)
    })
  } )
  .catch(err => {
    console.error('Failed to connect to MongoDB', err)
  })            
