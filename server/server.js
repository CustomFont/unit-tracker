require('dotenv').config();
const express = require('express');
var cors = require('cors');
const bcrypt = require('bcrypt');
var session = require('express-session');
const app = express();
const port = process.env.PORT || 8081;
const config = require('./knexfile.js');
const { response } = require('express');
const knex = require('knex')(config['development']);

app.use(express.json());
app.set('trust proxy', 1) // trust first proxy
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

// establish session storage
const KnexSessionStore = require('connect-session-knex')(session);
const store = new KnexSessionStore({
  knex,
  tablename: 'sessions',
});

// options for session
app.use(session({
    name: 'app.sid',
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 300000, sameSite: 'strict' },
    store
}))

// use if else syntax to make middleware ignore specific routes 
app.use(async (req, res, next) => {
    if (req.path === '/login' && req.method === 'POST') {
        req.session.authenticated = false;
        next();
    } else if (req.path === '/register') {
        req.session.authenticated = true;
        next();
    } else if (req.path === '/units') {
        req.session.authenticated = true;
        next();
    } else {
        let authenticationStatus = req.session.authenticated;
        if(authenticationStatus){
            next();
        } else {
            req.session.authenticated = false;
            res.status(403).send('Bad Credentials')
            return
        }
    }
})

//---------------Credentials----------------//
app.post('/login', async (req, res) => {
    if (req.body.DODID && req.body.SSN){
        let DBdodid = await knex('soldier_data').select("DODID").where({ "DODID": req.body.DODID })
        if (DBdodid[0]){
            DBdodid = DBdodid[0].DODID;
            if (DBdodid == req.body.DODID){
                let DBSSN = await knex('soldier_data').select('SSN').where({"DODID":DBdodid})
                let attemptPassword = await bcrypt.compare(req.body.SSN, DBSSN[0].SSN)
                if (attemptPassword === true){
                    let is_leader = await knex('soldier_data').select('is_leader').where({ "DODID": DBdodid })
                    is_leader = is_leader[0].is_leader;
                    req.session.is_leader = is_leader;
                    req.session.authenticated = true;
                    if( is_leader ){
                        res.status(250).send('Leader Login Successful')
                    } else {
                        res.status(200).send('Login successful')
                    }
                } else {
                    req.session.authenticated = false;
                    res.status(500).send('SSN incorrect')
                }
            }
        } else {
            req.session.authenticated = false;
            res.status(500).send('DOD is not registered')
        }
    }
})

app.get('/logout', (req, res) => {
    req.session.authenticated = false;
    req.session.destroy();
    res.status(200).send('Logout Successful')
})
// check credentials, leader gets 250, else 200
app.get('/creds', (req, res) => {
    console.log(req.session)
    if (req.session.authenticated === true){
        res.status(250).send('Leader')
    } else {
        res.status(200).send("Not Leader")
    }
})
//---------------Soldier Data---------------//
//get all users
app.get('/users', async (req, res, next) => {
    knex('soldier_data').select('*').orderBy('last_name', 'asc').then(data => res.status(200).send(data))
})

//get all for alert roster (pulls rank, name, phone number from all associated with that company id)
app.get('/alertroster/:company_id', (req, res) => {
    let idParam = parseInt(req.params.company_id);
    if (Number.isInteger(idParam)){
    knex('soldier_data').select('rank', 'last_name', 'first_name', 'phone_number').where({company_id: idParam}).then(data => res.send(data))
    }
})

//get all by company_id
app.get('/users/:company_id', (req, res) => {
    let idParam = parseInt(req.params.company_id);
    if (Number.isInteger(idParam)){
        knex('soldier_data').select('*').where({ company_id: idParam }).then(data => res.status(200).send(data))
    } else {
        res.status(400).sendStatus(400)
    } 
})

//patch soldier data
app.patch('/users/:DODID', (req, res) => {
    let idParam = parseInt(req.params.DODID);
    if(Number.isInteger(idParam)) {
        knex('soldier_data').select('DODID').where({DODID: idParam})
        .update(req.body).then(data => res.status(201).send('User profile updated'))
    } else {
        res.status(400).sendStatus(400)
    }
})

//delete soldier record
app.delete('/:DODID',(req, res) => {
    let idParam = parseInt(req.params.DODID);
    if(Number.isInteger(idParam)) {
        knex('soldier_data').select('DODID').where({DODID: idParam})
        .delete().then(data => res.sendStatus(204).send('User profile has been deleted'))
    } else {
        res.status(400).sendStatus(400)
    }
})

//get company_name
app.get('/units', (req, res) => {
    knex('company_data').select('*').orderBy('id', 'asc').then(data => res.status(200).send(data))
})


//get soldier by company_id
app.get('/company', (req, res) => {
    knex('soldier_data').select('*').where({ id:req.params.company_id }).orderBy('last_name', 'asc').then(data => res.status(200).send(data))
})

// update: toggle soldier admin rights by DODID
app.patch('/:DODID/toggleadmin', async (req, res) => {
    let currentAdminStatus = await knex('soldier_data').select('is_leader').where({'DODID': req.params.DODID});
    currentAdminStatus = currentAdminStatus[0].is_leader;
    currentAdminStatus = !currentAdminStatus;
    knex('soldier_data').where({'DODID': req.params.DODID}).update({'is_leader': currentAdminStatus})
        .then(data => res.sendStatus(200));
})

// add new soldier by unit registration code (deletes pre-existing soldier record with same dodid)
app.post('/register', async (req, res) => {
    let regKey = req.body.registration_key;
    let company_id = await knex('company_data').select('id').where({'registration_key': regKey})
        .catch(err => {
            console.error(err)
            res.status(500).send('incorrect registration key')
        })
    req.body.company_id = company_id[0].id;
    await knex('soldier_data').where({'DODID': req.body.DODID}).delete();
    delete req.body.registration_key;
    bcrypt.hash(req.body.SSN, 10, function (err, hash) {
        req.body.SSN = hash;
        knex('soldier_data').insert(req.body)
            .then(response => {
                res.status(201).send('New Soldier added.')
            })
    })
})

// add unit with randomized regkey (if company exist replaces reg_key)
app.post('/addunit', async (req, res) => {
    let reqCompanyName = req.body.company_name;
    const randomKey = () => {
        let regKey = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < 6; i++) {
            regKey += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return regKey;
    }
    let random = randomKey();
    let company_name = await knex('company_data').where({'company_name': reqCompanyName})
        .catch(err => {
            console.error(err)
            res.status(500).send('incorrect registration key')
        })
    req.body.registration_key = random
    if(company_name) {
        company_name = company_name[0].company_name
        await knex('company_data').update({'registration_key': random})
            .where({"company_name": company_name})
            .then(response => res.sendStatus(200))
    } else {
        await knex('company_data').insert(req.body)
        .then(response => {
            res.status(201).send('New unit added')
        })
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`))
