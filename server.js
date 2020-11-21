require('dotenv').config()
const AppRouter = require('./routes/AppRouter')
const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const connection = require('./db/connection')
const path = require('path')

const PORT = process.env.PORT || 3001
const app = express()


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts)

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('hello from the backdoor')
})

app.listen(PORT, async () => {
    try {
        await connection
        console.log('database connected')
        console.log(`app listening on PORT ${PORT} clean servers go brrrrr 😎`)
    }
    catch(error) {
        throw new Error('connection error')
    }
})
