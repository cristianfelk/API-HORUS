const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())

let domains = ['http://localhost:9000']
const corsOptions = {
    origin: function (origin, callback) {
        if (domains.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error(`Not allowed by CORS? ${origin} // ${domains}`))
        }
    }, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', 
    credentials: true
}

app.use(cors(corsOptions))

require('./routes')(app)
app.get('/', (req, res) => { res.send('Executando aplicativo!'); })

app.use('/v1/docs', express.static('src/views'))

app.listen(3000, () => {
    console.log(`Àplicativo rodando na porta ${3000}`)
});