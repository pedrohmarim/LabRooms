export function MontaUrlDominio() {
  const isDevelopment = window.location.host.indexOf("3000");

  console.log(isDevelopment);

  if (isDevelopment !== -1) {
    const urlDevelopment = `http://${
      window.location.host.split(":3000")[0]
    }:4000/`;

    console.log("returning url API development", urlDevelopment);

    return urlDevelopment;
  }

  const urlProd = `https://${window.location.host}:4000`;

  console.log("returning url development", urlProd);

  return urlProd;
}
