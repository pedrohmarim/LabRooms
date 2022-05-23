import React, { forwardRef } from "react";
import RecaptchaComponent from "react-recaptcha";

const Recaptcha = ({ verifyCallback }, ref) => {
  return (
    <RecaptchaComponent
      ref={ref}
      sitekey='6LdT2PgfAAAAADxyXKVCFLqGxbFSYz8M_I7pv4wA'
      render='explicit'
      verifyCallback={verifyCallback}
    />
  );
};

export default forwardRef(Recaptcha);
