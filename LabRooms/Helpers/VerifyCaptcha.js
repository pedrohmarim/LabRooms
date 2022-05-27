const fetchP = import("node-fetch").then((mod) => mod.default);
const fetch = (...args) => fetchP.then((fn) => fn(...args));

module.exports = async (captcha) => {
  const response_key = captcha;
  const secret_key = "6LeXNPQfAAAAAFs_IWRvuXG7Q1z0cgRJs4WDGXg3";

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

  const validCaptcha = fetch(url)
    .then((res) => res.json())
    .then(({ success }) => {
      return success;
    });

  return validCaptcha;
};
