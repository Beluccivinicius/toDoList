const btnClosePage = document.getElementById('btnClose');
const btnPhoto = document.getElementById('btnPhotoProfile');
const spanChange = document.getElementById('changePhoto');
const modal = document.getElementById('uploadPhoto');
const btnCloseModal = document.getElementById('close');
const choosePhoto = document.getElementById('choosePhoto');
const img2 = document.getElementById('imgChangePhoto');
const img = document.getElementById('imgProfile');
const btnTrocar = document.getElementById('trocar');
const spanNoPhoto = document.getElementById('spanNoPhoto');
const span = document.getElementById('escolherArquivo');
const textField1 = document.getElementById('nome');
const textField2 = document.getElementById('email');
const textField3 = document.getElementById('codigo');
const btnInputFields = document.getElementById('posted');

//Fade imagem perfil
btnPhoto.addEventListener('mouseenter', function () {
    btnPhoto.classList.toggle('fade');
    spanChange.innerText = 'Trocar Foto';
});
btnPhoto.addEventListener('mouseout', function () {
    btnPhoto.classList.toggle('fade');
    spanChange.innerText = '';
});

//abrir modal de troca de imagem
btnPhoto.addEventListener('click', function () {
    modal.showModal();
});
//fechar modal de troca de imagem
btnCloseModal.addEventListener('click', function (e) {
    e.preventDefault();
    modal.close();
});

// visualizar imagem do perfil
choosePhoto.onchange = function () {
    img2.src = URL.createObjectURL(choosePhoto.files[0]);
};

//enviar imagem como formData
btnTrocar.addEventListener('click', async function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', choosePhoto.files[0]);
    const changed = await changePhoto(formData);
    location.reload();
});

//conexão com o controler /perfil/newPhoto
const changePhoto = (formData) => {
    axios
        .post('http://localhost:8000/perfil/newPhoto', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};

//animações botão fechar modal
function buttonX() {
    const img = document.getElementById(`close`);
    img.src = './images/botaoexcluir.svg';
    console.log(img);
}
function buttonMenos() {
    const img = document.getElementById(`close`);
    img.src = './images/botaomenos.svg';
    console.log(img);
}
// textField.disabled = true;
// Bloquear forms
function blockForms(nome, codigo) {
    textField2.disabled = true;

    if (textField1.name != 'naoTem') {
        textField1.disabled = true;
        textField1.value = nome;
    }
    if (textField3.name != 'naoTem') {
        textField3.disabled = true;
        textField3.value = codigo;
    }
}

function unlockForms(input) {
    input.disabled = false;
    input.select();
    console.log(input);
}

//atualizar as informações do site
btnInputFields.addEventListener('click', async function posted(e) {
    e.preventDefault();
    const nome = textField1.value;
    const email = textField2.value;
    const codigo = textField3.value;
    const put = await patched(nome, email, codigo);
    location.reload();
});

function patched(nome, email, codigo) {
    const data = {
        nome,
        email,
        codigo
    };
    axios
        .patch('http://localhost:8000/perfil/informacao', data)
        .then((res) => console.log(res))
        .catch((res) => console.log(res));
}
