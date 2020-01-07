require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGO_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true, 
});

//req.query = Acessar query params(para filtros)
//req.params = Acessar route params( para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição )

app.use(cors());
app.use(express.json()); //Muito importante
app.use(
   "/files",
   express.static(path.resolve(__dirname,'..','uploads'))
)

app.use(routes);



app.listen(process.env.PORT || 3333);

