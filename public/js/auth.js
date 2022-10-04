const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:8080'
            : 'http://localhost:8080');

const _token = localStorage.getItem('token') || '';
if (_token && _token.length > 10) {
    window.location = url + '/dashboard'
}

// References HTML;
const form = document.querySelector('form');

const formData = {};

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    for (let el of form.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value
        }
    }
    
    fetch(url + '/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(({msg, errors, token}) => {
        if (msg) {
            alert(msg);
            return console.log(errors);
        }
        localStorage.setItem('token', token);
        window.location = url + '/dashboard';
    })
    .catch(err => {
        console.log(err);
    });
});