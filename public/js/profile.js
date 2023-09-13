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
btnTrocar.addEventListener('click', function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', choosePhoto.files[0]);
    changePhoto(formData);
});

//conexão com o controler /perfil/newPhoto
const changePhoto = (formData) => {
    axios
        .post('http://localhost:8000/perfil/newPhoto', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => location.reload())
        .catch((res) => console.log(res));
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
