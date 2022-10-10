const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:8080'
            : 'http://localhost:8080');

// Referencias HTML;
const menuToggle = document.getElementById('toggleMenu');
const menu = document.getElementById('menuSideNav');
const btnLogOut = document.getElementById('btnLogOut');

const username = document.getElementById('username') || 'null';
const teamName = document.getElementById('teamName') || 'null';

const bgImage = document.getElementById('bgImage'); 
const bgColor = document.getElementById('bgColor');

btnLogOut.onclick = () => {
    localStorage.removeItem('auth-token');
    location.reload();
}

menuToggle.onclick = () => {
    menu.classList.toggle('-translate-x-full')
}

let user = null;
let team = null;
let socket = null;

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

    bgImage.classList.add("bg-[url('https://scontent.fgdl3-1.fna.fbcdn.net/v/t1.18169-9/12715374_10153546846853577_5174180407451521430_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=19026a&_nc_ohc=eDRPRBiT2B0AX9MJjMA&_nc_ht=scontent.fgdl3-1.fna&oh=00_AT-GsxBea6aUr-pqs0G7vshgbf0FqBT9udJfcc8rhd1scQ&oe=636A7842')]");
    bgColor.classList.add(`bg-${team.color}-500`);
    
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