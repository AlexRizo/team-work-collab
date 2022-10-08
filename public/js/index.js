const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:8080'
            : 'http://localhost:8080');

let user = null;
let socket = null;

// Referencias HTML;
const btnOpenModal = document.getElementById('openModal');
const modalComponent = document.getElementById('modalComponent');
const modalContainer = document.getElementById('modalContainer');
const bntCreateEvent = document.getElementById('createEvent');
const btnCloseModal = document.getElementById('closeModal');





const validarJWT = async() => {
    const token = localStorage.getItem('auth-token') || '';

    if (token.length <= 10) {
        window.location = url;
        throw new Error('El token no es vĂ¡lido');
    }

    const resp = await fetch(url + '/auth', {
        headers: { 'auth-token': token }
    });

    const {user:userDB, token:tokenDB} = await resp.json();
    localStorage.setItem('auth-token', tokenDB);
    user = userDB;
    document.title = user.name;

    await connectSocket();
}

const connectSocket = async() => {
    socket = io({
        'extraHeaders': {
            'auth-token': localStorage.getItem('auth-token')
        }
    });

    socket.on('connect', () => {
        console.log('Socket Online');
    })
    
    socket.on('disconnect', () => {
        console.log('Socket offline');
    })
}

const main = async() => {
    await validarJWT();
}

main();

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'es',
    initialView: 'dayGridMonth',
    headerToolbar: {
        left: 'prev, next, today',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, listWeek'
    }
    });
    calendar.render();
});

btnOpenModal.addEventListener('click', () => openModal());

btnCloseModal.addEventListener('click', () => closeModal());

const openModal = () => {
    showAndHide(modalComponent, [], [])
    showAndHide(modalContainer, [], [])
}

const closeModal = () => {

}

const showAndHide = (element, classesToAdd, classesToRemove) => {
    element.classList.remove(...classesToRemove);
    element.classList.add(...classesToAdd);
}