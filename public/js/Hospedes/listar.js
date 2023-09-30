document.addEventListener("DOMContentLoaded", function() {
    
    //carregarUsuarios();

    let btnExcluir = document.querySelectorAll(".btnExcluir");

    for(let i = 0; i< btnExcluir.length; i++){
        btnExcluir[i].addEventListener("click", excluirHospede);
    }
})

function excluirHospede() {

    if(confirm("Tem certeza que deseja excluir esse hóspede?")){
        let id = this.dataset.id;
        var data = {
            usuarioId: id
        }
        fetch("/hospedes/excluir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function(r) {
            return r.json();
        }).then(function(r) {
            if(r.ok){
                window.location.reload();
            }
        }).catch(function(e) {
            console.log(e);
        })

    }
    else{

    }
}

function carregarHospedes() {
    fetch('/hospedes/listar')
    .then(r => {
        return r.json();
    })
    .then(r => {
        console.log(r);
        if(r.lista.length > 0){
            let html = "";
            for(var i = 0; i<r.lista.length; i++) {
                html += `<tr>
                            <td>${r.lista[i].id}</td>
                            <td>${r.lista[i].nome}</td>                           
                            <td>${r.lista[i].email}</td>
                            <td>${r.lista[i].ativo}</td>
                            <td>${r.lista[i].perfilId}</td>
                        </tr>`
            }

            document.getElementById("corpoTabela").innerHTML += html;
        }
    })
    .catch(e => {
        console.log(e);
    })
}