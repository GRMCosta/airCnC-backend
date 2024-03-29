require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {}

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id
});

app.use((req, res, next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

//req.query = Acessar query params(para filtros)
//req.params = Acessar route params( para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição )

app.use(cors({
    origin: 'http://aircncprod.herokuapp.com',
    optionsSuccessStatus: 204
}))
app.use(express.json()); //Muito importante
app.use(
    "/files",
    express.static(path.resolve(__dirname, '..', 'uploads'))
)

app.use(routes);


server.listen(process.env.PORT || 3333);

