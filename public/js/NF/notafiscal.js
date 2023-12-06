document.addEventListener("DOMContentLoaded", function(){

    let listaProdutos = [];
    var cnpj = document.getElementById("cnpj");
    var codigoBarras = document.getElementById("codigoBarras");
    var botaoTabela = document.getElementById("botaoTabela")
    var botaoFinalizar = document.getElementById("botaoFinalizar");
    var id = 0;

    cnpj.addEventListener("change", verificarCNPJ);
    codigoBarras.addEventListener("change", verificaCodigoBarras);
    botaoTabela.addEventListener("click", gravarProdutoLocal);
    botaoFinalizar.addEventListener("click", gravarNotaBanco);

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
                    codigoBarras.options[codigoBarras.selectedIndex].innerHTML = r.produto.prodCodBarras;
                    codigoBarras.disabled = true;
                    produtoNome.value = r.produto.prodNome;
                    produtoQuantidade.disabled = false;
                    produtoValor.disabled = false;
                    notaNum.disabled = true;
                    notaData.disabled = true;
                    notaValor.disabled = true;
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
        
        if (produtoQuantidade.disabled == false){

            divNotaFiscal.style = "display: block";

            let produto = {
                produtoNome: produtoNome.value,
                produtoQuantidade: produtoQuantidade.value,
                produtoValor: produtoValor.value,
                codigoBarras: codigoBarras.value,
                CNPJ: CNPJ.value,
                notaNum: notaNum.value,
                notaData: notaData.value,
                notaValor: notaValor.value
            }
    
            listaProdutos.push(produto);
    
            localStorage.setItem('itensNota', JSON.stringify(listaProdutos));
    
            let html = `
                        <tr id="R${id}" >
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
                            <span class="text-sm font-weight-normal">R$${produto.produtoValor}</span>
                          </td>
                          <td>
                            <span class="text-sm font-weight-normal">R${(produto.produtoQuantidade * produto.produtoValor)}</span>
                          </td>
                          <td class="align-middle">
                            <a type="button" onclick="excluirItemNotaLocal('${id}')" class="text-secondary font-weight-bold text-xs" data-bs-toggle="tooltip">
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
            id++;
        } else {
            alert("Não há produto para gravar!")
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
    row = document.getElementById(row);
    row.remove();
}