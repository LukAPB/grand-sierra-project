document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnCadastrar");

    btnGravar.addEventListener("click", gravarProduto);
})

function gravarProduto() {

    var nome = document.getElementById("nome");
    var codigoBarras = document.getElementById("codigoBarras");
    var estoque = document.getElementById("estoque");
    var preco = document.getElementById("preco");

    //if de validação básica
    if(nome.value != "" && codigoBarras.value != "" && estoque.value != '' 
    && preco.value != ''){

        var produto = {
            nome: nome.value,
            codigoBarras: codigoBarras.value,
            estoque: estoque.value,
            preco: preco.value,
        }

        fetch('/Produto/cadastrar', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Produto cadastrado!");
            }
            else{
                alert("Erro ao cadastrar produto");
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