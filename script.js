document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario');
    const listaMensagensNaoLidas = document.getElementById('lista-mensagens-nao-lidas');
    const listaMensagensLidas = document.getElementById('lista-mensagens-lidas');

    // Função para criar uma nova mensagem
    function createMensagem(data) {
        const mensagens = getMensagens();
        data.id = new Date().getTime();
        data.lida = false; // Define a mensagem como não lida por padrão
        mensagens.push(data);
        localStorage.setItem('mensagens', JSON.stringify(mensagens));
        loadMensagens(); // Recarrega as mensagens após adicionar uma nova
    }

    // Função para ler todas as mensagens
    function getMensagens() {
        const mensagens = localStorage.getItem('mensagens');
        return mensagens ? JSON.parse(mensagens) : [];
    }

    // Função para atualizar uma mensagem
    function updateMensagem(data) {
        const mensagens = getMensagens();
        const index = mensagens.findIndex(mensagem => mensagem.id == data.id);
        if (index !== -1) {
            mensagens[index] = data;
            localStorage.setItem('mensagens', JSON.stringify(mensagens));
        }
    }

    // Função para atualizar uma mensagem (marcar como lida)
    function marcarComoLida(id) {
        const mensagens = getMensagens();
        const index = mensagens.findIndex(mensagem => mensagem.id == id);
        if (index !== -1) {
            mensagens[index].lida = true;
            localStorage.setItem('mensagens', JSON.stringify(mensagens));
            loadMensagens(); // Recarrega as mensagens após marcar como lida
        }
    }

    // Função para deletar uma mensagem
    window.deleteMensagem = function (id) {
        let mensagens = getMensagens();
        mensagens = mensagens.filter(mensagem => mensagem.id != id);
        localStorage.setItem('mensagens', JSON.stringify(mensagens));
        loadMensagens();
    }

    // Função para carregar as mensagens
    function loadMensagens() {
        const mensagens = getMensagens();
        listaMensagensNaoLidas.innerHTML = '';
        listaMensagensLidas.innerHTML = '';

        mensagens.forEach(mensagem => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${mensagem.nome}</strong> (${mensagem.email}): ${mensagem.mensagem}
                <button onclick="deleteMensagem(${mensagem.id})">Deletar</button>
            `;
            if (!mensagem.lida) {
                listaMensagensNaoLidas.appendChild(li);
                const editarButton = document.createElement('button');
                const marcarLidaButton = document.createElement('button');
                editarButton.textContent = 'Editar';
                marcarLidaButton.textContent = 'Marcar como lida';

                marcarLidaButton.onclick = function () {
                    marcarComoLida(mensagem.id);
                };
                editarButton.onclick = function () {
                    //abrirModal();
                    editMensagem(mensagem.id);
                }
                li.appendChild(editarButton);
                li.appendChild(marcarLidaButton);
            } else {
                listaMensagensLidas.appendChild(li);
            }
        });
    }

    // Função para alternar entre as abas
    window.mostrarTab = function (tab) {
        if (tab === 'nao-lidas') {
            document.getElementById('tab-nao-lidas').classList.add('active');
            document.getElementById('tab-lidas').classList.remove('active');
            document.getElementById('mensagens-nao-lidas').classList.add('active');
            document.getElementById('mensagens-lidas').classList.remove('active');
        } else if (tab === 'lidas') {
            document.getElementById('tab-lidas').classList.add('active');
            document.getElementById('tab-nao-lidas').classList.remove('active');
            document.getElementById('mensagens-lidas').classList.add('active');
            document.getElementById('mensagens-nao-lidas').classList.remove('active');
        }
    }

    // Função para editar uma mensagem
    window.editMensagem = function (id) {
        const mensagens = getMensagens();
        const mensagem = mensagens.find(mensagem => mensagem.id == id);
        if (mensagem) {
            // Preencher campos do formulário no modal
            const modalForm = document.getElementById('formulario');
            modalForm.nome.value = mensagem.nome;
            modalForm.email.value = mensagem.email;
            modalForm.mensagem.value = mensagem.mensagem;
            modalForm.id.value = mensagem.id;

            // Abrir o modal
            abrirModal();
        }
    }

    // Função para fechar o modal
    window.fecharModal = function () {
        const modal = document.getElementById('modal-editar');
        modal.style.display = 'none';
    }

    // Função para abrir o modal
    function abrirModal() {
        const modal = document.getElementById('modal-editar');
        modal.style.display = 'block';
    }

    // Evento de submissão do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio tradicional do formulário

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (data.id) {
            // Se houver um ID, é uma edição
            updateMensagem(data);
            alert("Mensagem editada com sucesso!");
            fecharModal();
            loadMensagens();   // Recarrega a página depois de editar uma mensagem
        } else {
            // Senão, é uma nova mensagem
            createMensagem(data);
        }

        form.reset(); // Reseta o formulário após envio
    });

    // Carrega as mensagens ao iniciar a página
    loadMensagens();
});

function alteraTamanho(id) {
    let descricaoDetalhada = document.getElementById('descricao-' + id);
    let tamanhoCaixa = document.getElementById(id);
    let botao = document.querySelector('#' + id + ' button');

    if (descricaoDetalhada.style.display === "none" || !descricaoDetalhada.style.display) {
        tamanhoCaixa.style.height = 'auto';
        descricaoDetalhada.style.display = "block";
        botao.textContent = "-";
    } else {
        tamanhoCaixa.style.height = '240px';
        descricaoDetalhada.style.display = "none";
        botao.textContent = "+";
    }
}