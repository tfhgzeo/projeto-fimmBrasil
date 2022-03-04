async function teste(Usuario, senha) {
    const db = require("./db");
    const usuario = await db.verificaLogin(Usuario);
    if (usuario[0]) {
        console.log("usuario encontrado")
        if (senha == usuario[0].senha) {
            console.log("Senha correta, login altorizado")
        }else{
            console.log("Senha incorreta, verifique a senha")
        }
    }else{
        console.log("usuario não encontrado")
    }
}

teste("Gustavo", "Nmzvivli@Iqzma");
