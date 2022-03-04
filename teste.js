const { type } = require("express/lib/response");

//index.js
(async () => {
    const db = require("./db");
    console.log("Começou!");

    console.log("SELECT * FROM LOGIN");
    const clientes = await db.selectUsers();
    for (const x in clientes) {
        if (Object.hasOwnProperty.call(clientes, x)) {
            const dados = clientes[x];
            console.log(x)
            console.log(dados.login)
        }
    }
})();
