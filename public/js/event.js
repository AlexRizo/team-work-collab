const urlParams = new URLSearchParams(window.location.search);
const eid = urlParams.get('eid');

console.log(eid);

document.addEventListener('DOMContentLoaded', async() => {
    await fetch(`${ window.location.origin }/event/get-event/${ eid }`, {
        headers: { 
            'tkn': localStorage.getItem('auth-token')
        }
    })
    .then(resp => resp.json())
    .then((event) => {
        return console.log(event);
    })
    .catch((err) => console.error(err));
});