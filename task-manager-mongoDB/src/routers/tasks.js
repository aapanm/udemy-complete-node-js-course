const express = require('express');
const Tasks = require('../models/tasks');
const Users = require('../models/user');
const auth = require('../middleware/auth'); 
const router = new express.Router();


router.post('/tasks', auth, async (req, res)=>{

    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(500).send();
    }
})

//GET /tasks?completed=true => filtering data

//GET /tasks?limit=10&skip=10 => pagination data

//GET /tasks?sortBy => 1-> ascending, 2-> descending

router.get('/tasks', auth,  async (req, res)=>{

    const match = {};
    const sort = {};

    if (req.query.completed){
        match.completed = req.query.completed === 'true';
    }

    console.log(match);

    if (req.query.sortBy){

        console.log(req.query.sortBy.split(':')[1]);

        if(req.query.sortBy.split(':')[1] == 'desc'){
            sort[req.query.sortBy.split(':')[0]] = -1;
        }else{
            sort[req.query.sortBy.split(':')[0]] = 1;
        }
        
    }

    try{
        // const tasks = await Tasks.find({owner: req.user._id})

        await req.user.populate({
            path:'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();

        res.send(req.user.tasks);

    }catch(e){
        res.status(500).send(e);
    }

})

router.get('/tasks/:taskId', auth, async (req, res)=>{

    const _id = req.params.taskId;

    try {
        const task = await Tasks.findOne({_id, owner: req.user._id});

        if(!task){
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }

})

router.patch('/tasks/:taskId', auth, async (req, res)=>{

    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];

    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));
    
    if(!isValidOperation) return res.status(400).send({error:'Invalid operation!'});
    
    const _id = req.params.taskId;
    
    try {
        const task = await Tasks.findOne({_id, owner: req.user._id});

        if(!task) return res.status(404).send();

        updates.forEach((update)=> task[update] = req.body[update]);

        await task.save();
        
        return res.send(task);

    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/tasks/:taskId', auth, async (req, res)=>{
    
    const _id = req.params.taskId;

    try {
        // const task = await Tasks.findByIdAndDelete(_id); 
        const task = await Tasks.findOneAndDelete({_id, owner:req.user._id});
        if(!task) return res.status(404).send();
        return res.send(task);
    } catch (error) {
        return res.status(500).send();
    }
    
})


module.exports = router;