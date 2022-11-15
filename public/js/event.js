const urlParams = new URLSearchParams(window.location.search);
const eid = urlParams.get('eid');

console.log(`${ window.location.origin }/event/get-event/${ eid }`);

document.addEventListener('DOMContentLoaded', async() => {
    await fetch(`${ window.location.origin }/event/get-event/${ eid }`, {
        headers: { 
            'tkn': localStorage.getItem('auth-token')
        }
    })
    .then(resp => resp.json())
    .then(({ event, error }) => {
        if (error) {
            // window.location = 'http://localhost:8080/404';
            console.log(error);
            return false;
        }
        console.log(event);
    })
    .catch((error) => {
        console.error(error);
    });
});