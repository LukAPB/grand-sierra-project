var dados    = [
    {id: 1, reserva:'01/08/2023', checkout: '15/08/2023', pessoas: 4}
];

function adicionarItem(){
    let campoReserva = document.getElementById("reserva");
    let reserva = document.getElementById("reserva").valueAsDate;
    let checkout = document.getElementById("checkout").valueAsDate;

    let adultos = document.getElementById("adultos");
    let criancas = document.getElementById("criancas");
    let tipo = document.getElementById("tipoAcomodacao-select");
    let quartos = document.getElementById("quartos");
    let pessoas = parseInt(adultos.value) + parseInt(criancas.value);
    let novoItem = {
        id: new Date().getTime(), //para gerar um código automaticamente
        reserva: reserva.toLocaleDateString(),
        checkout: checkout.toLocaleDateString(),
        pessoas: pessoas
    };

    //adicionamos o objeto na lista
    dados.push(novoItem);
    montarTabela();

    reserva.value = '';
    checkout.value = '';
    adultos.value = '';
    criancas.value = '';
    tipo.value = '';
    quartos.value = '';
    //coloca o foco do cursor no elemento <input>
    campoReserva.focus();
};

function montarTabela(){
    let tbody = document.getElementById("tb-body");
    let html = '';

    for (let item of dados){
        html += `<tr">
                    <th scope="row"><input type="checkbox" data-id="${item.id}"></td>
                    <td>${item.reserva}</td>
                    <td>${item.checkout}</td>
                    <td>${item.pessoas}</td>
                    <td>
                        <a class="btnExcluir" onclick="excluirItem(${item.id})">&#9746;</a>
                    </td>
                </tr>`
    }

    // Associei o html com as linhas da tabela à seção tbody da tabela
    tbody.innerHTML = html;
};

function excluirItem(idDel){
    var listaAuxiliar = [];

    for (let i = 0; i < dados.length; i++){
        if (dados[i].id != idDel)
            listaAuxiliar.push(dados[i]);
    };

    //substituir a lista global pela lista auxiliar
    dados = listaAuxiliar;
    montarTabela();

};

function excluirSelecionados(){
    //pegamos todos os checkbox
    let listaCheckbox = document.querySelectorAll('[data-id]');

    if (listaCheckbox.length > 0){
        for (let ck of listaCheckbox){
            if (ck.checked == true){
                excluirItem(ck.dataset.id);
            };
        };
    }
    else{
        alert('Não há itens para serem excluídos!');
    }
    
}

function selecionaTodos(){
    //pegamos todos os checkbox
    let listaCheckbox = document.querySelectorAll('[data-id]');
    //pegamos o checkbox do cabeçalho da tabela
    let cbPai = document.querySelector('#ckTodos');

    for (let ck of listaCheckbox){
        ck.checked = cbPai.checked;
    }

}


function mascaraEmail() {
    var email = document.getElementById('email').value;
    var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    var erro = document.getElementById('erro');

    if (!emailRegex.test(email)) {
        erro.innerHTML = "Email inválido"
        erro.style.color = "red";
        if (document.getElementById('form-login')) {
            var form = document.querySelector('#form-login');
            form.classList.add("invalido");
        } else if (document.getElementById('form-index')) {
            var form = document.querySelector('#form-index');
            form.classList.add("invalido");
        }
    } else {
        if (document.getElementById('form-login')) {
            var form = document.querySelector('#form-login');
            form.classList.remove("invalido");
        } else if (document.getElementById('form-index')) {
            var form = document.querySelector('#form-index');
            form.classList.remove("invalido");
        }
        erro.innerHTML = "";
    }
}

function calcularIdade(data) {
    var hoje = new Date();
    var nasc = new Date(data);
    var idade = hoje.getFullYear() - nasc.getFullYear();
    var mes = hoje.getMonth() - nasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
        idade--;
    }
    return idade;
}

function validarFormulario(event) {
    event.preventDefault(); 

    var form = document.getElementById('form');
    var nome = document.getElementById('Nome').value;
    var cpf = document.getElementById('CPF').value;
    var nascimento = document.getElementById('nasc').value;
    var senha = document.getElementById('senha').value;
    var cep = document.getElementById('CEP').value;
    var erros = [];
    var nomeRegex = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;

    if (cep.length != 9)
    {
        erros.push("CEP inválido");
        form.classList.add("invalido");
    }
    else
        form.classList.remove("invalido");

    if (!nomeRegex.test(nome)) {
        erros.push("Nome inválido");
        form.classList.add("invalido");
    } else {
        form.classList.remove("invalido");
    }

    if (cpf != "") {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999") {
            erros.push("CPF inválido");
            form.classList.add("invalido");
        } else {
            var add = 0;
            for (i = 0; i < 9; i++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
            var rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9))) {
                erros.push("CPF inválido");
                form.classList.add("invalido");
            } else {
                add = 0;
                for (i = 0; i < 10; i++)
                    add += parseInt(cpf.charAt(i)) * (11 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                    rev = 0;
                if (rev != parseInt(cpf.charAt(10))) {
                    erros.push("CPF inválido");
                    form.classList.add("invalido");
                } else {
                    form.classList.remove("invalido");
                }
            }
        }
    }

    if (senha.length < 7) {
        erros.push("Senha inválida");
        form.classList.add("invalido");
    } else {
        form.classList.remove("invalido");
    }

    if (nascimento === "" || calcularIdade(nascimento) < 18) {
        erros.push("Usuário menor de idade ou data de nascimento inválida");
        form.classList.add("invalido");
    } else {
        form.classList.remove("invalido");
    }

    var erro = document.getElementById('erro');
    if (erros.length > 0) {
        erro.innerHTML = erros.join("<br>");
        erro.style.color = "red";
    } else {
        erro.innerHTML = "";
    }
}

