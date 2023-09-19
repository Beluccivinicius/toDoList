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

btnNewUser.addEventListener('click', function (e) {
    e.preventDefault();
    const { email, senha } = document.getElementById('create');
    console.log(email);
    posted(email.value, senha.value);
});

const posted = (email, senha) => {
    axios
        .post(`http://localhost:8000/login/newUser`, {
            email,
            senha
        })
        .then((res) => console.log(res))
        .catch((res) => console.log(res));
};
