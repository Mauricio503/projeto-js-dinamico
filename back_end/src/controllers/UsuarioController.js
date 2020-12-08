const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const UsuarioRepository = require("../repositorys/UsuarioRepository");

module.exports = {
  async usuario(req,res){
    const resposta = await UsuarioRepository.usuario(req);
    res.send(resposta);
  },
  async autenticacao(req, res) {
    const { login, senha } = req.body;
    const usuario = await UsuarioRepository.findOneLogin(login);

    if (!usuario)
      return res.status(400).send({ error: "Usuario não encontrado" });
    if (!(await bcrypt.compare(senha, usuario.senha)))
      return res.status(400).send({ error: "Senha Inválida" });

    usuario.senha = undefined;
    usuario.id = undefined;

    const token = jwt.sign({ id: usuario.id, entidade: usuario.entidade }, authConfig.secret);

    res.send({ usuario, token, menus });
  }
}