const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();
const db = require("./db");

const port = 3000;
var path = require("path");
const { MemoryStore } = require("express-session");
const app = express();

// app.use(helmet());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        maxAge: Date.now() + 30 * 86400 * 1000,
    })
);
app.use(bodyparser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.renderWithData = function (view, model, data) {
        res.render(view, model, function (err, viewString) {
            data.view = viewString;
            res.json(data);
        });
    };
    next();
});

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "/public"));

app.post("/logar", async (req, res, next) => {
    const usuario = await db.verificaLogin(req.body.login);
    if (usuario[0]) {
        console.log("usuario encontrado");
        if (usuario[0].senha == req.body.senha) {
            console.log("Senha correta, login aprovado");
            req.session.login = req.body.login;
            res.render("home", {
                Nome: usuario[0].login,
                cargo: usuario[0].cargo,
            });
        } else {
            console.log("Senha incorreta, verifique a senha");
            var dataResult = {
                usuario: "ok",
                senha: "erro",
            };
            res.render("index");
        }
    } else {
        console.log("Usuario não encontrado");
        res.render("index");
    }
});

app.post("/deslogar", (req, res) => {
    console.log("Deslogando");
    req.session.destroy();
    res.render("index");
});

app.get("/cadastrar", (req, res) => {});

app.get("/", (req, res) => {
    if (req.session.login) {
        console.log("com sessão");
        res.render("home");
    } else {
        console.log("sem sessão");
        res.render("index");
    }
});

app.get("/buscarEpis", async (req, res) => {
    var epis = await db.buscaEpi();
    res.send(epis);
});

app.listen(port, () => {
    console.log("Servidor rodando");
});
