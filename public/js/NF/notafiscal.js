let listaProdutos = [];
let valorTotalDaNota = 0;

document.addEventListener("DOMContentLoaded", function(){
    
    var cnpj = document.getElementById("cnpj");
    var codigoBarras = document.getElementById("codigoBarras");
    var botaoTabela = document.getElementById("botaoTabela")
    var botaoFinalizar = document.getElementById("botaoFinalizar");

    var NotaNum = document.getElementById("notaNum");
    var NotaData = document.getElementById("notaData");
    var NotaValor = document.getElementById("notaValor");
    var ProdutoValor = document.getElementById("produtoValor");
    var ProdutoQuantidade = document.getElementById("produtoQuantidade");

    cnpj.addEventListener("change", verificarCNPJ);
    codigoBarras.addEventListener("change", verificaCodigoBarras);
    botaoTabela.addEventListener("click", gravarProdutoLocal);
    botaoFinalizar.addEventListener("click", gravarNotaBanco);
    NotaNum.addEventListener("input", function(){
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    ProdutoQuantidade.addEventListener("input", function(){
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    NotaValor.addEventListener("input", function(){
        if(this.value === "" || parseFloat(this.value) < 0){
            alert("Valor da nota fiscal inválido");
            this.value = "";
        }
        this.value = this.value.replace(/\D/g, ''); // Remove non-digit characters
        this.value = this.value.replace(/^(\d{1,})(\d{2})$/, "$1,$2"); // Add comma for decimal separator
        this.value = this.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Add dot for thousands separator
    });

    ProdutoValor.addEventListener("input", function(){
        this.value = this.value.replace(/\D/g, ''); // Remove non-digit characters
        this.value = this.value.replace(/^(\d{1,})(\d{2})$/, "$1,$2"); // Add comma for decimal separator
        this.value = this.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."); // Add dot for thousands separator
        if(this.value === "" || isNaN(parseFloat(this.value))){
            alert("Valor do produto inválido");
            this.value = "";
        }
    });

    ProdutoQuantidade.addEventListener("input", function(){
        var quantidade = parseInt(this.value);
        if(this.value === "" || isNaN(quantidade) || quantidade <= 0 || this.value != quantidade){
            alert("Quantidade inválida");
            this.value = "";
        }
    });

    NotaData.addEventListener("change", function(){
        var selectedDate = new Date(this.value);
        var currentDate = new Date();
        if(selectedDate > currentDate || isNaN(selectedDate)){
            alert("Data inválida");
            this.value = "";
        }
    });

    [NotaValor, ProdutoValor].forEach(function(elemento){
        elemento.addEventListener("input", function(){
            var valor = parseFloat(this.value);
            if(isNaN(valor) || valor <= 0){
                alert("Valor inválido");
                this.value = "";
            }
        });
    });

    codigoBarras.selectedIndex = 0;
    cnpj.selectedIndex = 0;

    window.onload = function(){
        var inputs = document.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            inputs[i].value = "";
        }
    };


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
                    CNPJ.options[CNPJ.selectedIndex].innerHTML = r.pessoa.pjCNPJ;
                    nome.value = r.pessoa.pessoaNome;
                    CNPJ.disabled = true;
                    notaNum.disabled = false;
                    notaData.disabled = false;
                    notaValor.disabled = false;
                    codigoBarras.disabled = false;
                    divProduto.style = "display: block";
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
        let notaNum = document.getElementById("notaNum");
        let notaData = document.getElementById("notaData");
        let notaValor = document.getElementById("notaValor");
        let botaoTabela = document.getElementById("botaoTabela");

        notaData.classList.remove("is-invalid");
        notaValor.classList.remove("is-invalid");
        notaNum.classList.remove("is-invalid");

        if(notaNum.value != "" && notaData.value != "" && notaValor.value != "" && codigoBarras.value != ""){
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
                    codigoBarras.options[codigoBarras.selectedIndex].innerHTML = r.produto.prodCodBarras;
                    codigoBarras.disabled = true;
                    produtoNome.value = r.produto.prodNome;
                    produtoQuantidade.disabled = false;
                    produtoValor.disabled = false;
                    notaNum.disabled = true;
                    notaData.disabled = true;
                    notaValor.disabled = true;
                    botaoTabela.style = "display: block;"
                }
                else{
                    alert("Produto não cadastrado. Por favor, efetue o cadastro de produto.");
                }
            })
            .catch(e => {
                console.log(e);
            })
        } else {
            if (notaNum.value == "")
            {
                notaNum.classList.add("is-invalid");
            }
            if (notaValor.value == "")
            {
                notaValor.classList.add("is-invalid");
            }
            if (notaData.value == ""){
                notaData.classList.add("is-invalid");
            }
            codigoBarras.selectedIndex = 0;
            alert("Preencha os campos destacados!");
        }
    }

    function gravarProdutoLocal(){
        let produtoNome = document.getElementById("produtoNome");
        let produtoQuantidade = document.getElementById("produtoQuantidade");
        let produtoValor = document.getElementById("produtoValor");
        let codigoBarras = document.getElementById("codigoBarras");
        let divNotaFiscal = document.getElementById("divNotaFiscal");
        let CNPJ = document.getElementById("cnpj");
        let notaNum = document.getElementById("notaNum");
        let notaData = document.getElementById("notaData");
        let notaValor = document.getElementById("notaValor");
        let btnValorTotalDaNota = document.getElementById("btnValorTotalDaNota");

        produtoQuantidade.classList.remove("is-invalid");
        produtoValor.classList.remove("is-invalid");
        
        if (produtoQuantidade.value != "" && produtoValor.value != "" && produtoQuantidade.disabled == false){

            divNotaFiscal.style = "display: block";

            let produto = {
                produtoNome: produtoNome.value,
                produtoQuantidade: produtoQuantidade.value,
                produtoValor: produtoValor.value.replace(',', '.'),
                codigoBarras: codigoBarras.value,
                CNPJ: CNPJ.value,
                notaNum: notaNum.value,
                notaData: notaData.value,
                notaValor: notaValor.value.replace(',','.')
            }
    
            listaProdutos.push(produto);
    
            localStorage.setItem('itensNota', JSON.stringify(listaProdutos));

            valorTotalDaNota += (parseInt(produto.produtoQuantidade) * parseFloat(produto.produtoValor));
    
            let html = `
                        <tr id="R${produto.codigoBarras}" >
                          <td>
                            <div class="d-flex px-2">
                              <div class="avatar avatar-sm rounded-circle bg-gray-100 me-2 my-2">
                              <i class="fa-solid fa-barcode" style="color: #000000;"></i>
                              </div>
                              <div class="my-auto">
                                <h6 class="mb-0 text-sm">${produto.produtoNome}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                          <span class="text-sm font-weight-normal">${produto.produtoQuantidade}</span>
                          </td>
                          <td>
                            <span class="text-sm font-weight-normal">R$${produto.produtoValor.replace('.',',')}</span>
                          </td>
                          <td>
                            <span class="text-sm font-weight-normal">R$${(parseInt(produto.produtoQuantidade) * parseFloat(produto.produtoValor)).toFixed(2).replace('.',',')}</span>
                          </td>
                          <td class="align-middle">
                            <a type="button" onclick="excluirItemNotaLocal('${produto.codigoBarras}')" class="text-secondary font-weight-bold text-xs" data-bs-toggle="tooltip">
                                <i class="fa-solid fa-trash"></i> Excluir
                            </a>
                          </td>
                        </tr>
                        `;

            document.getElementById("corpoTabela").innerHTML += html;
    
            codigoBarras.disabled = false;
            codigoBarras.value = "";
            produtoNome.disabled = true;
            produtoNome.value = "";
            produtoQuantidade.disabled = true;
            produtoQuantidade.value = "";
            produtoValor.disabled = true;
            produtoValor.value = "";
            btnValorTotalDaNota.innerHTML = `Valor Total da Nota - R$${valorTotalDaNota.toFixed(2).replace('.',',')}`
        } else {
            alert("Verifique os campos!");
            if (produtoQuantidade.value == "")
            {
                produtoQuantidade.classList.add("is-invalid");
            }
            if (produtoValor.value == "")
            {
                produtoValor.classList.add("is-invalid");
            }
        }        
    }

    function gravarNotaBanco(){      
        fetch('/NF/gravarNota', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({listaProdutos: listaProdutos})
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert(r.msg);
                listaProdutos = [];
                localStorage.removeItem('itensNota');
            }
            else{
                alert(r.msg);
            }
        })
    }

    
})

function excluirItemNotaLocal(id){
    let row = "R" + id;
    valorTotalDaNota = 0;
    let codigoBarrasParaRemover = id; 
    let btnValorTotalDaNota = document.getElementById("btnValorTotalDaNota");

    row = document.getElementById(row);
    row.remove();

    listaProdutos = listaProdutos.filter(produto => produto.codigoBarras !== codigoBarrasParaRemover);
    localStorage.setItem('itensNota', JSON.stringify(listaProdutos));
    
    for (let index = 0; index < listaProdutos.length; index++) {
        
        let quant = parseInt(listaProdutos[index].produtoQuantidade);
        let valor = parseFloat(listaProdutos[index].produtoValor);
        
        valorTotalDaNota += quant * valor;
    }

    btnValorTotalDaNota.innerHTML = `Valor Total da Nota - R$${valorTotalDaNota.toFixed(2).replace('.',',')}`
}