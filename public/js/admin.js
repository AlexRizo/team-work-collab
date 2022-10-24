// References HTML;
const form = document.getElementById('form')
const btnOpenModal = document.getElementById('openCreateModal');
const modal = document.getElementById('modalComponent')
const createUser = document.getElementById('createUser');
const btnCloseModal = document.getElementById('closeModal');
const usersTable = document.getElementById('usersTable');


const formData = {};
var socket = null

socket = io({
    'extraHeaders': {
        'auth-token': localStorage.getItem('auth-token')
    }
});

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

createUser.addEventListener('click', () => {
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
            console.log(msg);
            return console.error(errors);
        }
        console.log('Usuario creado correctamente');
        socket.emit('create-user');
        closeModal();
    })
    .catch(err => {
        console.error(err);
    });
});

socket.on('get-users', ({users}) => {
    let tdUser = '';
    users.forEach(({name, email, status, role, Team, img}) => {
            tdUser += `
            <tr>
            <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
              <div class="flex px-2 py-1">
                <div>
                  <img src="${img}" class="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-9 w-9 rounded-xl" alt="user1" />
                </div>
                <div class="flex flex-col justify-center">
                  <h6 class="mb-0 text-sm leading-normal dark:text-white">${ name }</h6>
                  <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">${ role }</p>
                </div>
              </div>
            </td>
            <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
              <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80"></p>
              <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">${ email }</p>
            </td>
            <td class="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
              <span class="bg-gradient-to-tl from-indigo-500 to-violet-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">${ Team.team_name }</span>
            </td>
            <td class="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
              <span class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">${ (status === true ? 'Activo' : 'Inactivo') }</span>
            </td>
            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
              <a href="javascript:;" class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400"> Edit </a>
            </td>
          </tr>
            `;
    });
    usersTable.innerHTML = tdUser;
});
