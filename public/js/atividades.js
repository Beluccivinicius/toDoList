const btn = document.getElementsByClassName('exclusion');
const btnPost = document.getElementById('posted');

const deleted = (id) => {
    axios
        .delete(`http://localhost:8000/atividades/${id}`, {
            _id: id
        })
        .then((res) => console.log(res))
        .catch((error) => {
            if (error.request) {
                console.log('sem resposta servidor');
            } else if (error.response) {
                console.log('Erro de resposta do servidor');
            } else {
                console.log('Erro ao fazer a solicitação');
            }
        });
};

function handleClick(event) {
    const id = event.target.value;
    deleted(id);
}

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', handleClick);
}

const posted = (oQueFazer, dataCerta, horaCerta) => {
    axios
        .post('http://localhost:8000/atividades', {
            oQueFazer,
            dataCerta,
            horaCerta
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};

btnPost.addEventListener('click', function (e) {
    e.preventDefault();
    const form = document.getElementById('post');
    const formData = new FormData(form);
    const formDataValues = [...formData];
    const [oQueFazer, horaCerta, dataCerta] = formDataValues;
    posted(oQueFazer[1], dataCerta[1], horaCerta[1]);
    location.reload();
});
