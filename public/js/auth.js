const url = (window.location.hostname.includes('localhost')
            ? 'http://localhost:8080'
            : 'http://localhost:8080');

const _token = localStorage.getItem('auth-token') || '';
if (_token && _token.length > 10) {
    window.location = url + '/home'
}

// References HTML;
const form = document.querySelector('form');

const formData = {};

setTimeout(() => {
    const modal = document.getElementById('modal');

    modal.innerHTML = `
    <div
    class="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50 duration-300 overflow-y-auto"
    x-show="showModal1"
    x-transition:enter="transition duration-300"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition duration-300"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
    >
    <div class="relative sm:w-3/4 md:w-1/2 lg:w-1/5 mx-2 sm:mx-auto my-10 opacity-100">
      <div
        class="relative bg-white shadow-lg rounded-md text-gray-900 z-20"
        @click.away="showModal1 = false"
        x-show="showModal1"
        x-transition:enter="transition transform duration-300"
        x-transition:enter-start="scale-0"
        x-transition:enter-end="scale-100"
        x-transition:leave="transition transform duration-300"
        x-transition:leave-start="scale-100"
        x-transition:leave-end="scale-0"
      >
        <header class="flex items-center justify-between p-2">
          <h2 class="font-semibold">Ha ocurrido un error</h2>
          <button class="focus:outline-none p-2" @click="showModal1 = false">
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              ></path>
            </svg>
          </button>
        </header>
        <main class="p-2 text-center">
          <p id="modalMsg">
            Ha ocurrido un error. Inténtalo de nuevo.
          </p>
        </main>
        <footer class="flex justify-center p-2">
          <button
            class="bg-red-600 font-semibold text-white p-2 w-32 rounded-full hover:bg-red-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
            @click="showModal1 = false"
          >
            Cerrar
          </button>
        </footer>
      </div>
    </div>
    `;

    const modalMsg = document.getElementById('modalMsg');
}, 500)

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    for (let el of form.elements) {
        if (el.name.length > 0) {
            formData[el.name] = el.value
        }
    }
    
    fetch(url + '/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(({msg, errors, token}) => {
        if (msg) {
            modalErrors(msg);
            return console.log(errors);
        }
        modal.innerHTML = '';
        localStorage.setItem('auth-token', token);
        window.location = url + '/home';
    })
    .catch(err => {
        console.log(err);
    });
});

const modalErrors = (error = 'Ha ocurrido un error. Inténtalo de nuevo.') => {
    modalMsg.innerText = error;
} 