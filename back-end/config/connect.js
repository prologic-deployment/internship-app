<<<<<<< HEAD
const mongoose= require('mongoose');


mongoose.connect('mongodb://172.19.14.53:27017/internship')
    .then(()=>{
        console.log('connected');
    })
    .catch((err)=>{
        console.log(err);
    });


module.exports = mongoose;
=======
const mongoose= require('mongoose');


mongoose.connect('mongodb://172.19.14.53:27017/internship')
    .then(()=>{
        console.log('connected');
    })
    .catch((err)=>{
        console.log(err);
    });


module.exports = mongoose;
>>>>>>> origin/main
