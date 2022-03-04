async function connect() {
    require("dotenv").config();
    const mysql = require("mysql2/promise");
    const connection = mysql.createConnection({
        host: process.env.DB_HOST_DEV,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
    return connection;
}

async function VerificarMatriculaSenha(user, senha) {
    const conn = await connect();
    const [rows] = await conn.query(
        "select * from login where login= " +
            '"' +
            user +
            '"' +
            "and senha = " +
            '"' +
            senha +
            '"' +
            ";"
    );
    conn.close();
    return rows;
}

async function verificaLogin(User) {
    const conn = await connect();
    const [rows] = await conn.query(
        "select * from login where login= " + '"' + User + '"' + ";"
    );
    conn.close();
    return rows;
}

async function buscaUsuario() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM login;");
    conn.close();
    return rows;
}

async function inserirUsuario(usuario, senha, cargo, matricula) {
    const conn = await connect();
    conn.query(
        "INSERT INTO login(login,senha,cargo,matricula)values(" +
            '"' +
            usuario +
            "" +
            '",' +
            '"' +
            senha +
            "" +
            '",' +
            '"' +
            cargo +
            "" +
            '",' +
            '"' +
            matricula +
            '");'
    );
    conn.close();
}

async function editarUsuario(usuario, senha, cargo, matricula, id) {
    const conn = await connect();
    conn.query(
        "UPDATE login SET login =" +
            '"' +
            usuario +
            "" +
            '",senha =' +
            '"' +
            senha +
            "" +
            '",cargo=' +
            '"' +
            cargo +
            "" +
            '",matricula =' +
            '"' +
            matricula +
            '"WHERE (id =' +
            '"' +
            id +
            '")'
    );
    conn.close();
}

async function deleteUsuario(id) {
    const conn = await connect();
    conn.query("DELETE FROM login WHERE (id =" + '"' + id + '");');
    conn.close();
}

async function buscaEpi() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM Epi;");
    conn.close();
    return rows;
}

async function inserirEpi(
    Epis,
    cod,
    tipo,
    quantidade,
    tamanho,
    estoque_minimo
) {
    const conn = await connect();
    conn.query(
        "INSERT INTO Epi(Epis,cod,tipo,quantidade,tamanho,estoque_minimo)values(" +
            '"' +
            Epis +
            "" +
            '",' +
            '"' +
            cod +
            "" +
            '",' +
            '"' +
            tipo +
            "" +
            '",' +
            '"' +
            quantidade +
            "" +
            '",' +
            '"' +
            tamanho +
            "" +
            '",' +
            '"' +
            estoque_minimo +
            "" +
            '");'
    );
    conn.close();
}

async function editarEpi(
    Epis,
    cod,
    tipo,
    quantidade,
    tamanho,
    estoque_minimo,
    id
) {
    const conn = await connect();
    conn.query(
        "UPDATE Epi SET Epis =" +
            '"' +
            Epis +
            "" +
            '",cod =' +
            '"' +
            cod +
            "" +
            '",tipo=' +
            '"' +
            tipo +
            "" +
            '",quantidade =' +
            '"' +
            quantidade +
            '",tamanho =' +
            '"' +
            tamanho +
            "" +
            '",estoque_minimo=' +
            '"' +
            estoque_minimo +
            "" +
            '"WHERE (id =' +
            '"' +
            id +
            '")'
    );
    conn.close();
}

async function deleteEpi(id) {
    const conn = await connect();
    conn.query("DELETE FROM Epi WHERE (id =" + '"' + id + '");');
    conn.close();
}

module.exports = {
    buscaUsuario,
    VerificarMatriculaSenha,
    inserirUsuario,
    deleteUsuario,
    editarUsuario,
    buscaEpi,
    inserirEpi,
    editarEpi,
    deleteEpi,
    verificaLogin,
};
