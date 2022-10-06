const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:8080'
            : 'http://localhost:8080');

let user = null;
let socket = null;

// Referencias HTML;


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