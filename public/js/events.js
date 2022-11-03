const evTy = document.querySelector('select');
const form = document.querySelector('form');
const btnCreate = document.getElementById('btnCreateEv');
const inputs = document.querySelectorAll('input');
const specialIn = document.getElementById('specialIn');

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

    for (let el of specialIn.children) {
        if (el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }

    console.log(formData);
})