module.exports = (cpf) => {
    cpf = cpf.trim();

    var cpfFormatado = cpf.replace(/\D/g, "");

    if (cpfFormatado.length !== 11) return null;

    cpf = cpf.split("");

    for (var index = cpf.indexOf('.') + 1; index <= cpf.indexOf('-') - 1 ; index++) {
        if (cpf[index] !== '.') {
            cpf[index] = "*"
        }
    }

    return cpf.join("");
};