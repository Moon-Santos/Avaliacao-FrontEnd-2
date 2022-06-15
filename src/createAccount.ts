const usernameAccount = document.getElementById(
  'input-username'
) as HTMLInputElement;
const passwordAccount = document.getElementById(
  'input-password'
) as HTMLInputElement;
const repeatPassword = document.getElementById(
  'input-repeat-password'
) as HTMLInputElement;
const btnCreateAccount = document.getElementById(
  'btn-create-account'
) as HTMLButtonElement;
const btnToggle = document.querySelector(
  '#togglePassword'
) as HTMLButtonElement;

function createUser() {
  const usuarioJaExiste = localStorage.getItem(usernameAccount.value);
  console.log(usuarioJaExiste);

  if (
    !usernameAccount.value ||
    !passwordAccount.value ||
    !repeatPassword.value
  ) {
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
  const type =
    passwordAccount.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordAccount.setAttribute('type', type);
}

btnCreateAccount.addEventListener('click', createUser);
btnToggle.addEventListener('click', togglePassword);
