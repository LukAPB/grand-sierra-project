document.addEventListener("DOMContentLoaded", function(){

    var cnpj = document.getElementById("cnpj");
    var codigoBarras = document.getElementById("codigoBarras");

    cnpj.addEventListener("blur", verificarCNPJ);
    codigoBarras.addEventListener("blur", verificaCodigoBarras)
})

function verificarCNPJ(){
    let CNPJ = document.getElementById("cnpj");
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
                alert("CNPJ não cadastrado. Por favor, efetue o cadastro de pessoa jurídica.");
            }
        })
        .catch(e => {
            console.log(e);
        })
    }
}

function verificaCodigoBarras(){
    let produtoNome = document.getElementById("produtoNome");
    let produtoQuantidade = document.getElementById("produtoQuantidade");
    let produtoValor = document.getElementById("produtoValor");
    let codigoBarras = document.getElementById("codigoBarras");
    let divNotaFiscal = document.getElementById("divNotaFiscal")

    if(codigoBarras.value != ""){
        var codigobarras = {
            codigoBarras: codigoBarras.value
        }
        fetch('/Produto/verificaCodigoBarras', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(codigobarras)
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Deu certo!")
                codigoBarras.disabled = true;
                produtoNome.value = r.produto.prodNome;
                produtoQuantidade.disabled = false;
                produtoQuantidade.max = r.produto.prodEstoque;
                produtoValor.disabled = false;
                produtoValor.value = r.produto.prodPreco;
                
                divNotaFiscal.style = "display: block"

            }
            else{
                alert("Produto não cadastrado. Por favor, efetue o cadastro de produto.");
            }
        })
        .catch(e => {
            console.log(e);
        })
    }
}