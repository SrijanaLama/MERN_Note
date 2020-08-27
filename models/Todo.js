const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    sub:{
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Todo',TodoSchema);