function validarFormularioReserva(event) {
    event.preventDefault(); 

    var form = document.getElementById('form-reserva');
    var reserva = document.getElementById('reserva').value;
    var checkout = document.getElementById('checkout').value;
    var adultos = document.getElementById('adultos').value;
    var criancas = document.getElementById('criancas').value;
    var tipoAcomodacao = document.getElementById('tipoAcomodacao-select').value;
    var quartos = document.getElementById('quartos').value;
    var erros = [];


    if (reserva === "" || checkout === "") {
        erros.push("Por favor, preencha as datas de check-in e check-out");
        form.classList.add("invalido");
    } else {
        var dataReserva = new Date(reserva + 'T00:00:00');
        var dataCheckout = new Date(checkout + 'T00:00:00');
        var dataAtual = new Date();
        
        dataAtual.setHours(0, 0, 0, 0);

        if (dataReserva.getTime() < dataAtual.getTime()) {
            erros.push("A data de check-in deve ser igual ou posterior ao dia atual");
            form.classList.add("invalido");
        } else {
            form.classList.remove("invalido");

            if (dataReserva >= dataCheckout) {
                erros.push("A data de check-in deve ser anterior à data de check-out");
                form.classList.add("invalido");
            } else {
                form.classList.remove("invalido");

                if (adultos != "" && tipoAcomodacao != "" && quartos != "" && criancas != "")
                    adicionarItem();
            }
        }

    }

    if (adultos === "") {
        erros.push("Selecione o número de adultos");
        form.classList.add("invalido");
    }

    if (tipoAcomodacao === "") {
        erros.push("Selecione o tipo de acomodação");
        form.classList.add("invalido");
    }

    if (quartos === "") {
        erros.push("Selecione o número de quartos");
        form.classList.add("invalido");
    }

    if (criancas === "") {
        erros.push("Informe o número de crianças");
        form.classList.add("invalido");
    }

    var erro = document.getElementById('erro');
    if (erros.length > 0) {
        erro.innerHTML = erros.join("<br>");
        erro.style.color = "red";
    } else {
        erro.innerHTML = "";
        alert("Reserva efetuada com sucesso!");
        form.reset();
    }
}


function mascaraCPF(cpf) {
    var cpf = event.target.value;
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    event.target.value = cpf;
}

function mascaraTel(tel) {
    var tel = event.target.value;
    tel = tel.replace(/\D/g, "")
    tel = tel.replace(/^(\d)/, "($1")
    tel = tel.replace(/(.{3})(\d)/, "$1)$2")
    if (tel.length == 9) {
        tel = tel.replace(/(.{1})$/, "-$1")
    } else if (tel.length == 10) {
        tel = tel.replace(/(.{2})$/, "-$1")
    } else if (tel.length == 11) {
        tel = tel.replace(/(.{3})$/, "-$1")
    } else if (tel.length == 12) {
        tel = tel.replace(/(.{4})$/, "-$1")
    } else if (tel.length > 12) {
        tel = tel.replace(/(.{4})$/, "-$1")
    }
    event.target.value = tel;
}

function mascaraCEP(cep) {
    var cep = event.target.value;
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
    cep = cep.replace(/.(\d{3})(\d)/, "$1-$2")
    event.target.value = cep;
}


function validar()
{
    validarFormularioReserva(event);
}

//vamos associar evento a elementos ainda não renderizados na seção <body>, os elementos ainda não estão complemetamente criados na árvore DOM
//como o script está no head, a árvore DOM ainda não está carregada. Ele irá aguardar o DOM carregar para chamar a função montar tabela
document.addEventListener('DOMContentLoaded', function(){
    montarTabela();
    
    var btnAdd = document.querySelector("#btn-add");
    btnAdd.addEventListener('click', validar, false);

    var btnExcluir = document.querySelector("#btnExcluirSelecionados");
    btnExcluir.addEventListener('click', excluirSelecionados, false);

    var cb = document.querySelector('#ckTodos');
    cb.addEventListener('click', selecionaTodos, false);
}, false
);