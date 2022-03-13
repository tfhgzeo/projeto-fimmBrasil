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

async function VerificarMatriculaSenha(login, senha) {
    const conn = await connect();
    const [rows] = await conn.query(
        "select * from login where login= " +
            '"' +
            login +
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

async function verificaLogin(login) {
    const conn = await connect();
    const [rows] = await conn.query(
        "select * from login where login= " + '"' + login + '"' + ";"
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

async function inserirUsuario(usuario, senha, cargo, nome) {
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
            nome +
            '");'
    );
    conn.close();
}

async function editarUsuario(usuario, senha, cargo, nome, id) {
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
            nome +
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

async function buscaEpiPorEpi(epi) {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM Epi WHERE Epis = " + '"' + epi + '";'
    );
    conn.close();
    return rows;
}

async function buscaEpiPorCod(cod) {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM Epi WHERE Cod = " + '"' + cod + '";'
    );
    conn.close();
    return rows;
}

async function inserirEpi(
    epis,
    cod,
    tipo,
    quantidade,
    tamanho,
    estoque_minimo
) {
    const conn = await connect();
    try {
        conn.query(
            "INSERT INTO Epi(Epis,cod,tipo,quantidade,tamanho,estoque_minimo)values(" +
                '"' +
                epis +
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
        return "ok";
    } catch (error) {
        return error;
    }
}

async function editarEpi(
    epis,
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
            epis +
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
    try {
        conn.query("DELETE FROM Epi WHERE (id =" + '"' + id + '");');
        conn.close();
        return "ok";
    } catch (error) {
        return error;
    }
}

async function filtrarEpi(cod) {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM Epi WHERE cod=" + "'" + cod + "'" + ";"
    );
    conn.close();
    return rows;
}

async function buscaSolicitacoes() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM Solicitacao;");
    conn.close();
    return rows;
}

async function inserirSolicitacao(
    usuario,
    Matricula,
    Epis,
    cod,
    Tipo,
    Quantidade,
    Tamanho,
    Dia
) {
    const conn = await connect();
    conn.query(
        "INSERT INTO Solicitacao(usuario,Matricula,Epis,cod,Tipo,Quantidade,Tamanho,Dia)values(" +
            '"' +
            usuario +
            "" +
            '",' +
            '"' +
            Matricula +
            "" +
            '",' +
            '"' +
            Epis +
            "" +
            '",' +
            '"' +
            cod +
            "" +
            '",' +
            '"' +
            Tipo +
            "" +
            '",' +
            '"' +
            Quantidade +
            "" +
            '",' +
            '"' +
            Tamanho +
            "" +
            '",' +
            '"' +
            Dia +
            "" +
            '");'
    );
    conn.close();
}

async function editarSolicitacao(
    usuario,
    Matricula,
    Epis,
    cod,
    Tipo,
    Quantidade,
    Tamanho,
    Dia,
    id
) {
    const conn = await connect();
    conn.query(
        "UPDATE Solicitacao SET usuario =" +
            '"' +
            usuario +
            "" +
            '",Matricula =' +
            '"' +
            Matricula +
            "" +
            '",Epis=' +
            '"' +
            Epis +
            "" +
            '",cod =' +
            '"' +
            cod +
            '",Tipo =' +
            '"' +
            Tipo +
            "" +
            '",Quantidade=' +
            '"' +
            Quantidade +
            "" +
            '",Tamanho =' +
            '"' +
            Tamanho +
            "" +
            '",Dia=' +
            '"' +
            Dia +
            "" +
            '"WHERE (id =' +
            '"' +
            id +
            '")'
    );
    conn.close();
}

async function deleteSolicitacao(id) {
    const conn = await connect();
    conn.query("DELETE FROM Solicitacao WHERE (id =" + '"' + id + '");');
    conn.close();
}

async function buscaFuncionario() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM Funcionarios;");
    conn.close();
    return rows;
}

async function inserirFuncionario(
    Matricula,
    Nome,
    Cpf,
    Base,
    Data_Admissao,
    Data_Demissao
) {
    const conn = await connect();
    conn.query(
        "INSERT INTO Funcionarios(Matricula,Nome,Cpf,Base,Data_Admissao,Data_Demissao)values(" +
            '"' +
            Matricula +
            "" +
            '",' +
            '"' +
            Nome +
            "" +
            '",' +
            '"' +
            Cpf +
            "" +
            '",' +
            '"' +
            Base +
            "" +
            '",' +
            '"' +
            Data_Admissao +
            "" +
            '",' +
            '"' +
            Data_Demissao +
            "" +
            '");'
    );
    conn.close();
}

async function editarFuncionarios(
    Matricula,
    Nome,
    Cpf,
    Base,
    Data_Admissao,
    Data_Demissao,
    id
) {
    const conn = await connect();
    conn.query(
        "UPDATE Funcionarios SET Matricula =" +
            '"' +
            Matricula +
            "" +
            '",Nome =' +
            '"' +
            Nome +
            "" +
            '",Cpf=' +
            '"' +
            Cpf +
            "" +
            '",Base =' +
            '"' +
            Base +
            '",Data_Admissao =' +
            '"' +
            Data_Admissao +
            "" +
            '",Data_Demissao=' +
            '"' +
            Data_Demissao +
            "" +
            '"WHERE (id =' +
            '"' +
            id +
            '")'
    );
    conn.close();
}

async function deleteFuncionarios(id) {
    const conn = await connect();
    conn.query("DELETE FROM Funcionarios WHERE (id =" + '"' + id + '");');
    conn.close();
}

