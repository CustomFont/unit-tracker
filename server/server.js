const express = require('express');
var cors = require('cors');
var session = require('express-session')

const app = express();
const port = process.env.PORT || 8081;
const config = require('./knexfile.js')
const knex = require('knex')(config['development']);

app.use(express.json());
app.set('trust proxy', 1) // trust first proxy

// establish session storage
const KnexSessionStore = require('connect-session-knex')(session);
const store = new KnexSessionStore({
  knex,
  tablename: 'sessions', // optional. Defaults to 'sessions'
});
// options for session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 60000  },
  store
}))
// middleware
app.use((req, res, next) => {
    // console.log(store)
    next();
})

// app.use(cors({
//     credentials: true, // important part here
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200
// }));
//---------------Credentials----------------//
app.post('/login', async (req, res) => {
    if (req.body.DODID && req.body.last_four_SSN){
        let DBdodid = await knex('soldier_data').select("DODID").where({ "DODID": req.body.DODID })
        if (DBdodid[0]){
            DBdodid = DBdodid[0].DODID;
            if (DBdodid === req.body.DODID){
                let DBlastFour = await knex('soldier_data').select('last_four_SSN').where({"DODID":DBdodid})
                if (req.body.last_four_SSN === DBlastFour[0].last_four_SSN){
                    req.session.authenticated = true;
                    console.log(req.session.authenticated)
                    res.status(200).send('login successful')
                } else {
                    res.status(500).send('Last four SSN incorrect')
                }
            }
        } else {
            res.status(500).send('DOD is not registered')
        }
    }
})
//---------------Soldier Data---------------//
//get all users
app.get('/users', (req, res) => {
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

//soldier makes a new record
app.post('/users', async (req, res) => {
    await knex('soldier_data').insert(req.body)
    res.clearCookie('DODID')
    res.cookie('DODID', { 'DODID': await knex('soldier_data').where({'DODID': req.body.DODID}) })
    res.status(201).send('New user added.')
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
app.post('/addsoldier', async (req, res) => {
    let regKey = req.body.registration_key;
    let company_id = await knex('company_data').select('id').where({'registration_key': regKey})
        .catch(err => {
            console.error(err)
            res.status(500).send('incorrect registration key')
        })
    req.body.company_id = company_id[0].id;
    await knex('soldier_data').where({'DODID': req.body.DODID}).delete();
    delete req.body.registration_key;
    knex('soldier_data').insert(req.body).then(res.status(201).send('Soldier Added'))
})

app.listen(port, () => console.log(`Listening on port ${port}`))
