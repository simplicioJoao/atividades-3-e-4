function alteraTamanho(id) {
    let descricaoDetalhada = document.getElementById('descricao-' + id);
    let tamanhoCaixa = document.getElementById(id);
    let botao = document.querySelector('#' + id + ' button');

    if (descricaoDetalhada.style.display === "none") {
        tamanhoCaixa.style.height = 630 + 'px';
        tamanhoCaixa.style.verticalAlign = 'top';
        descricaoDetalhada.style.display = "block";
        botao.textContent = "-";
    } else {
        tamanhoCaixa.style.height = 240 + 'px';
        tamanhoCaixa.style.verticalAlign = 'middle';
        descricaoDetalhada.style.display = "none";
        botao.textContent = "+";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = form.nome.value.trim();
        const email = form.email.value.trim();
        const mensagem = form.mensagem.value.trim();

        if (nome !== '' && email !== '' && mensagem !== '') {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        }
    });
});