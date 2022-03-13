document.addEventListener("DOMContentLoaded", function (event) {
    var btnSair = document.getElementsByClassName("sair")[0];
    btnSair.addEventListener("click", (event) => {
        var form = document.getElementsByClassName("formSair")[0];
        form.submit();
    });

    let btnAtualizaTabela = document.getElementById("atualizaTabela");
    btnAtualizaTabela.addEventListener("click", (e) => {
        e.preventDefault();

        let loader = document.querySelector(".contentLoad");
        let home = document.querySelector(".contentHome");
        home.classList.add("displayNone");
        loader.classList.remove("displayNone");

        atualizaTabelaEpi();
    });

    let btnDeleta = document.getElementById("btnDeletEpi");
    btnDeleta.addEventListener("click", (event) => {
        event.preventDefault();
        let id = document.getElementById("deleteEpi").value;
        if (id != "") {
            let form = document.getElementById("formDeleteEpi");

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let response = xhttp.response;

                    if (response == "ok") {
                        alert("Epi deletado");
                    } else {
                        alert("Ocorreu um erro, tente novamente!");
                    }
                }
            };
            xhttp.open(form.method, form.action + "?id=" + id);
            xhttp.send();
        } else {
            alert("Informe um id");
        }
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

    let formCadEpi = document.getElementById("cadastrarEpi");
    formCadEpi.addEventListener("submit", (event) => {
        event.preventDefault();
        let epi = document.getElementById("epi");
        let cod = document.getElementById("cod");
        let tipo = document.getElementById("tipo");
        let quantidade = document.getElementById("quantidade");
        let tamanho = document.getElementById("tamanho");
        let estoqueMinimo = document.getElementById("estoque");

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (xhttp.responseText == "ok") {
                    alert("Epi cadastrado com sucesso");
                } else if (xhttp.responseText() == "teste") {
                    alert("Sistema em estado de testes");
                } else if (xhttp.responseText() == "cadastrado") {
                    alert("Epi ja cadastrado");
                } else {
                    alert("Ouve um erro no cadastro");
                }
            }
        };
        xhttp.open(
            formCadEpi.method,
            formCadEpi.action +
                "?epi=" +
                epi.value +
                "&cod=" +
                cod.value +
                "&tipo=" +
                tipo.value +
                "&quantidade=" +
                quantidade.value +
                "&tamanho=" +
                tamanho.value +
                "&estoque=" +
                estoqueMinimo.value
        );
        xhttp.send();
    });

    atualizaTabelaEpi();
});

async function atualizaTabelaEpi() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            let response = JSON.parse(xhttp.responseText);

            let tbody = document.getElementById("listaEpis");
            tbody.innerHTML = "";

            for (x in response) {
                let epi = response[x];

                let lista = `<tr>
                    <td>${epi.Epis}</td>
                    <td>${epi.cod}</td>
                    <td>${epi.tipo}</td>
                    <td>${epi.quantidade}</td>
                    <td>${epi.tamanho}</td>
                    <td>${epi.estoque_minimo}</td>
                </tr>`;
                tbody.innerHTML = tbody.innerHTML + lista;
            }
            let loader = document.querySelector(".contentLoad");
            loader.classList.add("displayNone");
            let home = document.querySelector(".contentHome");
            home.classList.remove("displayNone");
        }
    };
    xhttp.open("GET", "http://127.0.0.1:3000/buscarEpis");
    xhttp.send();
}

function filtrarNome() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("epiFilter");
    filter = input.value.toUpperCase();
    tbody = document.getElementById("listaEpis");
    tr = tbody.getElementsByTagName("tr");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("td")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function filtraCod() {
    // Declare variables
    var input, filter, a, i, txtValue;
    input = document.getElementById("codFilter");
    filter = input.value.toUpperCase();
    tbody = document.getElementById("listaEpis");
    tr = tbody.getElementsByTagName("tr");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        a = tr[i].getElementsByTagName("td")[1];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}
