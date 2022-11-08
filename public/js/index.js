// Referencias HTML;
const btnOpenModal = document.getElementById('openModal');
const modalComponent = document.getElementById('modalComponent');
const bntCreateEvent = document.getElementById('createEvent');
const btnCloseModal = document.getElementById('closeModal');

const eventName = document.getElementById('eventName');
const date = document.getElementById('date');

const btnTeams = document.getElementById('teamPage');

const $events = [];

fetch(`${ window.location.origin }/event/get`, {
    headers: { 'tkn' : localStorage.getItem('auth-token') }
})
.then(resp => resp.json())
.then((events) => {
    events.forEach((ev) => {
        $events.push(ev);
    });
})
.catch(err => console.warn(err));

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    setTimeout(() => {
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
    contentHeight: 800,
    events: $events,
    eventClick: (info) => {
        console.log(info);
    },
    eventMouseEnter: (info) => {
        info.el.style.cursor = 'pointer'
        info.el.style.opacity = '80%'
    },
    eventMouseLeave: (info) => {
        info.el.style.opacity = '100%'
    },
    dateClick: (info) => {
        openModal();
        date.value = info.dateStr;
        console.log(info);
    }
    });
        calendar.render();
    }, 80);
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