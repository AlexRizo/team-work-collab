// Referencias HTML;
const btnOpenModal = document.getElementById('openModal');
const modalComponent = document.getElementById('modalComponent');
const bntCreateEvent = document.getElementById('createEvent');
const btnCloseModal = document.getElementById('closeModal');

const eventName = document.getElementById('eventName');
const date = document.getElementById('date');

const btnTeams = document.getElementById('teamPage');

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: 'local',
    locale: 'es',
    initialView: 'dayGridMonth',
    selectable: true,
    headerToolbar: {
        left: 'prev, next, today',
        center: 'title',
        right: 'dayGridMonth, timeGridWeek, listWeek'
    },
    events: () => {
        fetch(window.location.origin + '/event/get', {
            headers: { 'tkn' : localStorage.getItem('auth-token') }
        })
        .then(resp => resp.json())
        .then((events) => {
            return {title: 'Tarea', start: '2022-11-06', end: '2022-11-07'}
        })
        .catch(err => console.warn(err));
    },
    dateClick: (info) => {
        openModal();
        date.value = info.dateStr;
        console.log(info);
    }
    });
    calendar.render();
});



btnCloseModal.addEventListener ('click', () => closeModal());

const openModal = () => {
    showAndHide(modalComponent, ['block'], ['hidden']);
}

const closeModal = () => {
    showAndHide(modalComponent, ['hidden'], ['block']);
}

const showAndHide = (element, classesToAdd, classesToRemove) => {
    element.classList.remove(... classesToRemove);
    element.classList.add(... classesToAdd);
}