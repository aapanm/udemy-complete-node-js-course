require('../src/db/mongoose');

const User = require('../src/models/user');

// "5f619d39aed511264f6c6c6f"

// User.findByIdAndUpdate("5f6465bd85fbb57691fdcaaa", { age: 1 })
// .then((user)=>{
//     console.log(user);
//     return User.countDocuments({age: 1});
// })
// .then((result)=>{
//     console.log(result);
// })
// .catch((e)=>{
//     console.log(e);
// })

const updateAgeAndCount = async (id, age) =>{
    await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
}

updateAgeAndCount('5f6465bd85fbb57691fdcaaa', 2)
.then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})