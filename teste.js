async function teste() {
    const db = require("./db");
    const usuario = await db.buscaEpi();
    console.log(usuario);
}

async function testeDelete() {
    const db = require("./db");
    const deleta = await db.deleteEpi("15");
    console.log(deleta);
}

teste();

// testeDelete();
