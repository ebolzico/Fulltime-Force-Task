const cors= require('cors')
const app= require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(cors())

// Middlewares
app.use(bodyParser.json());
app.use(morgan('tiny'))

// Routes
const router= require('./src/routes/index.js')
app.use('/', router)

app.listen (3001, ()=>{  
    console.log (`listening on 3001`)
})