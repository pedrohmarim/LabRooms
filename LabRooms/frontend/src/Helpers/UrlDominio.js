export function MontaUrlDominio() {
  const isDevelopment = window.location.href.indexOf("3000");

  if (isDevelopment !== null) {
    const urlDevelopment = `${window.location.href.split(":3000")[0]}:4000/`;

    console.log("returning url development", urlDevelopment);

    return urlDevelopment;
  }

  const urlProd = `${window.location.href.slice(0, -1)}:4000`;

  console.log("returning url development", urlProd);

  return urlProd;
}
