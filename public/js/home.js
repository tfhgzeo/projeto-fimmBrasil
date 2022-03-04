document.addEventListener('DOMContentLoaded', function(event) {
    console.log("Pagina carregada, carregando o javascript ")
    var btnSair = document.getElementsByClassName("sair")[0];
    btnSair.addEventListener("click", (event) => {
        var form = document.getElementsByClassName("formSair")[0]
        form.submit();
    });
})

