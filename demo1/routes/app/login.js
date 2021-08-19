const express = require('express');

const router = express.Router();

const database = require('../../test_database');

router.get('/',(req, res) => {
    res.json(database.users); // return as .json
})

router.post('/', (req,res) => {
    const userInfo = {
        username: req.body.username,
        password: req.body.password
    };

    if(!userInfo.username || !userInfo.password){
        res.status(400).json({ 
            msg: 'Missing username and password' 
        });
    };

    const verify_user = (user) =>  user.username == userInfo.username || user.password == userInfo.password;
    // If true
    const existed_user = database.users.some(verify_user);
    if (existed_user) {
        res.redirect('/api')
        // res.json({ 
        //     msg: 'Login success , redirected to /api'
        // });
    }
    else {
        res.status(400).json({ 
             msg: 'Login fail'
        });
    }
})

module.exports = router;


