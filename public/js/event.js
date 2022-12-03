const urlParams = new URLSearchParams(window.location.search);
const eid = urlParams.get('eid') || null;

if (!eid) {
    window.location = 'http://localhost:8080/not-found';
}

const title = document.querySelector('#title');
const eventType = document.querySelector('#eventType');
const description = document.querySelector('#description');
const result = document.querySelector('#result');
const $location = document.querySelector('#location');
const start = document.querySelector('#start');
const userInfo = document.querySelector('#userInfo');
const userImage = document.querySelector('#userImage')
const time = document.querySelector('#time');
const comments = document.querySelector('#comments');
const comment = document.querySelector('#comment')
const btnSend = document.querySelector('#send')
const toolbar = document.querySelector('#toolbar')
const inputFile = document.querySelector('#input-files')

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

let $user;
let file;

const $getMonth = (m) => {
    return months[m];
}

const $getDay = (d) => {
    return days[d];
}


const getUserImage = (name) => {
    const array = name.split(" ")
    let total = array.length
    if (total > 2) {
        total = 2;
    }
    let resultado = "";
 
    for (var i = 0; i < total; resultado += array[i][0], i++);

    return resultado;
}

const messages = ({messages, images}) => {
    let com = '';
    let initials = ''
    let $img = '';

    messages.forEach(mess => {
        initials = getUserImage(mess.User.name);

        if (mess.fileIncluded) {            
            images.forEach(img => {
                if (mess.id === img.commentId) {
                    $img = img.url
                }
            });
                    
            com += `
                <div class="flex flex-col w-full items-start mb-5">
                    <div class="flex items-center">
                        <span class="rounded-full min-w-8 min-h-8 text-black flex items-center justify-center" style="background: ${ mess.User.color };">
                            ${ initials }
                        </span>
                        <p class="m-0 ml-2">${ mess.User.name }</p>
                    </div>
                    <p class="mx-2 w-full pr-5 mt-2">
                        ${ mess.comment }
                        <img src="${ $img }" style="max-width: 20%;" />
                    </p>
                    <div class="bg-gray-200 w-full" style="height: 1px;"></div>
                </div>
            `;
        } else {
            com += `
            <div class="flex flex-col w-full items-start mb-5">
                <div class="flex items-center">
                    <span class="rounded-full min-w-8 min-h-8 text-black flex items-center justify-center" style="background: ${ mess.User.color };">
                        ${ initials }
                    </span>
                    <p class="m-0 ml-2">${ mess.User.name }</p>
                </div>
                <p class="mx-2 w-full pr-5 mt-2">
                    ${ mess.comment }
                </p>
                <div class="bg-gray-200 w-full" style="height: 1px;"></div>
            </div>
        `;
        }
    });

    comments.innerHTML = com;
}

// SOCKET -->
socket = io();

const socketConnect = async() => {
    socket.emit('conn', {eid, tkn: localStorage.getItem('auth-token')});
    
    socket.on('file-included', async(cid) => {
        const formData = new FormData();
        formData.append('cid', cid);
        formData.append('uid', localStorage.getItem('auth-token'));
        formData.append('eid', eid)
        formData.append('files', file);
        
        await fetch('http://localhost:8080/manage/uploads/test', {
            method: 'POST',
            body: formData
        })
        .then((res => {
            console.log(res);
        }))
    });

    socket.on('get-messages', messages);


    socket.on('user', (payload) => {
        userImage.setAttribute('style', `background: ${ payload.color }`);
        userImage.innerText = getUserImage(payload.name);
    })
}

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
    await socketConnect();

});

btnSend.addEventListener('click', () => {
    if (!comment.value) {
        return alert('El comentario es obligatorio.');
    }
    
    const formData = {
        comment: comment.value,
        tkn: localStorage.getItem('auth-token'),
        eventId: parseInt(eid)
    }

    socket.emit('send-message', {comm:formData, file, eid});
    comment.value = '';
});

toolbar.addEventListener('click', () => {
    inputFile.click();
});

inputFile.onchange = ({ target }) => {
    file = target.files[0];
    console.log(file);
}