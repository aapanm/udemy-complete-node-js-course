   
   //Create ---> insert
   
   db.collection('users').insertMany([
        {
            name:'Jen',
            age:18
        },
        {
            name:'Gunther',
            age: 20
        }
    ], (error, result)=>{
        if(error){
            return console.log('unable to insert!');
        }

        console.log(result.ops);
    })

    db.collection('tasks').insertMany([
        {
            desciption: 'window close',
            completed: true
        },
        {
            desciption: 'Surface cleaning',
            completed: false
        },
        {
            desciption: 'wireless connection',
            completed: true
        }
    ], (error, result)=>{
        if(error){
            return console.log('unable to insert!');
        }

        console.log(result.ops);
    })

    //read--->find

    db.collection('users').findOne({_id: new ObjectID("5f5b4c31ac7e8a1363f4844d") }, (error, user)=>{
        if(error){
            return console.log('Unable to fetch!');
        }

        console.log(user);
    })

    db.collection('users').find({age: 27}).toArray((error, users)=>{
        console.log(users);
    })

    db.collection('users').find({age: 27}).count((error, count)=>{
        console.log(count);
    })

    db.collection('tasks').find({completed: true}).toArray((error, tasks)=>{
        console.log(tasks);
    })

    //update

    db.collection('users').updateOne({
        _id: new ObjectID("5f5b51eff11a9a16786fcccf")
    }, {
        $set:{
            name: 'Andrew'
        },
        $inc:{
            age:1
        }
    },).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })

    db.collection('tasks').updateMany({completed:true},
        {
            $set:{
                completed:false
            }
        }
     ).then((result)=>{
         console.log(result);
     }).catch((error)=>{
         console.log(error);
     })

     //delete


    db.collection('users').deleteMany({
        age:27
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })

    db.collection('tasks').deleteOne({
        desciption : "window close",
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    });

    //mongoose model creation and save

    const me = new User({
        name:' jen ',
        email: ' HJSAKS@HSKHK.KJAS ',
        password: "apapass123!!m"
    })

me.save().then(()=>{
    console.log(me);
}).catch((error)=>{
    console.log('Error!', error);
})

const firstTask = new Tasks({
    description: '   Eat lunch  ',
})

firstTask.save().then(()=>{
    console.log(firstTask);
}).catch((error)=>{
    console.log(error);
})

//user 

// router.get('/users/:userId', async (req, res)=>{
    
//     const _id = req.params.userId;

//     console.log(_id);

//     try{
//         const user = await User.findById(_id);
//         if(!user){
//             return res.status(404).send();
//         }
//         res.send(user);
//     }catch(e){
//         res.status(500).send();
//     }

// })

// router.get('/users', auth ,async (req, res)=>{

//     try{
//         const users = await User.find({});
//         res.send(users);
//     }catch(e){
//         res.status(500).send();
//     }

// })