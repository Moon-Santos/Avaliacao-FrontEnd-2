"use strict";
const btnTogglePassword = document.querySelector('#togglePassword');
const passwordLogin = document.querySelector('#input-password');
const usernameLogin = document.getElementById('input-username');
const botaoLogin = document.getElementById('botao-entrar');
function togglePasswordLogin() {
    const type = passwordLogin.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordLogin.setAttribute('type', type);
}
function entrarPagina() {
    const usernameStorage = localStorage.getItem(usernameLogin.value);
    const usernameObjeto = JSON.parse(usernameStorage);
    if (!usernameLogin.value || !passwordLogin.value) {
        alert('Todos campos são de preenchimento obrigatório!');
        return;
    }
    if (!usernameStorage || usernameObjeto.password !== passwordLogin.value) {
        alert('Usuário ou senha não existente!');
        return;
    }
    sessionStorage.setItem('usuarioLogado', usernameStorage);
    window.location.href = '../public/notes.html';
}
btnTogglePassword.addEventListener('click', togglePasswordLogin);
botaoLogin.addEventListener('click', entrarPagina);
