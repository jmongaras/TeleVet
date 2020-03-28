const express     = require('express')
const PetRoutes = require('./router/pet')

const app   = express();
const port  =  process.env.PORT || 3002

app.use(express.json())

app.use(PetRoutes)

app.listen(port,() =>{
    console.log('server is up on ' + port);
})
