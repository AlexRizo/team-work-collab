const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:8080'
            : 'http://localhost:8080');

const currentPage = window.location.hostname.includes('dashboard') ? 'Dashboard'
                  : window.location.hostname.includes('profile')   ? 'Profile'
                  : window.location.hostname.includes('admin')     ? 'Admin'     : '';

// Referencias HTML;
const menuToggle = document.getElementById('toggleMenu');
const menu = document.getElementById('menuSideNav');
const btnLogOut = document.getElementById('btnLogOut');

const username = document.getElementById('username') || 'null';
const teamName = document.getElementById('teamName') || 'null';

const bgImage = document.getElementById('bgImage'); 
const bgColor = document.getElementById('bgColor');

const adminPage = document.getElementById('adminPage');

let user = null;
let team = null;
let socket = null;

btnLogOut.onclick = () => {
    localStorage.removeItem('auth-token');
    location.reload();
}
    
menuToggle.onclick = () => {
    menu.classList.toggle('-translate-x-full')
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

    // InnerText //:
    username.innerText = user.name;
    teamName.innerText = team.team_name;

    bgImage.setAttribute('style', `background-image: url(${team.img})`);
    bgColor.classList.add(`bg-${team.color}-500`);

    if (user.role != 'ADMIN_ROLE') {
        adminPage.innerHTML = '';
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