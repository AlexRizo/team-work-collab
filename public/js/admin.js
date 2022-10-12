// References HTML;
const form = document.getElementById('form')
const btnOpenModal = document.getElementById('openCreateModal');
const modal = document.getElementById('modalComponent')
const createUser = document.getElementById('createUser');
const btnCloseModal = document.getElementById('closeModal');

const formData = {};

btnCloseModal.addEventListener ('click', () => closeModal());

const openModal = () => {
    showAndHide(modalComponent, ['block'], ['hidden']);
}

const closeModal = () => {
    showAndHide(modalComponent, ['hidden'], ['block']);
}

const showAndHide = (element, classesToAdd, classesToRemove) => {
    element.classList.remove(...classesToRemove);
    element.classList.add(...classesToAdd);
}

createUser.addEventListener('click', (ev) => {
    for (let el of form.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }
    formData.status = 1;

    fetch('http://localhost:8080/manage/user/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('auth-token')}`
        }
    })
    .then(resp => resp.json())
    .then(({msg, errors}) => {
        if (msg) {
            alert(msg);
            return console.error(errors);
        }
        alert('Usuario creado correctamente');
    })
    .catch(err => {
        console.error(err);
    })
})

// form.addEventListener('submit', (ev) => {
//     ev.preventDefault();

//     for (let el of form.elements) {
//         if (el.name.length > 0) {
//             formData[el.name] = el.value
//         }
//     }
    
//     fetch(url + '/auth/login', {
//         method: 'POST',
//         body: JSON.stringify(formData),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(resp => resp.json())
//     .then(({msg, errors, token}) => {
//         if (msg) {
//             modalErrors(msg);
//             return console.log(errors);
//         }
//         modal.innerHTML = '';
//         localStorage.setItem('auth-token', token);
//         window.location = url + '/dashboard';
//     })
//     .catch(err => {
//         console.log(err);
//     });
// });