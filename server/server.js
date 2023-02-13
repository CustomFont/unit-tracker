const express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
const config = require('./knexfile.js')
const knex = require('knex')(config['development']);

// var sessionChecker = (req, res, next) => {    
//     console.log(`Session Checker: ${req.session.id}`.green);
//     console.log(req.session);
//     if (req.session.profile) {
//         console.log(`Found User Session`.green);
//         next();
//     } else {
//         console.log(`No User Session Found`.red);
//         // res.redirect('/login');
//     }
// };

app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   genid: function(req) {
//     return genuuid() // use UUIDs for session IDs
//   },
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true, maxAge: 60000  }
// }))
// app.use(cors({
//     credentials: true, // important part here
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200
// }));

//---------------Soldier Data---------------//
//get all for alert roster
app.get('/users', (req, res) => {
    knex('soldier_data').select('*').orderBy('last_name', 'asc').then(data => res.status(200).send(data))
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
