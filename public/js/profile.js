const profile = (async() => {
    //References HTML;
    const username = document.getElementById('username') || 'null';
    const userImg = document.getElementById('userImg') || null;
    const inName = document.getElementById('name');
    const inEmail = document.getElementById('email');

    const btnUpdate = document.getElementById('btnUpdate');

    const formIn = document.querySelectorAll('.input');

    let $user;

    btnUpdate.addEventListener('click', () => {
        const formData = {};

        formIn.forEach(el => {
            formData[el.name] = el.value;
        });

        console.log({formData});
        
        fetch(url + '/manage/user/' + $user.id, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token') || '',
                'id': $user.id
            }
        })
        .then(resp => resp.json())
        .then(({msg, errors}) => {
            if (msg) {
                return console.log({msg, errors});
            }
            location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    });

    const CurrentUser = async() => {
        const token = localStorage.getItem('auth-token') || '';

        if (token.length <= 10) {
            window.location = url;
            throw new Error('El token no es válido');
        }

        const resp = await fetch(window.location + '/user', {
            headers: { 'auth-token': token }
        });

        const { userDB } = await resp.json();

        $user = userDB;

        username.innerText = $user.name;
        inName.setAttribute('value', $user.name);
        inEmail.setAttribute('value', $user.email);
        userImg.setAttribute('src', $user.img);
    }

    await CurrentUser();
})();