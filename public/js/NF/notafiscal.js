document.addEventListener("DOMContentLoaded", function(){

    let listaProdutos = [];
    var cnpj = document.getElementById("cnpj");
    var codigoBarras = document.getElementById("codigoBarras");
    var botaoTabela = document.getElementById("botaoTabela")
    var botaoFinalizar = document.getElementById("botaoFinalizar");

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
                        <tr>
                          <td>
                            <div class="d-flex px-2">
                              <div class="avatar avatar-sm rounded-circle bg-gray-100 me-2 my-2">
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
                            <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-bs-toggle="tooltip" data-bs-title="Edit user">
                              <svg width="14" height="14" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2201 2.02495C10.8292 1.63482 10.196 1.63545 9.80585 2.02636C9.41572 2.41727 9.41635 3.05044 9.80726 3.44057L11.2201 2.02495ZM12.5572 6.18502C12.9481 6.57516 13.5813 6.57453 13.9714 6.18362C14.3615 5.79271 14.3609 5.15954 13.97 4.7694L12.5572 6.18502ZM11.6803 1.56839L12.3867 2.2762L12.3867 2.27619L11.6803 1.56839ZM14.4302 4.31284L15.1367 5.02065L15.1367 5.02064L14.4302 4.31284ZM3.72198 15V16C3.98686 16 4.24091 15.8949 4.42839 15.7078L3.72198 15ZM0.999756 15H-0.000244141C-0.000244141 15.5523 0.447471 16 0.999756 16L0.999756 15ZM0.999756 12.2279L0.293346 11.5201C0.105383 11.7077 -0.000244141 11.9624 -0.000244141 12.2279H0.999756ZM9.80726 3.44057L12.5572 6.18502L13.97 4.7694L11.2201 2.02495L9.80726 3.44057ZM12.3867 2.27619C12.7557 1.90794 13.3549 1.90794 13.7238 2.27619L15.1367 0.860593C13.9869 -0.286864 12.1236 -0.286864 10.9739 0.860593L12.3867 2.27619ZM13.7238 2.27619C14.0917 2.64337 14.0917 3.23787 13.7238 3.60504L15.1367 5.02064C16.2875 3.8721 16.2875 2.00913 15.1367 0.860593L13.7238 2.27619ZM13.7238 3.60504L3.01557 14.2922L4.42839 15.7078L15.1367 5.02065L13.7238 3.60504ZM3.72198 14H0.999756V16H3.72198V14ZM1.99976 15V12.2279H-0.000244141V15H1.99976ZM1.70617 12.9357L12.3867 2.2762L10.9739 0.86059L0.293346 11.5201L1.70617 12.9357Z" fill="#64748B" />
                              </svg>
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