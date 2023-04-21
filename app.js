// Task1: initiate app and run server at 3000
const express = require('express');
const Cors = require('cors');
const BodyParser = require('body-parser')
const path=require('path');
const fs = require('fs')
const {employeeModel} = require("./model/Employeelist")
const dotenv = require('dotenv')
dotenv.config()

const app =  express();

app.use(Cors())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended : true}))

app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

const mongoose = require('mongoose')
mongoose.connect(process.env.MongoDB_URI,{useNewUrlParser: true})
.then(() => {
    console.log('MongoDB database connection established successfully')
})
.catch((err) => {
  console.log('Error in MongoDB database connection: ' + err);
});


app.listen(3000, () => {
    console.log(`Server is Running on 3000`);
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async (req, res) => {
    var data = await employeeModel.find()
    res.json(data)
})



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',async (req, res) => {
    const id = req.params.id;
    const newData = {
        _id:id
    }
    let data = await employeeModel.findOne(newData)
    res.json(data)
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
    var data = new employeeModel(req.body)
            data.save(
            res.json({status: 'Success'})
            )
    
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async (req,res) =>{
    const id = req.params.id;
    const newData = {
        _id:id
    }
    const data = await employeeModel.deleteOne(newData)
    res.json(data)
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async (req, res) =>{
   
    const data = await employeeModel.findOneAndUpdate({"_id": req.body._id},req.body)
    res.json("Success")


})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
