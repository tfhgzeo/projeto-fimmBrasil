async function teste() {
    const db = require("./db");
    const usuario = await db.buscaUsuario();
    console.log(usuario);
}

async function testeDelete() {
    const db = require("./db");
    const deleta = await db.deleteEpi("15");
    console.log(deleta);
}

function testeGenToken() {
    const genToken = require("./genToken");
    const token = genToken.generateAccessToken("Begod");
    console.log(token);
}

async function file() {
    let buffer = await fetch("./101201.pdf");
    let b = await buffer.blob();
    console.log(b);
}

// testeGenToken();

teste();

// testeDelete();

// file();

function converterParaPng() {
    let fs = require("fs");

    let data = fs.readFileSync("./matriculas.txt", {
        encoding: "utf-8",
        flag: "r",
    });
    let dataR = data.replace(/\n/g, ",");

    console.log(dataR);
}

// converterParaPng();
