const urlParams = new URLSearchParams(window.location.search);
const eid = urlParams.get('eid');

const title = document.querySelector('#title');
const eventType = document.querySelector('#eventType');
const description = document.querySelector('#description');
const result = document.querySelector('#result');
const $location = document.querySelector('#location');
const start = document.querySelector('#start');
const userInfo = document.querySelector('#userInfo');
const time = document.querySelector('#time');
const comments = document.querySelector('#comments');
const comment = document.querySelector('#comment')
const btnSend = document.querySelector('#send')

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

let $user;

const $getMonth = (m) => {
    return months[m];
}

const $getDay = (d) => {
    return days[d];
}

// SOCKET -->
socket = io({
    'extraHeaders': {
        'eid': eid
    }
});

const $getTime = (time) => {
    let [ hours, minutes ] = time.split(':');
    let ampm = '';
    
    if (hours >= 12) {
        hours = hours - 12;
        ampm = 'pm';
    }else{
        ampm = 'am';
    };

    if (hours == 0) {
        hours = 12;
    };

    return { hours, minutes, ampm };
}

document.addEventListener('DOMContentLoaded', async() => {
    const event = await fetch(`${ window.location.origin }/event/get-event/${ eid }`, {
        headers: { 
            'tkn': localStorage.getItem('auth-token')
        }
    })
    .then(resp => resp.json())
    .then(({ event, error }) => {
        if (error) {
            window.location = 'http://localhost:8080/not-found';
            console.error(error);
            return false;
        }
        return event;
    })
    .catch((error) => {
        console.error(error);
    });

    $user = event.User
    
    const date = new Date(`${ event.start }T00:00:00`);
    const newDate = `${ $getDay(date.getDay()) } ${ date.getDate() } de ${ $getMonth(date.getMonth()) } del ${ date.getFullYear() }`;
    const { hours, minutes, ampm } = $getTime(event.time);

    title.innerText = event.title;
    eventType.innerText = event.EventType.type;
    description.innerText = event.description;
    result.innerText = event.result;
    $location.innerText = (!event.location ? 'N/A' : event.location);
    start.innerText = newDate;
    time.innerText = (!event.time ? 'Libre' : `${ hours }:${ minutes } ${ ampm }`);
    userInfo.innerText = `${ event.User.name } | ${ event.Team.team_name }`;

    socket.emit('eid', eid);

    socket.on('get-messages', (messages) => {
        console.log(messages);
    });
});

btnSend.addEventListener('click', () => {
    const formData = {
        comment: comment.value,
        tkn: localStorage.getItem('auth-token'),
        eventId: parseInt(eid)
    }

    socket.emit('send-message', {comm:formData, eid});
    comment.value = '';
});

const com = `
<div class="flex flex-row m-1">
    <span class="rounded-full w-8 h-8 bg-green-DEFAULT-500 text-black flex items-center justify-center">
        AR
    </span>
    <div class="mx-2 w-160 bg-gray-200 rounded p-2">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis laudantium vitae accusamus exercitationem aspernatur sapiente molestias animi magnam nulla. A fuga ipsum cum maiores eos voluptatibus non quas ullam nostrum?</p>
    </div>
</div>
`;