document.addEventListener("DOMContentLoaded", function (event) {
    var btnLogin = document.querySelector(".btnLogin");
    btnLogin.addEventListener("click", (event) => {
        event.preventDefault();

        var login = document.getElementsByClassName("login")[0];
        var senha = document.getElementsByClassName("senha")[0];
        if (login.value == "") {
            login.style.borderColor = "red";
            return;
        } else {
            login.style.borderColor = "#b2b2b2";
        }

        if (senha.value == "") {
            senha.style.borderColor = "red";
            return;
        } else if (senha.value.length <= 7) {
            console.log(senha.value.length);
            alert("Senha curta, a senha deve ter pelo menos 8 caracteres");
            senha.style.borderColor = "red";
        } else {
            senha.style.borderColor = "#b2b2b2";
        }

        form = document.forms[0];
        var result = form.submit();
        console.log(result);
    });
});
