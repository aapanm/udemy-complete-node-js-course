const mongoDB = require('mongodb');
const MongoClient = mongoDB.MongoClient

const connectUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectUrl, { useNewUrlParser: true }, (error, client)=>{
    
    if(error){
        return console.log('Unable to connect!');
    }

    const db = client.db(databaseName);

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
})



