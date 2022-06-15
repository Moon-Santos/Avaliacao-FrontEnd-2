const btnTogglePassword = document.querySelector(
  '#togglePassword'
) as HTMLButtonElement;
const passwordLogin = document.querySelector(
  '#input-password'
) as HTMLInputElement;
const usernameLogin = document.getElementById(
  'input-username'
) as HTMLInputElement;
const botaoLogin = document.getElementById('botao-entrar') as HTMLButtonElement;

function togglePasswordLogin() {
  const type =
    passwordLogin.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordLogin.setAttribute('type', type);
}

function entrarPagina() {
  const usernameStorage = localStorage.getItem(usernameLogin.value) as string;
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
