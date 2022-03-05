async function teste() {
    const db = require("./db");
    const usuario = await db.buscaEpi();
    console.log(usuario);
}

teste();

function desenhar() {
    const tbody = document.getElementById("listaRegistrosBody");
    if (tbody) {
        var data = listaRegistros.usuarios;
        if (FILTRO.trim()) {
            const expReg = eval(
                `/${FILTRO.trim().replace(/[^\d\w]+/g, ".*")}/i`
            );
            data = data.filter((usuario) => {
                return expReg.test(usuario.nome) || expReg.test(usuario.fone);
            });
        }
        data = data
            .sort((a, b) => {
                return a.nome < b.nome ? -1 : 1;
            })
            .map((usuario) => {
                return `<tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.fone}</td>
                        <td>
                            <button onclick='vizualizar("cadastro",false,${usuario.id})'>Editar</button>
                            <button class='vermelho' onclick='perguntarSeDeleta(${usuario.id})'>Deletar</button>
                        </td>
                    </tr>`;
            });
        tbody.innerHTML = data.join("");
    }
}