async function filtrarFuncionarios(cpf) {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM Funcionarios WHERE cod=" + "'" + cpf + "'" + ";"
    );
    conn.close();
    return rows;
}

async function buscaTamanho() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM Tamanho;");
    conn.close();
    return rows;
}

async function inserirTamanho(matricula, nome, bota, calca, camisa, jaqueta) {
    const conn = await connect();
    conn.query(
        "INSERT INTO Tamanho (Matricula,Nome,Bota,Calca,Camisa,Jaqueta)values(" +
            '"' +
            matricula +
            "" +
            '",' +
            '"' +
            nome +
            "" +
            '",' +
            '"' +
            bota +
            "" +
            '",' +
            '"' +
            calca +
            "" +
            '",' +
            '"' +
            camisa +
            "" +
            '",' +
            '"' +
            jaqueta +
            "" +
            '");'
    );
    conn.close();
}

async function editarTamanho(
    matricula,
    nome,
    bota,
    calca,
    camisa,
    jaqueta,
    id
) {
    const conn = await connect();
    conn.query(
        "UPDATE Tamanho SET Matricula =" +
            '"' +
            matricula +
            "" +
            '",Nome =' +
            '"' +
            nome +
            "" +
            '",Bota=' +
            '"' +
            bota +
            "" +
            '",Calca =' +
            '"' +
            calca +
            '",Camisa =' +
            '"' +
            camisa +
            "" +
            '",Jaqueta=' +
            '"' +
            jaqueta +
            "" +
            '"WHERE (id =' +
            '"' +
            id +
            '")'
    );
    conn.close();
}

async function deleteTamanho(id) {
    const conn = await connect();
    conn.query("DELETE FROM Tamanho WHERE (id =" + '"' + id + '");');
    conn.close();
}

async function filtrarTamanho(matricula) {
    const conn = await connect();
    const [rows] = await conn.query(
        "SELECT * FROM Funcionarios WHERE cod=" + "'" + matricula + "'" + ";"
    );
    conn.close();
    return rows;
}

async function buscaFornecedor() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM Fornecedor;");
    conn.close();
    return rows;
}

async function inserirFornecedor(fornecedor, cnpj, endereco) {
    const conn = await connect();
    conn.query(
        "INSERT INTO Fornecedor (Fornecedor,CNPJ,Endereco)VALUES(" +
            '"' +
            fornecedor +
            "" +
            '",' +
            '"' +
            cnpj +
            "" +
            '",' +
            '"' +
            endereco +
            "" +
            '");'
    );
    conn.close();
}

async function editarFornecedor(fornecedor, cnpj, endereco, id) {
    const conn = await connect();
    conn.query(
        "UPDATE Fornecedor SET Fornecedor =" +
            '"' +
            fornecedor +
            "" +
            '",CNPJ =' +
            '"' +
            cnpj +
            "" +
            '",Endereco=' +
            '"' +
            endereco +
            "" +
            '"WHERE (id =' +
            '"' +
            id +
            '")'
    );
    conn.close();
}

async function deleteFornecedor(id) {
    const conn = await connect();
    conn.query("DELETE FROM Fornecedor WHERE (id =" + '"' + id + '");');
    conn.close();
}

async function buscaContatoFornecedor() {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM Fornecedor_Contato;");
    conn.close();
    console.log(rows);
    return rows;
}

async function inserirContatoFornecedor(cnpj, telefone, email) {
    const conn = await connect();
    conn.query(
        "INSERT INTO Fornecedor_Contato (CNPJ,Telefone,Email)VALUES(" +
            '"' +
            cnpj +
            "" +
            '",' +
            '"' +
            telefone +
            "" +
            '",' +
            '"' +
            email +
            "" +
            '");'
    );
    conn.close();
}

async function editarContatoFornecedor(cnpj, telefone, email, id) {
    const conn = await connect();
    conn.query(
        "UPDATE Fornecedor_Contato SET CNPJ =" +
            '"' +
            cnpj +
            "" +
            '",Telefone =' +
            '"' +
            telefone +
            "" +
            '",Email=' +
            '"' +
            email +
            "" +
            '"WHERE (id =' +
            '"' +
            id +
            '")'
    );
    conn.close();
}

async function deleteContatoFornecedor(id) {
    const conn = await connect();
    conn.query("DELETE FROM Fornecedor_Contato WHERE (id =" + '"' + id + '");');
    conn.close();
}

module.exports = {
    buscaUsuario,
    VerificarMatriculaSenha,
    inserirUsuario,
    deleteUsuario,
    editarUsuario,
    buscaEpi,
    buscaEpiPorEpi,
    buscaEpiPorCod,
    inserirEpi,
    editarEpi,
    deleteEpi,
    verificaLogin,
    filtrarEpi,
    buscaSolicitacoes,
    inserirSolicitacao,
    editarSolicitacao,
    deleteSolicitacao,
    buscaFuncionario,
    inserirFuncionario,
    editarFuncionarios,
    deleteFuncionarios,
    filtrarFuncionarios,
    buscaTamanho,
    inserirTamanho,
    editarTamanho,
    deleteTamanho,
    filtrarTamanho,
    buscaFornecedor,
    inserirFornecedor,
    editarFornecedor,
    deleteFornecedor,
    buscaContatoFornecedor,
    inserirContatoFornecedor,
    editarContatoFornecedor,
    deleteContatoFornecedor,
};
