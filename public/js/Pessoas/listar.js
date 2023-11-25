document.addEventListener("DOMContentLoaded", function(){

    var listaBtns = document.querySelectorAll(".btnExcluir");

    for(var i = 0; i<listaBtns.length; i++) {
        listaBtns[i].addEventListener("click", excluirProduto);
    }

    document.getElementById("btnPesquisar").addEventListener('click', filtrarTabela);

    function montarTabela(lista) {

        let htmlBody = `<tbody>`;

        lista.forEach(function(value, index) {
            htmlBody += `<tr>
                      <td>
                        <div class="d-flex px-2">
                          <div class="avatar avatar-sm rounded-circle bg-gray-100 me-2 my-2">
                            <i class="fa-regular fa-building" style="color: #000000;"></i>
                            <!-- <img src="/img/small-logos/logo-spotify.svg" class="w-80" alt="spotify"> -->
                          </div>
                          <div class="my-auto">
                            <h6 class="mb-0 text-sm">Pessoa Jurídica</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="text-sm font-weight-normal">${value.pessoaNome}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-normal">${value.pessoaEmail}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-normal">${value.pjCNPJ}</span>
                      </td>
                      <td class="align-middle">
                        <a href="/Pessoas/alterar/${value.pjCNPJ}" class="text-secondary font-weight-bold text-xs" data-bs-toggle="tooltip" data-bs-title="Edit user">
                          <i class="fa-solid fa-pencil"></i> Alterar
                        </a>
                      </td>
                      <td class="align-middle">
                        <a type="button" data-codigo="${value.pjCNPJ}" class="btnExcluir text-secondary font-weight-bold text-xs" data-bs-toggle="tooltip">
                          <i class="fa-solid fa-trash"></i> Excluir
                        </a>
                      </td>
                    </tr>`;
        })

        htmlBody += `</tbody>`;

        document.querySelector("#tabelaPessoas > tbody").innerHTML = htmlBody;
    }

    function filtrarTabela() {

        var criterioBusca = document.querySelector('input[name="criterioBusca"]:checked').value;
        var termoBusca = document.getElementById("inputBusca").value;

        //fazer fetch para o backend;

        fetch('/Pessoas/filtrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({criterio: criterioBusca, termo: termoBusca}) 
        })
        .then(r => {
            return r.json();
        })
        .then(r => {
            if(r.lista.length > 0) {
                montarTabela(r.lista);
            }
            else{
                alert("Nenhuma pessoa encontrada para a filtragem");
            }
        })
        .catch( e => {
            console.error(e);
        })
    }

    function excluirProduto() {
        var codigo = this.dataset.codigo;
        if(confirm("Tem certeza que deseja excluir?")) {
            if(codigo != ""){
                var data = {
                    codigo: codigo
                }
                fetch("/Pessoas/excluir", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                .then(r=> {
                    return r.json();
                })
                .then(r=> {
                    if(r.ok){
                        window.location.reload();
                    }
                    else{
                        alert("Erro ao excluir pessoa.");
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            }
        }
    
    }
    
})



