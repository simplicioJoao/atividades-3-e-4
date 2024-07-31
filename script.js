document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario');
    const listaMensagensNaoLidas = document.getElementById('lista-mensagens-nao-lidas');
    const listaMensagensLidas = document.getElementById('lista-mensagens-lidas');

    // Função para criar uma nova mensagem
    function createMensagem(data) {
        const mensagens = getMensagens();
        data.id = new Date().getTime();
        data.lida = false;
        mensagens.push(data);
        localStorage.setItem('mensagens', JSON.stringify(mensagens));
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
            loadMensagens();
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
                <div class="dados">
                    <strong>${mensagem.nome}</strong>
                    <p>${mensagem.email}</p><br>
                    <p>${mensagem.mensagem}</p>
                </div>
            `;

            const deletarButton = document.createElement('button');
            deletarButton.textContent = 'Excluir';
            deletarButton.className = 'botao-excluir';
            deletarButton.onclick = function () {
                deleteMensagem(mensagem.id);
            }

            if (!mensagem.lida) {
                listaMensagensNaoLidas.appendChild(li);     
                const buttonsContainer = document.createElement('div');
                const editarButton = document.createElement('button');
                const marcarLidaButton = document.createElement('button');

                editarButton.textContent = 'Editar';
                marcarLidaButton.textContent = 'Marcar como lida';
                
                buttonsContainer.className = 'botoes-mensagem';
                editarButton.className = 'botao-editar';
                marcarLidaButton.className = 'botao-marcar-lida';

                marcarLidaButton.onclick = function () {
                    marcarComoLida(mensagem.id);
                };
                editarButton.onclick = function () {
                    editMensagem(mensagem.id);
                };
            
                li.appendChild(buttonsContainer);
                buttonsContainer.appendChild(editarButton);
                buttonsContainer.appendChild(marcarLidaButton);
                buttonsContainer.appendChild(deletarButton);
            } else {
                listaMensagensLidas.appendChild(li);
                li.appendChild(deletarButton);
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
            const modalForm = document.getElementById('formulario');
            modalForm.nome.value = mensagem.nome;
            modalForm.email.value = mensagem.email;
            modalForm.mensagem.value = mensagem.mensagem;
            modalForm.id.value = mensagem.id;

            abrirModal();
        }
    }

    window.fecharModal = function () {
        const modal = document.getElementById('modal-editar');
        modal.style.display = 'none';
    }

    function abrirModal() {
        const modal = document.getElementById('modal-editar');
        modal.style.display = 'block';
    }

    // Evento de submissão do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (data.id) {
            updateMensagem(data);
            alert("Mensagem editada com sucesso!");
            loadMensagens();
            fecharModal();
        } else {
            createMensagem(data);
            alert("Mensagem enviada com sucesso!");
        }
        form.reset();
    });
    loadMensagens();
});

function alteraTamanho(id) {
    let descricaoDetalhada = document.getElementById('descricao-' + id);
    let tamanhoCaixa = document.getElementById(id);
    let botao = document.querySelector('#' + id + ' button');

    if (descricaoDetalhada.style.display === "none" || !descricaoDetalhada.style.display) {
        tamanhoCaixa.style.height = 'auto';
        descricaoDetalhada.style.display = "flex";
        descricaoDetalhada.style.flexDirection = "column";
        descricaoDetalhada.style.alignItems = "center";
        botao.textContent = "-";
    } else {
        tamanhoCaixa.style.height = '100%';
        descricaoDetalhada.style.display = "none";
        botao.textContent = "+";
    }
}