const env = require("./env");
const express = require("express");
const app = express();
const routes = express.Router();
const rotas = require("./rotas/importacaoRotas");
const autenticacao = require("./maddlewares/autenticacao");
const bodyParser = require("body-parser");
const cors = require("cors");

//libera acesso de qualquer lugar
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//recebe o nome da entidade e armazena as informações do db
app.use(bodyParser.json());

app.use(routes);
//autenticação por token
app.use(autenticacao);

//rotas
app.use(rotas);

//porta
app.listen(process.env.PORT || 3001);
// global.gc();
