const evTy = document.querySelector('select');
const form = document.querySelector('form');
const btnCreate = document.getElementById('btnCreateEv');
const inputs = document.querySelectorAll('#input');
const specialIn = document.getElementById('specialIn');
const color = document.getElementById('colorSelected');

const formData = new FormData();

evTy.addEventListener('change', (ev) => {
    const selectedIndex = ev.target.selectedIndex || 0; 
    
    if (selectedIndex != 0) {
        for (let inp of specialIn.children) {
            inp.removeAttribute('disabled');
        }
    } else {
        for (let inp of specialIn.children) {
            inp.setAttribute('disabled', '');
            inp.value = '';
        }
    }
});

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    for (let inp of inputs) {
        if (inp.name.length > 0) {
            formData[inp.name] = inp.value;
        }
    }

    formData.color = color.value;

    console.log(formData);

    fetch(url + '/event/create', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            'tkn': localStorage.getItem('auth-token')
        }
    })
    .then(resp => resp.json())
    .then(({error, msg}) => {
        if (error) {
            console.log(error);
        }
        if (msg) {
            console.log(msg);
        }
    })
    .catch(err => console.warn(err));
})