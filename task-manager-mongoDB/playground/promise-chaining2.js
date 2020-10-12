require('../src/db/mongoose');

const Tasks = require('../src/models/tasks');

// Tasks.findByIdAndDelete("5f61ae9496b6f02d675db22a")
// .then((task)=>{
//     console.log(task);

//     return Task.countDocuments({completed:false});
// })
// .then((count)=>{
//     console.log(count);
// })
// .catch((e)=>{
//     console.log(e);
// })

const deleteTaskAndCount = async (id) =>{
    await Tasks.findByIdAndDelete(id);
    const count = Tasks.countDocuments({completed : false});
    return count;
}

deleteTaskAndCount('5f6489195a60b20e978f2128').then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})