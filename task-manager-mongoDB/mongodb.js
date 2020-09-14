const {MongoClient, ObjectID} = require('mongodb');

const connectUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectUrl, { useNewUrlParser: true }, (error, client)=>{
    
    if(error){
        return console.log('Unable to connect!');
    }

    const db = client.db(databaseName);


})



