"use strict";
const usernameAccount = document.getElementById('input-username');
const passwordAccount = document.getElementById('input-password');
const repeatPassword = document.getElementById('input-repeat-password');
const btnCreateAccount = document.getElementById('btn-create-account');
const btnToggle = document.querySelector('#togglePassword');
function createUser() {
    const usuarioJaExiste = localStorage.getItem(usernameAccount.value);
    console.log(usuarioJaExiste);
    if (!usernameAccount.value ||
        !passwordAccount.value ||
        !repeatPassword.value) {
        alert('Todos campos são de preenchimento obrigatório!');
        return;
    }
    if (passwordAccount.value != repeatPassword.value) {
        alert('Os campos de senha e de repetir senha não estão iguais!');
        return;
    }
    if (usuarioJaExiste) {
        alert('Usuário já cadastrado!');
        return;
    }
    const user = {
        username: usernameAccount.value,
        password: passwordAccount.value,
        messages: [],
    };
    localStorage.setItem(usernameAccount.value, JSON.stringify(user));
    location.href = '../public/index.html';
}
function togglePassword() {
    const type = passwordAccount.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordAccount.setAttribute('type', type);
}
btnCreateAccount.addEventListener('click', createUser);
btnToggle.addEventListener('click', togglePassword);
