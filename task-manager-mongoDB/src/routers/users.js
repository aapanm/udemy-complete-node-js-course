const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();


router.post('/users', async (req, res)=>{

    const user = new User(req.body);

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user: user.getPublicProfile(), token});
    }catch(e){
        res.status(400).send(e);
    }

})

router.post('/users/login', async (req, res)=>{
    
    try {
        console.log(req.body.email);
        console.log(req.body.password);

        const user = await User.findUserByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({user: user.getPublicProfile(), token});

    } catch (e) {
        res.status(400).send();
    }
})

router.post('/users/logout', auth,  async (req, res)=>{
    try {

        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })

        await req.user.save();
        res.send();

    } catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logoutall', auth, async (req, res)=>{
    try {

        req.user.tokens = [];
        await req.user.save();
        res.send();

    } catch (e) {
        res.status(500).send();
    }
})

router.get('/users/profile', auth ,async (req, res)=>{

    res.send(req.user.getPublicProfile());

})

router.patch('/users/profile', auth, async (req, res)=>{

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation) return res.status(400).send({error:'Invalid Operation!'});

    try {

        updates.forEach((update)=> req.user[update] = req.body[update] );

        await req.user.save();

        res.send(req.user.getPublicProfile());

    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/users/profile', auth, async (req, res)=>{

    try {
        await req.user.remove();
        return res.send(req.user.getPublicProfile());
    } catch (error) {
        return res.status(500).send();
    }

})



module.exports = router