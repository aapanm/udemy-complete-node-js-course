const express = require('express');
require('./db/mongoose');
// const jwt = require('jsonwebtoken');

const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');
// const { json } = require('express');

const app =  express();
const port =  process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, ()=>{
    console.log('Server is up on port '+ port);
})

// const Tasks = require('../src/models/tasks');
// const Users = require('../src/models/user');

// const main = async () =>{
//     // const task = await Tasks.findById('5f7c25eb525318a89f29c415');
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner.getPublicProfile());

//     const user = await Users.findById('5f7c4f1af51d04c43ca587d3');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);


// }

// main()