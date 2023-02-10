const express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
const config = require('./knexfile.js')
const knex = require('knex')(config['development']);

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     credentials: true, // important part here
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200
// }));

//---------------Soldier Data---------------//
//get all for alert roster
app.get('/', (req, res) => {
    knex('soldier_data').select('*').orderBy('last_name', 'asc').then(data => res.status(200).send(data))
})
//get all by company_id
app.get('/users/company_id', (req, res) => {
    knex('soldier_data').select('*').where(company_id === company_id).then(data => res.status(200).send(data))
})
//soldier makes a new record
app.post('/users', async (req, res) => {
    await knex('soldier_data').insert(req.body)
    await res.clearCookie('DODID')
    await res.cookie('DODID', { 'DODID': await knex('users').select()})
    await res.status(201).send('New user added.')
    
})
//patch soldier data
//patch soldier data for leaders
//update soldier admin rights by DODID
//delete soldier record
//get soldier by company


//get soldier by company_id
app.get('/company', (req, res) => {
    knex('soldier_data').select('*').where({ id:req.params.company_id }).orderBy('last_name', 'asc').then(data => res.status(200).send(data))
})

//add new soldier by unit registration code
app.post('/addsoldier', async (req, res) => {
    knex('soldier_data').insert(req.body).then(res.status(201).send('Soldier Added'))
})

app.listen(port, () => console.log(`Listening on port ${port}`))