# Galvanize SDI #14 Capstone
Unit Personnel Tracker
Companies are wasting entire days playing tag and bringing people into offices one at a time to update shared excel personnel trackers that only one person can access at a time. To combat this waste of time, we create a web application where soldiers can update their information from their mobile devices all at once. Using a combination of one-time registration codes, the last four of their socials and their DODID, soldiers will be able to push their information to the company tracker without being bogged down with government computers or CAC verification. Unit leaders will be able to access the tracker from their computers with CAC verification, search through, filter and manually update info if necessary, just like their old excel documents. This, however, will be centralized. Leaders’ access could be routed through another existing gov site for minimal redundancy.

# tech stack 
![react resize](https://user-images.githubusercontent.com/117850494/218570383-6a6508c7-2119-44bb-8a2d-92d8c655984b.png)
-React  
![Expressjs resize](https://user-images.githubusercontent.com/117850494/218570416-b60503f9-97e5-4443-9dfe-a7a18358ccdd.png)
-Express 
![Postgresql resize](https://user-images.githubusercontent.com/117850494/218570438-b8dcd48c-bb2f-4957-896d-9d3a5cb873ce.png) 
-postgreSQL
 ![knex-logo resize](https://user-images.githubusercontent.com/117850494/218570454-1da41ba7-d058-48c3-8bad-6d215c9b5e37.png)
-knex 
![2560px-Node js_logo svg resize](https://user-images.githubusercontent.com/117850494/218570471-4aae1dcc-5341-4395-be6e-3be437bbbf0d.png)
-Node.js 
 ![bootstrap5 resize](https://user-images.githubusercontent.com/117850494/218570494-601aeb4c-645d-4776-8c69-dbd09b27d1b5.jpg)
-bootstrap css 
- Express-session-knex
- express-sessions 
- dotenv (https://github.com/bkeepers/dotenv)

# Use
 cd into each directory and npm start
- ssh root@142.93.182.171
- docker ps -a plug current container into #3.
- docker exec -it <> bash
- psql -U postgres unit_tracker
- \c unit_tracker
# Dev Team: 
- Scott Giles
- Robert Chandler
- Alex Moran
- Jacob Fontanez
