const fetchP = import("node-fetch").then((mod) => mod.default);
const fetch = (...args) => fetchP.then((fn) => fn(...args));

module.exports = async (captcha) => {
  const response_key = captcha;
  const secret_key = "6LdT2PgfAAAAAKt1G-oNa5L7pe_Ne7P9IAeTQd6k";

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

  const validCaptcha = fetch(url)
    .then((res) => res.json())
    .then(({ success }) => {
      return success;
    });

  return validCaptcha;
};
