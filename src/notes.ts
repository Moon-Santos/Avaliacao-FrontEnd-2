const inputDescricao = document.getElementById(
  'input_descricao'
) as HTMLInputElement;

const inputDetalhamento = document.getElementById(
  'input_detalhamento'
) as HTMLInputElement;

const inputSalvar = document.getElementById('input_salvar') as HTMLElement;

const formularioRecados = document.getElementById(
  'formulario_recados'
) as HTMLFormElement;

const table = document.getElementById('table') as HTMLTableElement;

const logOut = document.getElementById('logOut') as HTMLButtonElement;

const usernameStorageSession = sessionStorage.getItem(
  'usuarioLogado'
) as string;

const usernameObjetoSession = JSON.parse(usernameStorageSession) as any;

document.addEventListener('DOMContentLoaded', initialize);
formularioRecados.addEventListener('submit', salvarRecados);
logOut.addEventListener('click', cleanSession);

function initialize() {
  {
    if (!usernameObjetoSession) {
      alert('Usuário não Logado!');
      window.location.href = '../public/index.html';
      return;
    }
    carregarHTMLTabela();
  }
}

function getItemLocalStorage() {
  const userInfo: any = JSON.parse(
    localStorage.getItem(usernameObjetoSession.username) as any
  );

  return userInfo;
}

function setItemLocalStorage(e: Object) {
  localStorage.setItem(usernameObjetoSession.username, JSON.stringify(e));
}

function salvarRecados(event: any) {
  event.preventDefault();
  if (!inputDescricao.value || !inputDetalhamento.value) {
    alert('Todos os campos são de preenchimento obrigatório!');
    return;
  }

  const mensagem = {
    id: definirID(),
    descricao: inputDescricao.value,
    detalhamento: inputDetalhamento.value,
  };
  const userInfo = getItemLocalStorage();

  userInfo.messages.push(mensagem);
  setItemLocalStorage(userInfo);
  inputDescricao.value = '';
  inputDetalhamento.value = '';
  carregarHTMLTabela();
}

function carregarHTMLTabela() {
  table.innerHTML = `
          <tr id='table_h'class='text-center text-white'>
              <th>ID</th>
              <th>DESCRIÇÃO</th>
              <th>DETALHAMENTO</th>
              <th>AÇÃO</th>
          </tr>`;

  let mensagens = getItemLocalStorage().messages;
  let index = 0;
  for (const mensagem of mensagens) {
    index++;
    table.innerHTML += `
              <tr id='table-success' class='text-center table-success'>
                  <td class=''>${index}</td>
                  <td class=''>${mensagem.descricao}</td>
                  <td class=''>${mensagem.detalhamento}</td>
                  <td class=''><button type="button" id='btn-editar' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#editModal'">EDITAR</button>
                  <button id="btn-apagar"class='btn btn-secondary' type="button" onclick="apagarMensagem(${mensagem.id})">APAGAR</button>
                  </td>
              </tr>`;
  }
}

function apagarMensagem(id: number) {
  const user = getItemLocalStorage();

  const mensagemIndex = user.messages.findIndex((mensagem: any) => {
    return mensagem.id == id;
  });

  if (mensagemIndex < 0) return;
  if (confirm('Tem certeza que deseja deletar? ')) {
    user.messages.splice(mensagemIndex, 1);
    setItemLocalStorage(user);
    carregarHTMLTabela();
  }
}

const myModal = document.getElementById('editModal') as HTMLDivElement;
const myInput = document.getElementById('btn-editar') as HTMLDivElement;

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus();
});

// function editarMensagem(id: number) {
//   if (!descricao || !detalhamento) {
//     alert('Você precisa digitar os valores correspondentes!');
//     return;
//   }
//   if (descricao.length > 40 || detalhamento.length > 60) {
//     alert('O máximo de caracteres que podes digitar é 40 e 60!');
//     return;
//   }

//   const userInfo = getItemLocalStorage();
//   const indexMensagem = userInfo.messages.findIndex(
//     (mensagem: any) => mensagem.id == id
//   );

//   userInfo.messages[indexMensagem].descricao = descricao;
//   userInfo.messages[indexMensagem].detalhamento = detalhamento;

//   setItemLocalStorage(userInfo);
//   carregarHTMLTabela();
// }

function definirID() {
  let max = 0;

  const mensagens = getItemLocalStorage().messages;
  mensagens.forEach((mensagem: any) => {
    if (mensagem.id > max) {
      max = mensagem.id;
    }
  });
  return max + 1;
}

function cleanSession() {
  sessionStorage.clear();
  window.location.href = '../public/index.html';
}