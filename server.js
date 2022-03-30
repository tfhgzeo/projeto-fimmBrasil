const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();
const db = require("./db");
const genToken = require("./genToken");
const stream = require("stream");

const port = process.env.PORT;
var path = require("path");
const { MemoryStore } = require("express-session");
const { set } = require("express/lib/application");
const res = require("express/lib/response");
const app = express();

// app.use(helmet());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        maxAge: Date.now() + 30 * 86400 * 1000,
    })
);
app.use(express.json());
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
app.use("/pdf", express.static(path.join(__dirname, "./HOLERITES")));

app.post("/logar", async (req, res, next) => {
    console.log(req.matricula);

    // const usuario = await db.verificaLogin(req.body.login);
    // if (usuario[0]) {
    //     if (usuario[0].senha == req.body.senha) {
    //         req.session.login = req.body.login;
    //         res.render("home", {
    //             Nome: usuario[0].login,
    //             cargo: usuario[0].cargo,
    //         });
    //     } else {
    //         var dataResult = {
    //             usuario: "ok",
    //             senha: "erro",
    //         };
    //         res.render("index");
    //     }
    // } else {
    //     res.render("index");
    // }
});

app.post("/deslogar", (req, res) => {
    console.log("Deslogando");
    req.session.destroy();
    res.render("index");
});

app.get("/cadastrarEpis", async (req, res) => {
    let epi = req.query.epi;
    let cod = req.query.cod;
    let tipo = req.query.tipo;
    let quantidade = req.query.quantidade;
    let tamanho = req.query.tamanho;
    let estoque = req.query.estoque;

    var verificar = await db.buscaEpiPorEpi(epi);

    if (verificar[0]) {
        res.send("cadastrado");
        console.log("Epi ja Cadastrado");
        return;
    } else {
        let verificar = await db.buscaEpiPorCod(cod);
        if (verificar[0]) {
            res.send("Cod de Epi ja cadastrado");
            console.log("codCadastrado");
        } else {
            let insercao = await db.inserirEpi(
                epi,
                cod,
                tipo,
                quantidade,
                tamanho,
                estoque
            );
            console.log(insercao);
            res.send(insercao);
        }
    }
});

app.get("/buscarEpis", async (req, res) => {
    if (req.session.login) {
        var epis = await db.buscaEpi();
        res.send(epis);
    } else {
        res.render("index");
    }
});

app.get("/deletaEpi", async (req, res) => {
    console.log("Chamou o deleta");
    console.log(req.query.id);
    let deletar = await db.deleteEpi(req.query.id);

    if (deletar == "ok") {
        res.send("ok");
    } else {
        res.send("erro");
    }
});

app.post("/logarApp", async (req, res) => {
    console.log("chamou o teste");
    let matricula = req.body.matricula;
    let senha = req.body.senha;
    const usuario = await db.verificaLogin(matricula);

    if (usuario[0]) {
        if (usuario[0].Senha == senha) {
            console.log("Login e senha corretos");
            let token = genToken.generateAccessToken(matricula);
            res.json({
                token: token,
                usuario: usuario[0].Colaborador,
                matricula: matricula,
            });
        } else {
            res.json({ erro: "senha incorreta" });
        }
    } else {
        res.json({ erro: "Usuario nao encontrado" });
    }
});

app.get("/pdf", async (req, res) => {
    console.log("chamou pdf");
    var fs = require("fs");
    // let matricula = req.body.matricula;
    let matricula = req.query.matricula;

    res.sendFile(
        __dirname + "/HOLERITES/" + matricula + "/" + matricula + "-1.jpg"
    );

    // res.json({ foi: "ok" });
});

app.get("/pegarImagem", (req, res) => {
    res.sendFile(__dirname + "/HOLERITES/img/102505-1.jpg");
});

app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port);
});
