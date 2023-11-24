document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnAlterar");

    btnGravar.addEventListener("click", alterarPessoa);
})

function alterarPessoa() {
    
    var razaoSocial = document.getElementById("razaoSocial");
    var email = document.getElementById("email");
    var CEP = document.getElementById("CEP");
    var logradouro = document.getElementById("logradouro");
    var CNPJ = document.getElementById("CNPJ");
    var numTelefone = document.getElementById("numTelefone");
    var id = document.getElementById("id");

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
            numTelefone: numTelefone.value,
            id: id.value
        }

        fetch('/Pessoas/alterar', {
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
                alert("Pessoa alterada!");
            }
            else{
                alert("Erro ao alterar pessoa");
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