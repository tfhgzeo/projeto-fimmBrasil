async function connect() {
    const mysql = require("mysql2/promise")
    const connection = mysql.createConnection({
        host: '10.255.1.3',
        user: 'omb.mrm',
        password: "5456mrm",
        database: 'Fimm_Brasil'
      });
      return connection
}

async function selectUsers(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM login;');
    return rows;
}

async function selectUsersTeste(user, senha){
    const conn = await connect();
    const [rows] = await conn.query('select * from login where login= ' +'"'+ user + '"' + 'and senha = ' +'"'+ senha + '"' +";");
    return rows;
}

module.exports = {selectUsers, selectUsersTeste}
