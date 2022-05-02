const fetch = require("node-fetch");

module.exports = async (captcha) => {
    const response_key = captcha;
    const secret_key = '6LctebsfAAAAAMnYtQpVVoxMXSbu4AA3cy7To82g';
    
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`
    
     await fetch(url, {
        method: "post",
      }).then((response) => response.json())
      .then((google_response) => {
   
   
        if (google_response.success === true) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
}