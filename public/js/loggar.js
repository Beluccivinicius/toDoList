const btnDoLogin = document.getElementById('loggar');
const btnCreate = document.getElementById('createLogin');
const modal = document.getElementById('inputArea');
const btnClose = document.getElementById('close');
const btnNewUser = document.getElementById('createUser');
const img = document.getElementById('imgClose');

//animação botão excluir
function buttonX() {
    img.src = './images/botaoexcluir.svg';
}
function buttonMenos() {
    img.src = './images/botaomenos.svg';
}

btnCreate.addEventListener('click', createLoggin);
function createLoggin() {
    modal.showModal();
}

btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    modal.close();
});

// JEITO PARA PEGAR VALORES DE UM FORMS PARA UM MÉTODO DELETE/PATH

// btnNewUser.addEventListener('click', async function (e) {
//     e.preventDefault();
//     const { nome, email, senha } = document.getElementById('create');

//     const infos = await posted(nome.value, email.value, senha.value);
//     location.reload();
// });
