const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors')
const product = require('./Routes/product/index')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/mongoose',{ useNewUrlParser: true, useUnifiedTopology: true  })

const app = express();
app.use(cors())

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.set('view engine', 'ejs')

app.use('/',product)
// app.use('/Attendence',Attendence)
// app.use('/Document',Docs)





  app.listen(3000, () => {
    console.log('listening on 3000')
  })