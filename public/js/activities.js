const modal = document.getElementById('menu');
const btnExcluison = document.querySelector('exclusion');
const btnPost = document.getElementById('posted');
const btnMenu = document.getElementById('buttonMenu');
const btnCloseModal = document.getElementById('btnCloseModal');
const linkOut = document.getElementById('linkOut');
const linksMenu = document.getElementsByClassName('linksMenu');

const listToDo = document.getElementById('list-group');

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

//delete toDo axios
function deleted(id) {
    axios
        .delete(`http://localhost:8000/atividades/${id}`, {
            _id: id
        })
        .then((allToDo) => {
            const setDate = ordering(allToDo.data);

            location.reload();

            createComponent(setDate, allToDo.data);
        })
        .catch((error) => {
            console.log(error);
        });
}

//post new toDo
btnPost.addEventListener('click', function (e) {
    e.preventDefault();
    const { oQueFazer, dataCerta, horaCerta } = document.getElementById('post');

    posted(oQueFazer.value, dataCerta.value, horaCerta.value);
});

//create all toDo
const createComponent = (setDate, orderingToDo) => {
    for (let i = 0; i < setDate.length; i++) {
        //dia e quebra de linha
        const divDay = document.createElement('div');
        const span = document.createElement('span');
        span.id = 'day';
        const hr = document.createElement('hr');
        hr.id = 'date';

        const matchDay = orderingToDo.filter((n) => {
            const { Do, hour, date, _id } = n;
            if (date == setDate[i]) {
                return n;
            }
        });

        span.innerText = setDate[i];
        if (i == 0) {
            span.innerText = setDate[i] + ' - Hoje';
        }

        listToDo.appendChild(span);
        listToDo.appendChild(hr);

        if (matchDay.length < 1) {
            const span = document.createElement('span');
            listToDo.appendChild(span);
            span.id = 'day';
            span.innerHTML = 'Não tem afazer para hoje!!';
        }

        matchDay.map((n) => {
            const divCheck = document.createElement('button');
            divCheck.classList.add('boxExcluison');
            const imageExclusion = document.createElement('img');
            imageExclusion.src = './images/botaomenos.svg';

            divCheck.appendChild(imageExclusion);
            divCheck.classList.add = 'exclusion';

            divCheck.value = n._id;

            divCheck.onclick = function () {
                deleted(this.value);
            };

            divCheck.onmouseover = function () {
                imageExclusion.src = './images/botaoexcluir.svg';
            };

            divCheck.onmouseout = function () {
                imageExclusion.src = './images/botaomenos.svg';
            };

            const liBoxToDo = document.createElement('li');
            liBoxToDo.classList.add('boxToDo');

            const divDoHour = document.createElement('div');
            divDoHour.id = 'do-hour';

            const spanDo = document.createElement('span');
            spanDo.innerText = n.Do;

            const br = document.createElement('br');
            const spanHour = document.createElement('span');
            spanHour.id = 'hora';
            spanHour.innerText = n.hour;

            const divDay = document.createElement('div');
            divDay.id = 'day';

            const spanDay = document.createElement('span');
            spanDay.id = 'dia';
            spanDay.innerText = n.date;

            liBoxToDo.appendChild(divCheck);
            listToDo.appendChild(liBoxToDo);
            divDoHour.appendChild(spanDo);
            divDay.appendChild(spanDay);
            divDoHour.appendChild(br);
            divDoHour.appendChild(spanHour);
            liBoxToDo.appendChild(divDoHour);
            liBoxToDo.appendChild(divDay);
        });
    }
};

const ordering = (allToDo) => {
    let set = new Set();

    const date = new Date();
    const currentYear = date.getFullYear();
    const monthToday = date.getMonth() + 1;
    const dayToday = date.getDate();

    const join = dayToday + '/' + monthToday + '/' + currentYear;

    set.add(join);

    for (let i = 0; i < allToDo.length; i++) {
        const { Do, hour, date, _id } = allToDo[i];
        set.add(date);
    }

    const arrayDate = Array.from(set);

    const indexSemData = arrayDate.indexOf('sem data');
    const noData = arrayDate.splice(indexSemData, 1);
    arrayDate.push(noData);

    return arrayDate;
};

async function posted(oQueFazer, dataCerta, horaCerta) {
    axios
        .post('http://localhost:8000/atividades', {
            oQueFazer,
            dataCerta,
            horaCerta
        })
        .then((res) => {
            location.reload();
        })
        .catch((err) => console.log(err));
}

async function getAll() {
    try {
        const response = await axios.get('http://localhost:8000/atividades/toDo');

        const allToDo = response.data;

        const arrayDate = ordering(allToDo);

        const creatingComponente = createComponent(arrayDate, allToDo);
    } catch (err) {
        console.log(err);
    }
}
