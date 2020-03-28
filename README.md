# TeleVet

#For node app:
1. Go to test/node-api folder 
2. Run "npm install" command 
3. Change mysql database config on test/node-api/src/router/pet.js
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pet'
  });
4. Run command 'npm start'

#For reach app:
1. Go to test/react-app folder 
2. Run "npm install" command 
3. Run command 'npm start'
4. Run URL : http://localhost:3000/pets
