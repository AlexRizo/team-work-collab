// Referencias HTML;
const btnOpenModal = document.getElementById('openModal');
const modalComponent = document.getElementById('modalComponent');
const bntCreateEvent = document.getElementById('createEvent');
const btnCloseModal = document.getElementById('closeModal');

const eventName = document.getElementById('eventName');
const start = document.getElementById('start');

const btnTeams = document.getElementById('teamPage');

const $events = [];

fetch(`${ window.location.origin }/event/get`, {
    headers: { 'tkn' : localStorage.getItem('auth-token') }
})
.then(resp => resp.json())
.then((events) => {
    events.forEach((ev) => {
        $events.push({
            id: ev.id,
            title: ev.title,
            start: ev.start,
            end: ev.end,
            color: ev.color,
            url: `${ window.location.origin }/event/${ ev.title.replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "") }?eid=${ ev.id }`
        });
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
                console.log(info.event.id);
                console.log(info.event.description);
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
                start.value = info.dateStr;
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

