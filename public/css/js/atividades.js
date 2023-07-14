document.getElementById('foi').addEventListener('click', function () {
    alert('Hello World!');
});

const btn = document.getElementById('delete');

btn.addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.getElementsByName('do').value;

    console.log(name);
});
