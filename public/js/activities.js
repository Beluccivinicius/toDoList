const modal = document.getElementById('menu');
const btnExcluison = document.querySelector('exclusion');
const btnPost = document.getElementById('posted');
const btnMenu = document.getElementById('buttonMenu');
const btnCloseModal = document.getElementById('btnCloseModal');
const linkOut = document.getElementById('linkOut');
const linksMenu = document.getElementsByClassName('linksMenu');

function buttonX(id) {
    const img = document.getElementById(`button${id}`);
    img.src = './images/botaoexcluir.svg';
    console.log(img);
}

function buttonMenos(id) {
    const img = document.getElementById(`button${id}`);
    img.src = './images/botaomenos.svg';
    console.log(img);
}

//Open Modal/Close Modal
btnCloseModal.addEventListener('click', function (e) {
    modal.close();
});
btnMenu.addEventListener('click', function (e) {
    e.preventDefault();
    modal.showModal();
});

//button logout
linkOut.addEventListener('click', function (e) {
    axios
        .post('http://localhost:8000/atividades/logout')
        .then((res) => location.reload())
        .catch((err) => console.log(err));
});

//delete
//toDo axios
function deleted(id) {
    axios
        .delete(`http://localhost:8000/atividades/${id}`, {
            _id: id
        })
        .then((res) => location.reload())
        .catch((error) => {
            if (error.request) {
                console.log('sem resposta servidor');
            } else if (error.response) {
                console.log('Erro de resposta do servidor');
            } else {
                console.log('Erro ao fazer a solicitação');
            }
        });
}
//addEventListener in html
async function handleClick(id) {
    deleted(id);
}

//post
//new toDo
const posted = (oQueFazer, dataCerta, horaCerta) => {
    axios
        .post('http://localhost:8000/atividades', {
            oQueFazer,
            dataCerta,
            horaCerta
        })
        .then((res) => location.reload())
        .catch((err) => console.log(err));
};
btnPost.addEventListener('click', async function (e) {
    e.preventDefault();
    const { oQueFazer, dataCerta, horaCerta } = document.getElementById('post');
    await posted(oQueFazer.value, dataCerta.value, horaCerta.value);
});
