const express = require('express');
const cors = require('cors');
const setupSwagger = require('./configs/swagger'); 

const app = express();
app.use(express.json());

let domains = ['http://localhost:5173'];
const corsOptions = {
    origin: function (origin, callback) {
        if (domains.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS? ${origin} // ${domains}`));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
};

app.use(cors(corsOptions));

setupSwagger(app);

require('./routes')(app);

app.get('/', (req, res) => {
    res.send('Executando aplicativo!');
});

app.use('/v1/docs', express.static('src/views'));

app.listen(3000, () => {
    console.log(`Aplicativo rodando na porta ${3000}`);
});
