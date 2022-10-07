const btnLogOut = document.getElementById('btnLogOut');

btnLogOut.onclick = () => {
    localStorage.removeItem('auth-token');
    location.reload();
}