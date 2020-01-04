const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const SessionCOntroller = require('./controllers/SessionController')
const SpotCOntroller = require('./controllers/SpotController')

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionCOntroller.store);

routes.post('/spots', upload.single('thumbnail'),SpotCOntroller.store);

module.exports = routes;