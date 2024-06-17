const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');


/*
router.get(`/`, async (req, res) =>{
    const userList = await User.find().select('-passwordHash');
    
    if (!userList) {
        res.status(500).json({success: false})
    }
    res.send(userList);
})
*/

router.get(`/:id`, async (req, res) =>{
    const user = await User.findById(req.params.id.select('-passwordHash'));
    
    if (!user) {
        res.status(500).json({message: 'The user with given ID was '})
    }
    res.status(200).send(user);
})



router.get(`/`, (req,res) => {
    res.status(200).send({ message: `Hola sebastian `});
});



/*
router.post(`/welcome`, (req,res) => {
    const { username } = req.body;
    res.status(200).send({ msg: `Hola , ${username}`});
});

*/
router.post(`/`, async (req, res) =>{
    let user = new User({
        name: req.body.name,

    })

    user = await user.save();

        
    if (!user) 
        return res.status(400).send('the user cannot be created!')   
    res.send(user);
})


router.post('/login', async (req, res)=>{
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret;

    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
        res.status(200).send({name: user.name, user: user.email, token: token})
    } else {
        res.status(400).send('password is wrong!');
    }
})


router.post('/register', async (req, res)=>{
    let user = new User({
        name: req.body.name,
   
    })
    user = await user.save();
    if (!user)
        return res.status(400).send('The user cannot be created !')
    res.send(user);
})

router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)
    if(!userCount){
        res.status(500).json({success: false})
    }
    res.send({
        userCount: userCount
    });
})

router.get(`/get/count`, async (req, res) =>{
    let count;     
    const userCount = await User.countDocuments({count: count});
    
    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})


module.exports = router;