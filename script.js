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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});