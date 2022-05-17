export function MontaUrlDominio() {
  const isDevelopment = window.location.host.indexOf("3000");

  if (isDevelopment !== -1) {
    const urlDevelopment = `http://${
      window.location.host.split(":3000")[0]
    }:4000/`;

    return urlDevelopment;
  }

  const urlProd = `https://labrooms.up.railway.app/`;

  return urlProd;
}
