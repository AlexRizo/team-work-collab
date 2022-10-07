// Referencias HTML;
const menuToggle = document.getElementById('toggleMenu');
const menu = document.getElementById('menuSideNav');
const btnLogOut = document.getElementById('btnLogOut');

btnLogOut.onclick = () => {
    localStorage.removeItem('auth-token');
    location.reload();
}

menuToggle.onclick = () => {
    menu.classList.toggle('-translate-x-full')
}