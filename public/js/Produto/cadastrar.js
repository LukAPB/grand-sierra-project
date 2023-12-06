document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnCadastrar");
    var codigoBarras = document.getElementById("codigoBarras");
    var estoque = document.getElementById("estoque");
    var preco = document.getElementById("preco");
    
    btnGravar.addEventListener("click", gravarProduto);

    codigoBarras.addEventListener("input", function() {
        var value = codigoBarras.value;
        value = value.replace(/\D/g, ''); // Remove non-digit characters
        value = value.slice(0, 13); // Limit to 13 digits
        codigoBarras.value = value;
    });

    estoque.addEventListener("input", function() {
        var value = estoque.value;
        value = value.replace(/\D/g, ''); // Remove non-digit characters
        value = value.replace(/^0+/, ''); // Remove leading zeros
        estoque.value = value;
    });
    
    preco.addEventListener("input", function(){
        if(this.value === "" || parseFloat(this.value) < 0){
            alert("Preço inválido");
            this.value = "";
        }
        this.value = this.value.replace(/\D/g, ''); // Remove non-digit characters
        this.value = this.value.replace(/^(\d{1,})(\d{2})$/, "$1,$2"); // Add comma for decimal separator
        this.value = this.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Add dot for thousands separator
    });
})

function gravarProduto() {

    var nome = document.getElementById("nome");
    var codigoBarras = document.getElementById("codigoBarras");
    var estoque = document.getElementById("estoque");
    var preco = document.getElementById("preco");
    
    nome.classList.remove("is-invalid");
    codigoBarras.classList.remove("is-invalid");
    estoque.classList.remove("is-invalid");
    preco.classList.remove("is-invalid");

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
            if (nome.value == "")
            {
                nome.classList.add("is-invalid");
            }
            if (codigoBarras.value == "")
            {
                codigoBarras.classList.add("is-invalid");
            }
            if (estoque.value == ""){
                estoque.classList.add("is-invalid");
            }
            if (preco.value == ""){
                preco.classList.add("is-invalid");
            }
        alert("Preencha os campos destacados!");
        return;
    }
}

