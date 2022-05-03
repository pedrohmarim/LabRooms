import React from "react";
import RecaptchaComponent from "react-recaptcha";

const Recaptcha = ({ verifyCallback, ref }) => {
  return (
    <RecaptchaComponent
      ref={ref}
      sitekey='6LcpB7wfAAAAAI5wsOh6ugN_VyH_py20baWnBMYA'
      render='explicit'
      verifyCallback={verifyCallback}
    />
  );
};

export default Recaptcha;
