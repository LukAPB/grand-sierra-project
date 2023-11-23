document.addEventListener("DOMContentLoaded", function(){

    var cnpj = document.getElementById("cnpj");

    cnpj.addEventListener("blur", verificarCNPJ);
})

function verificarCNPJ(){
    var CNPJ = document.getElementById("cnpj");
    let nome = document.getElementById("nome");
    let notaNum = document.getElementById("notaNum");
    let notaData = document.getElementById("notaData");
    let notaValor = document.getElementById("notaValor");
    let codigoBarras = document.getElementById("codigoBarras");
    let divProduto = document.getElementById("divProduto")

    if(CNPJ.value != ""){
        var cnpj = {
            cnpj: CNPJ.value
        }
        fetch('/Pessoas/verificaCNPJ', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cnpj)
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Deu certo!")
                nome.value = r.pessoa.pessoaNome;
                CNPJ.disabled = true;
                notaNum.disabled = false;
                notaData.disabled = false;
                notaValor.disabled = false;
                codigoBarras.disabled = false;
                divProduto.style = "display: block"

            }
            else{
                alert("Erro ao cadastrar pessoa");
            }
        })
        .catch(e => {
            console.log(e);
        })
    }
}