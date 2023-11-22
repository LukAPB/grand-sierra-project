document.addEventListener("DOMContentLoaded", function() {


    var btnGravar = document.getElementById("btnGravarHospede");


    btnGravar.addEventListener("click", function() {
        gravarHospede();
    })
})

function gravarHospede() {

    limparErros();
    
    var Nome = document.getElementById("Nome");
    var nasc = document.getElementById("nasc");
    var CPF = document.getElementById("CPF");
    var CEP = document.getElementById("CEP");
    var checkin = document.getElementById("checkin")
    var checkout = document.getElementById("checkout");


    var listaErros = [];

    if(Nome.value == "" || Nome.value == undefined || Nome.value == null){
        listaErros.push("Nome");
    }
    
    if(nasc.value == "" || nasc.value == undefined || nasc.value == null){
        listaErros.push("nasc");
    }

    if(CPF.value == "" || CPF.value == undefined || CPF.value == null){
        listaErros.push("CPF");
    }

    if(CEP.value == "" || CEP.value == undefined || CEP.value == null){
        listaErros.push("CEP");
    }

    if(checkin.value == "" || checkin.value == undefined || checkin.value == null){
        listaErros.push("checkin");
    }

    if(checkout.value == "" || checkout.value == undefined || checkout.value == null){
        listaErros.push("checkout");
    }

    if(listaErros.length == 0){

        var data = {
            nome: Nome.value,
            dataNasc: nasc.value,
            hospedeCPF: CPF.value,
            hospedeCEP: CEP.value,
            hospedeCheckin: checkin.value,
            hospedeCheckout: checkout.value
        };

        fetch('archive/Hospedes/criar', { 
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        
        .then(r=> {          
            if(r.ok) {
                Nome.value = "";
                nasc.value = "";
                CPF.value = "";
                CEP.value = "";
                checkin.value = "";
                checkout.value = ""

                document.getElementById("alertaSucesso").innerText = "Hospede gravado com sucesso!";
                document.getElementById("alertaSucesso").style = "display:block";
            }
            else{
                document.getElementById("erros").innerText = "Erro ao gravar hospede!";
                document.getElementById("erros").style = "display:block";
            }
        })
        .catch(e=> {
            console.log(e);
        })

    }
    else{
        mostrarErros(listaErros)
    }
}

function mostrarErros(lista) {
    for(var i = 0; i<lista.length; i++){
        let id = lista[i];

        document.getElementById(id).classList.add("campoErro");

        document.getElementById("erros").innerText = "Preencha corretamente os campos destacados abaixo:";

        document.getElementById("erros").style= "display:block";
    }
}

function limparErros() {
    document.getElementById("Nome").classList.remove("campoErro");
    document.getElementById("nasc").classList.remove("campoErro");
    document.getElementById("CPF").classList.remove("campoErro");
    document.getElementById("CEP").classList.remove("campoErro");
    document.getElementById("checkout").classList.remove("campoErro");
    document.getElementById("checkin").classList.remove("campoErro")
  

    document.getElementById("erros").style = "display:none";
    document.getElementById("alertaSucesso").style = "display:none";
}