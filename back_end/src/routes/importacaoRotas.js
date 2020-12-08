const express = require("express");
const routes = express.Router();
const UsuarioRoute = require("./UsuarioRoute");

routes.use(UsuarioRoute);

module.exports = routes;


