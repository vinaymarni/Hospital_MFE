import React from 'react';
import "../styles/header.css";
import logoImg from "../images/logo.png";
import Button from '../commonElements/Button';
import { userProfileSvg } from '../staticData/commonSvgs';


function Header() {
  return (
    <div className="headerMainCon">
        <img src={logoImg} alt="" className="headerLogo" />
        <Button
                            key="loginBtn"
                            buttonId ="loginBtn"
                            buttonConClassName=""
                            buttonClassName="loginBtn"
                            onSubmit={(e)=>(e)}
                            title="Login"
                            name="login"
                            icon={userProfileSvg}
        />
    </div>
  )
}

export default Header
