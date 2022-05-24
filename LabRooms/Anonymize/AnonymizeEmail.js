module.exports = (email) => {
  email = email.trim().split("");

  for (var i = 0; i < email.length; i++) {
    if (i > 2 && i < email.indexOf("@")) {
      email[i] = "*";
    }
  }

  return email.join("");
};
