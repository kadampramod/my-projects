const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const assi6 = express();
const port = 1234;
const host = "localhost";
assi6.use(cors());
assi6.use(express.json());

const route = require('./router/index');
assi6.use('/',route); 
const serverDB = 'mongodb+srv://DB_new:mV7WoB2GNhUR1BxY@cluster0.unjrd.mongodb.net/Actual_DB?retryWrites=true&w=majority';


mongoose.connect(serverDB ,  { useNewUrlParser: true })   
    .then(res =>{
        assi6.listen(port,host, { useUnifiedTopology: true } ,() => {
            console.log(`server is running on ${host}:${port}`);
        })
         
    })
    .catch(err => console.log(err));


