document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnAlterar");

    btnGravar.addEventListener("click", alterarPessoa);

    var razaoSocial = document.getElementById("razaoSocial");
    var CEP = document.getElementById("CEP");
    var logradouro = document.getElementById("logradouro");
    var CNPJ = document.getElementById("CNPJ");
    var numTelefone = document.getElementById("numTelefone");

    razaoSocial.addEventListener("input", function() {
        if (razaoSocial.value.length > 100) {
            razaoSocial.value = razaoSocial.value.slice(0, 100);
        }
    });

    CEP.addEventListener("input", function() {
        var cep = CEP.value.replace(/\D/g, '');
        if (cep.length > 8) {
            cep = cep.slice(0, 8);
        }
        CEP.value = cep;
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (data.logradouro) {
                        logradouro.value = data.logradouro;
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    });

    logradouro.addEventListener("input", function() {
        if (logradouro.value.length > 100) {
            logradouro.value = logradouro.value.slice(0, 100);
        }
    });

    CNPJ.addEventListener("input", function() {
        CNPJ.value = CNPJ.value.replace(/\D/g, '');
        if (CNPJ.value.length > 14) {
            CNPJ.value = CNPJ.value.slice(0, 14);
        }
        if (CNPJ.value.length === 14) {
            if (!validarCNPJ(CNPJ.value)) {
                alert("CNPJ inválido!");
                CNPJ.value = "";
            }
        }
    });

    numTelefone.addEventListener("input", function() {
        numTelefone.value = numTelefone.value.replace(/\D/g, '');
        if (numTelefone.value.length > 15) {
            numTelefone.value = numTelefone.value.slice(0, 15);
        }
    });

    window.onload = function(){
        var inputs = document.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            inputs[i].value = "";
        }
    };

    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) {
            return false;
        }

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cnpj)) {
            return false;
        }

        // Validação do primeiro dígito verificador
        let sum = 0;
        let weight = 2;

        for (let i = 11; i >= 0; i--) {
            sum += parseInt(cnpj.charAt(i)) * weight;
            weight = weight === 9 ? 2 : weight + 1;
        }

        let mod = sum % 11;
        let digit = mod < 2 ? 0 : 11 - mod;

        if (parseInt(cnpj.charAt(12)) !== digit) {
            return false;
        }

        // Validação do segundo dígito verificador
        sum = 0;
        weight = 2;

        for (let i = 12; i >= 0; i--) {
            sum += parseInt(cnpj.charAt(i)) * weight;
            weight = weight === 9 ? 2 : weight + 1;
        }

        mod = sum % 11;
        digit = mod < 2 ? 0 : 11 - mod;

        if (parseInt(cnpj.charAt(13)) !== digit) {
            return false;
        }

        return true;
    }
})

function alterarPessoa() {
    
    var razaoSocial = document.getElementById("razaoSocial");
    var email = document.getElementById("email");
    var CEP = document.getElementById("CEP");
    var logradouro = document.getElementById("logradouro");
    var CNPJ = document.getElementById("CNPJ");
    var numTelefone = document.getElementById("numTelefone");
    var id = document.getElementById("id");

    razaoSocial.classList.remove("is-invalid");
    email.classList.add("is-invalid");
    CEP.classList.add("is-invalid");
    logradouro.classList.add("is-invalid");
    CNPJ.classList.add("is-invalid");
    numTelefone.classList.add("is-invalid");

    //if de validação básica
    if(razaoSocial.value != "" && validarEmail(email.value) && CEP.value.length >= 13
    && logradouro.value != '' && CNPJ.value.length >= 14
    && numTelefone.value.length >= 8){

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
        if (CNPJ.value == "")
            CNPJ.classList.add("is-invalid");
        if (razaoSocial.value == "")
            razaoSocial.classList.add("is-invalid");
        if (CEP.value.length <= 13)
            CEP.classList.add("is-invalid");
        if (!validarEmail(email.value))
            email.classList.add("is-invalid");
        if (CNPJ.value.length <= 14)
            CNPJ.classList.add("is-invalid");
        if (numTelefone.value.length <= 8)
            numTelefone.classList.add("is-invalid");
        if (logradouro.value == '')
            logradouro.classList.add("is-invalid");
        
        alert("Preencha os campos destacados!");
        return;
    }
}