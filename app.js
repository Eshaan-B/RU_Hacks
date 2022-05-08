
require('dotenv').config({path:'./keys.env'});
const morgan = require('morgan')
const express = require('express');

const bodyParser = require('body-parser');

const qrController = require('./controllers/qrController');

const app=express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//app.use('/',qrController.testRoute);
app.get('/getAccessToken',qrController.getAccessToken);
app.post('/createQR',qrController.createQR);
app.get('/getQRCode',qrController.getQRCodes); //by projecId

app.listen(7777);
