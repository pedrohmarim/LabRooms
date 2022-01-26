import React from "react";
import Header from "../../GlobalComponents/Header/Header.component";
import SignUpForm from "./components/SignupForm/Signup.form.component";

import { SignFormContainer, SignForm } from "./components/SignupForm/styles";
// import SignupBanner from "../../assets/signupbanner.mov";

export default function Signup() {
  return (
    <>
      <Header />
      {/* <video loop autoPlay muted id='video-container'>
          <source
            src={SignupBanner}
          />
      </video> */}
      <SignFormContainer title='Registrar-se' bordered={false}>
        <SignForm>
            <SignUpForm />
          </SignForm>
      </SignFormContainer>
    </>
  );
}
