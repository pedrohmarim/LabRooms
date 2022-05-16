import React, { forwardRef } from "react";
import RecaptchaComponent from "react-recaptcha";

const Recaptcha = ({ verifyCallback }, ref) => {
  return (
    <RecaptchaComponent
      ref={ref}
      sitekey='6LeXNPQfAAAAAGCN_3jeXYmlS_cvMlK5_4tMqh2w'
      render='explicit'
      verifyCallback={verifyCallback}
    />
  );
};

export default forwardRef(Recaptcha);
