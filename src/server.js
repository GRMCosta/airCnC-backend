const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://tableMeal:tableMeal@tablemeal-n6whx.mongodb.net/semana09?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true, 
});

//req.query = Acessar query params(para filtros)
//req.params = Acessar route params( para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição )

app.use(express.json()); //Muito importante
app.use(routes);



app.listen(3333);

