const express = require('express')
const app = express()

app.use(express.json())
require('./services/swagger')



require('./routes')(app)
app.get('/', (req, res) => { res.send('Executando aplicativo!'); })

app.use('/v1/docs', express.static('src/views'))
app.use('/docs/swagger.yaml', express.static('src/docs/swagger.yaml'))

app.listen(3000, () => {
    console.log(`Àplicativo rodando na porta ${3000}`)
});