const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:8080'
            : 'http://localhost:8080');

const currentPage = (window.location.pathname.includes('dashboard')) ? 'dashboard'
                  : (window.location.pathname.includes('events'))   ? 'tarea'
                  : (window.location.pathname.includes('profile'))   ? 'perfil'
                  : (window.location.pathname.includes('team'))   ? 'team'
                  : (window.location.pathname.includes('admin'))     ? 'admin'     : '???';

// Referencias HTML;
const menuToggle = document.getElementById('toggleMenu');
const menu = document.getElementById('menuSideNav');

const btnHome = document.getElementById('btnHome');
const btnEvent = document.getElementById('btnEvent');
const btnTeam = document.getElementById('btnTeam');
const btnAdmin = document.getElementById('btnAdmin');
const btnProfile = document.getElementById('btnProfile');
const btnLogOut = document.getElementById('btnLogOut');

const teamName = document.getElementById('teamName') || 'null';

const pageSubTitle = document.getElementById('pageSubTitle');
const pageTitle = document.getElementById('pageTitle');

const bgImage = document.getElementById('bgImage');
const bgColor = document.getElementById('bgColor');

const adminPage = document.getElementById('adminPage');

let user = null;
let team = null;
var socket = null;

btnLogOut.onclick = () => {
    localStorage.removeItem('auth-token');
    location.reload();
}
    
menuToggle.onclick = () => {
    menu.classList.toggle('-translate-x-full')
}

adminPage.addEventListener('click', () => {
    const token = localStorage.getItem('auth-token');
    window.location = url + `/admin?token=${token}`;
})

// btnProfile.addEventListener('click', async() => {
//     const token = localStorage.getItem('auth-token');

//     await fetch(url + '/profile', {
//         headers: { 'auth-token': token }
//     })
// })

const quitSelect = (classes = ['bg-blue-500/13', 'font-semibold']) => {
    btnHome.classList.remove(...classes)
    btnEvent.classList.remove(...classes)
    btnTeam.classList.remove(...classes)
    btnAdmin.classList.remove(...classes)
    btnProfile.classList.remove(...classes)
    btnLogOut.classList.remove(...classes)
}

const select = (element = '', classes = ['bg-blue-500/13', 'font-semibold']) => {
    element.classList.add(...classes)
}

const validarJWT = async() => {
    const token = localStorage.getItem('auth-token') || '';

    if (token.length <= 10) {
        window.location = url;
        throw new Error('El token no es válido');
    }

    const resp = await fetch(url + '/auth', {
        headers: { 'auth-token': token }
    });

    const {user:userDB, token:tokenDB, team:teamDB} = await resp.json();
    localStorage.setItem('auth-token', tokenDB);
    user = userDB;
    team = teamDB;
    document.title = user.name;
    btnTeam.href = `${url}/team?tid=${team.id}&tkn=${tokenDB}`;

    // InnerText //:
    // username.innerText = user.name;
    // (userImg === null ? true : userImg.setAttribute('src', user.img));
    teamName.innerText = team.team_name;

    bgImage.setAttribute('style', `background-image: url(${ team.img })`);
    bgColor.classList.add(`bg-${ team.color }-500`);

    if (user.role != 'ADMIN_ROLE') {
        adminPage.innerHTML = '';
    }

    switch (currentPage) {
        case 'dashboard':
            quitSelect();
            pageSubTitle.innerText = currentPage
            pageTitle.innerText = currentPage
            select(btnHome)
        break;

        case 'tarea':
            quitSelect();
            pageSubTitle.innerText = currentPage
            pageTitle.innerText = currentPage
            select(btnEvent)
        break;

        case 'perfil':
            quitSelect();
            pageSubTitle.innerText = currentPage
            pageTitle.innerText = currentPage
            select(btnProfile)
        break;

        case 'team':
            quitSelect();
            pageSubTitle.innerText = currentPage
            pageTitle.innerText = currentPage
            select(btnTeam)
        break;

        case 'admin':
            quitSelect();
            pageSubTitle.innerText = currentPage
            pageTitle.innerText = currentPage
            select(btnAdmin)
        break;
    
        default:
            quitSelect();
            pageSubTitle.innerText = currentPage
            pageTitle.innerText = currentPage
            select(btnAdmin)
            break;
    }
    
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