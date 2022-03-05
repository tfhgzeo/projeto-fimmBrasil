document.addEventListener("DOMContentLoaded", function (event) {
    console.log("Pagina carregada, carregando o javascript ");
    var btnSair = document.getElementsByClassName("sair")[0];
    btnSair.addEventListener("click", (event) => {
        var form = document.getElementsByClassName("formSair")[0];
        form.submit();
    });

    // BOTES
    var btnHome = document.querySelector(".btnHome");
    var btnRelatorio = document.querySelector(".btnRelarorio");
    var btnSolicitacao = document.querySelector(".btnSolicitacao");
    var btnFornecedores = document.querySelector(".btnFornecedores");
    var btnCadastro = document.querySelector(".btnCadastro");

    // CONTEUDOS
    var contentHome = document.querySelector(".contentHome");
    var contentRelatorio = document.querySelector(".contentRelatorio");
    var contentSolicitacao = document.querySelector(".contentSolicitacao");
    var contentFornecedores = document.querySelector(".contentFornecedores");
    var contentCadastro = document.querySelector(".contentCadastro");

    btnHome.style.color = "#D5CF2F";
    contentRelatorio.classList.add("displayNone");
    contentSolicitacao.classList.add("displayNone");
    contentFornecedores.classList.add("displayNone");
    contentCadastro.classList.add("displayNone");

    btnHome.addEventListener("click", (event) => {
        event.preventDefault();

        btnHome.style.color = "#D5CF2F";
        btnRelatorio.style.color = "#CACACA";
        btnSolicitacao.style.color = "#CACACA";
        btnFornecedores.style.color = "#CACACA";
        btnCadastro.style.color = "#CACACA";

        contentHome.classList.remove("displayNone");
        contentRelatorio.classList.add("displayNone");
        contentSolicitacao.classList.add("displayNone");
        contentFornecedores.classList.add("displayNone");
        contentCadastro.classList.add("displayNone");
    });

    btnRelatorio.addEventListener("click", (event) => {
        event.preventDefault();

        btnHome.style.color = "#CACACA";
        btnRelatorio.style.color = "#D5CF2F";
        btnSolicitacao.style.color = "#CACACA";
        btnFornecedores.style.color = "#CACACA";
        btnCadastro.style.color = "#CACACA";

        contentHome.classList.add("displayNone");
        contentRelatorio.classList.remove("displayNone");
        contentSolicitacao.classList.add("displayNone");
        contentFornecedores.classList.add("displayNone");
        contentCadastro.classList.add("displayNone");
    });

    btnSolicitacao.addEventListener("click", (event) => {
        event.preventDefault();

        btnHome.style.color = "#CACACA";
        btnRelatorio.style.color = "#CACACA";
        btnSolicitacao.style.color = "#D5CF2F";
        btnFornecedores.style.color = "#CACACA";
        btnCadastro.style.color = "#CACACA";

        contentHome.classList.add("displayNone");
        contentRelatorio.classList.add("displayNone");
        contentSolicitacao.classList.remove("displayNone");
        contentFornecedores.classList.add("displayNone");
        contentCadastro.classList.add("displayNone");
    });

    btnFornecedores.addEventListener("click", (event) => {
        event.preventDefault();

        btnHome.style.color = "#CACACA";
        btnRelatorio.style.color = "#CACACA";
        btnSolicitacao.style.color = "#CACACA";
        btnFornecedores.style.color = "#D5CF2F";
        btnCadastro.style.color = "#CACACA";

        contentHome.classList.add("displayNone");
        contentRelatorio.classList.add("displayNone");
        contentSolicitacao.classList.add("displayNone");
        contentFornecedores.classList.remove("displayNone");
        contentCadastro.classList.add("displayNone");
    });

    btnCadastro.addEventListener("click", (event) => {
        event.preventDefault();

        btnHome.style.color = "#CACACA";
        btnRelatorio.style.color = "#CACACA";
        btnSolicitacao.style.color = "#CACACA";
        btnFornecedores.style.color = "#CACACA";
        btnCadastro.style.color = "#D5CF2F";

        contentHome.classList.add("displayNone");
        contentRelatorio.classList.add("displayNone");
        contentSolicitacao.classList.add("displayNone");
        contentFornecedores.classList.add("displayNone");
        contentCadastro.classList.remove("displayNone");
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);

            for (x in response) {
                var epi = response[x];

                var tbody = document.getElementById("listaEpis");
                var lista = `<tr>
                    <td>${epi.Epis}</td>
                    <td>${epi.cod}</td>
                    <td>${epi.Tipo}</td>
                    <td>${epi.Quantidade}</td>
                    <td>${epi.Tamanho}</td>
                    <td>${epi.Estoque_Minimo}</td>
                </tr>`;
                tbody.innerHTML = tbody.innerHTML + lista;
            }
        }
    };
    xhttp.open("GET", "http://127.0.0.1:3000/buscarEpis", true);
    xhttp.send();
});
