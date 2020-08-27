const express = require('express');
const noteRouter = express.Router();
const passport = require('passport');
const Todo = require('../models/Todo');
const User = require('../models/User');

noteRouter.post('/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
  
    const {sub,description} = new Todo(req.body);
     const newTodo = new Todo({sub,description});
     newTodo.save(err =>{
         if(err)
             res.status(500).json({message : {msgBody : "Error has occurred",msgError : true}});
             
         else{
             req.user.todos.push(newTodo);
             req.user.save(err =>{
                 if(err)
                     res.status(500).json({message : {msgBody : "Error has occurred",msgError : true}});
                 else{
                     res.status(200).json({message : {msgBody : "Successfully created  Notes",msgError : false}});
                 }
             })
         }
     })
     
 });
 
 noteRouter.get('/all',passport.authenticate('jwt',{session:false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('todos').exec((err,document)=>{
        if(err)
         res.status(500).json({message : {msgBody : "Error has occurred",msgError : true}});
         else{
             res.status(200).json({todos: document.todos,authenticated : true});
         }    
 
    })
     
 });

 noteRouter.put('/note/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
     console.log("PUT " + req.params.id);

     Todo.update(
        {_id : req.params.id},
        {$set: { "EmployeeName" : "NewMartin"}});
    // Todo.findById({_id : req.params.id}).exec((err,document)=>{
    //     if(err)
    //      res.status(500).json({message : {msgBody : "Error has occurred",msgError : true}});
    //      else{
    //         //  res.status(200).json({todos: document.todos,authenticated : true});
    //         res.status(200).json({document,authenticated:true});
    //      }    
 
    // })
     
 });

 noteRouter.delete('/note/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
     console.log("Backend "  + req.params.id)
    Todo.deleteOne({_id : req.params.id},(error)=>{
        if(error)
         res.status(500).json({message : {msgBody : "Error has occurred",msgError : true}});
         else
            res.status(200).json({message : {msgBody : "Successfully deleted  Note",msgError : false}});


    })
 })

 module.exports = noteRouter;