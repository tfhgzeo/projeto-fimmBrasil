const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const db = require("./db");

const port = 3000;
var path = require("path");
const { MemoryStore } = require("express-session");
const app = express();

// app.use(helmet());
app.use(
    session({
        secret: "479B985D1330457A58EEC555EB8D89D8E3C9844E543681F1B3C2E7D21CEBF2CE",
        maxAge: Date.now() + 30 * 86400 * 1000,
    })
);
app.use(bodyparser.urlencoded({ extended: true }));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "/public"));

app.post("/logar", async (req, res) => {
    console.log("Logando");
    console.log("conectando no banco");
    const usuario = await db.selectUsersTeste(
        req.body.login,
        req.body.password
    );
    if (usuario[0]) {
        console.log("Passou no login");
        req.session.login = req.body.login;
        res.render("home", {
            Nome: usuario[0].login,
            cargo: usuario[0].cargo,
        });
    } else {
        console.log("Usuario ou senha incorreto");
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

app.listen(port, () => {
    console.log("Servidor rodando");
});
