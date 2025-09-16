//exercício 02
function exercicio02() {
    const inputs = document.querySelectorAll('.inputs');
    const soma = parseFloat(inputs[0].value) + parseFloat(inputs[1].value);
    document.querySelector('#saida').textContent = soma;
}