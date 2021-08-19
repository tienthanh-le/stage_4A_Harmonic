const express = require('express');

// Change from using jwt to oauth using passport-oauth2 strategy
// Because of using a local test database, passport-local stategy is more favorable
// but it not meets the demand of using oauth

// const jwt = require('jsonwebtoken'); 
// const { verifyToken } = require('../../middleware/verify_user_jwt');

const bcrypt = require('bcrypt');
const router = express.Router();

const database = require('../../test_database');

router.get('/',(req, res) => {
    res.json(database.users); // return as .json
})

router.post('/register', async (req,res) =>{
    if(!req.body.username || !req.body.password){
        return res.status(400).json({ 
            msg: 'Missing username and password' 
        });
    };

    const find_username = (user) =>  user.username == req.body.username;
    const existed_user = database.users.some(find_username);
    if(existed_user){
        return res.status(409).json({ 
            msg: 'User already existed' 
        });
    };
    try{
        // Generate salt to create diff hash passwords if more user use the same one
        //const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const new_user = {
            username: req.body.username,
            password: hashedPassword,
        };
        
        database.users.push(new_user);
        res.status(201).send(`New user ${req.body.username} signed in successfully`);
    } catch (err) {
        res.status(500);
        throw(err);
    }
})

router.post('/login', async (req, res) => {
    // Find if there are usernames existed in the database
    const user = database.users.find( user => user.username == req.body.username)
    if (user == null){
        return res.status(400).json({
            msg: 'User not found'
        })
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password))
        {
            return res.json({ 
                msg: 'Login successed' 
            })
        } else {
            return res.json({ 
                msg: 'Login failed' 
            })
        }
    } catch(err) {
        throw{err};
        res.status(500);
    }
})

//////////////////////////////
// Change to use oauth later
// const mock_user = {
//     username: 'test',
//     password: 'test'
// };

// router.post('/ver', (req,res) => {
//     jwt.sign({user: mock_user}, 'secretkey', (err, token) => {
//         res.json({token});
//     });
// });

// router.get('/api',(req, res) => {
//     res.json(database.datas); 
// })

module.exports = router;



