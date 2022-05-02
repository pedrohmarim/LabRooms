import React from 'react'
import RecaptchaComponent from 'react-recaptcha';

const Recaptcha = ({ verifyCallback, ref }) => {
  return (
    <RecaptchaComponent
        ref={ref}
        sitekey="6LctebsfAAAAAMnYtQpVVoxMXSbu4AA3cy7To82g"
        render="explicit"
        verifyCallback={verifyCallback}
    />
  )
};

export default Recaptcha;
