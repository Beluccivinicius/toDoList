const btnDoLogin = document.getElementById('loggar');
const btnCreate = document.getElementById('createLogin');
const modal = document.getElementById('inputArea');
const btnClose = document.getElementById('close');
const btnNewUser = document.getElementById('createUser');

// const consegui = (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email');
//     const senha = document.getElementById('password');
//     doLogin(email.value, senha.value);
//     console.log(`${email} oiiiiiiii`);
// };

// const doLogin = (email, senha) => {
//     axios
//         .post('http://localhost:8000/login', {
//             email,
//             senha
//         })
//         .then((res) => console.log('oi'))
//         .catch((res) => console.log('oi'));
// };

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
