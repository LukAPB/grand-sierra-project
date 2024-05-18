let listaProdutos = [];
let pessoaId = 0;
let valorTotalDaNota = 0;

document.addEventListener("DOMContentLoaded", function () {
    var botaoFinalizar = document.getElementById("botaoFinalizar");
    var Pessoas_pessoa_id = document.getElementById("Pessoas_pessoa_id");
    var res_dataEntrada = document.getElementById("res_dataEntrada");
    var res_dataSaida = document.getElementById("res_dataSaida")
    var res_status = document.getElementById("res_status");
    var res_num = document.getElementById("res_num");
    var tac_id = document.getElementById("tac_id");

    
    botaoFinalizar.addEventListener("click",gravarReserva)

    res_dataEntrada.addEventListener("change", function () {
        var selectedDate = new Date(this.value);
        var currentDate = new Date();
        if (selectedDate > currentDate || isNaN(selectedDate)) {
            alert("Data de entrada inválida");
            this.value = "";
        }
    });

    res_dataSaida.addEventListener("change", function () {
        var selectedDate = new Date(this.value);
        var currentDate = new Date();
        if (selectedDate > currentDate || isNaN(selectedDate) || selectedDate <= res_dataEntrada) {
            alert("Data de saída inválida");
            this.value = "";
        }
    });

    window.onload = function () {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    };

    let html = `<tr id="R${res_num}" >
    <td>
      <div class="d-flex px-2">
        <div class="avatar avatar-sm rounded-circle bg-gray-100 me-2 my-2">
        <i class="fa-solid fa-barcode" style="color: #000000;"></i>
        </div>
        <div class="my-auto">
          <h6 class="mb-0 text-sm">${Pessoas_pessoa_id}</h6>
        </div>
      </div>
    </td>
    <td>
    <span class="text-sm font-weight-normal">${res_dataEntrada}</span>
    </td>
    <td>
      <span class="text-sm font-weight-normal">${res_dataSaida}</span>
    </td>
    <td>
      <span class="text-sm font-weight-normal">${res_status}</span>
    </td>
    
    <td class="align-middle">
      <a type="button" onclick="excluirItemNotaLocal('${res_num}')" class="text-secondary font-weight-bold text-xs" data-bs-toggle="tooltip">
          <i class="fa-solid fa-trash"></i> Excluir
      </a>
    </td>
  </tr>
  `;

  document.getElementById("corpoTabela").innerHTML += html;

    function gravarReserva() {
        console.log("gravarReserva");
        console.log(Pessoas_pessoa_id.value);
        console.log(res_dataEntrada.value);
        console.log(res_dataSaida.value);
        console.log(res_status.value);
        console.log(res_num.value);
        console.log(tac_id.value);
       
        fetch('/Reserva/gravarReserva', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                Pessoas_pessoa_id: Pessoas_pessoa_id.value,
                dataEntrada: res_dataEntrada.value,
                dataSaida: res_dataSaida.value,
                status: res_status.value,
                num: res_num.value,
                tac_id: tac_id.value
             })
        })
            .then(r => {
                return r.json();
            })
            .then(r => {
                if (r.ok) {
                    alert(r.msg);
                }
                else {
                    alert(r.msg);
                }
            })
    }


})
