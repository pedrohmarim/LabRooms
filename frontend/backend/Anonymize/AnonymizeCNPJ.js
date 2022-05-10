module.exports = (cnpj) => {
  cnpj = cnpj.trim();

  var cnpjFormatado = cnpj.replace(/\D/g, "");

  if (cnpjFormatado.length !== 14) return null;

  cnpj = cnpj.split("");

  for (
    var index = cnpj.indexOf(".") + 1;
    index <= cnpj.indexOf("-") - 1;
    index++
  ) {
    if (cnpj[index] !== "." && cnpj[index] !== "/") {
      cnpj[index] = "*";
    }
  }

  return cnpj.join("");
};
