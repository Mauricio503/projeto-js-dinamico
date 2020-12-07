const env = require("./env");
const express = require("express");
const app = express();
const routes = express.Router();
const rotas = require("./rotas/importacaoRotas");
const { connectAllDb } = require("./connectionManager");
const connectionResolver = require("./middlewares/connectionResolver");
const bodyParser = require("body-parser");
const cors = require("cors");
const UsuarioController = require("./controller/cadastro/UsuarioController");
const autenticacao = require("./middlewares/autenticacao");

//libera acesso de qualquer lugar
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//recebe o nome da entidade e armazena as informações do db
app.use(bodyParser.json());
connectAllDb();
app.use(connectionResolver.resolve);

//rota separada para não precisar usar token
routes.post("/usuario/salvar", UsuarioController.salvar);

app.use(routes);
//autenticação por token
app.use(autenticacao);

//rotas
app.use(rotas);

//porta
app.listen(process.env.PORT || 3001);
// global.gc();
