document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnCadastrar");

    btnGravar.addEventListener("click", gravarPessoa);

    var razaoSocial = document.getElementById("razaoSocial");
    var email = document.getElementById("email");
    var CEP = document.getElementById("CEP");
    var logradouro = document.getElementById("logradouro");
    var CNPJ = document.getElementById("CNPJ");
    var numTelefone = document.getElementById("numTelefone");
})

function gravarPessoa() {

    var razaoSocial = document.getElementById("razaoSocial");
    var email = document.getElementById("email");
    var CEP = document.getElementById("CEP");
    var logradouro = document.getElementById("logradouro");
    var CNPJ = document.getElementById("CNPJ");
    var numTelefone = document.getElementById("numTelefone");

    //if de validação básica
    if(razaoSocial.value != "" && email.value != "" && CEP.value != '' 
    && logradouro.value != '' && CNPJ.value != '' 
    && numTelefone.value != ''){

        var pessoa = {
            razaoSocial: razaoSocial.value,
            email: email.value,
            CEP: CEP.value,
            logradouro: logradouro.value,
            CNPJ: CNPJ.value,
            numTelefone: numTelefone.value
        }

        fetch('/Pessoas/cadastrar', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pessoa)
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Pessoa cadastrada!");
            }
            else{
                alert("Erro ao cadastrar pessoa");
            }
        })
        .catch(e => {
            console.log(e);
        })

    }
    else{
        alert("Preencha todos os campos corretamente!");
        return;
    }
}