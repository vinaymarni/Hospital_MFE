import React from 'react';
import "../styles/header.css";
import logoImg from "../images/logo.png";
import Button from '../commonElements/Button';
import { userProfileSvg } from '../staticData/commonSvgs';
import { pageDetails } from '../store/globalStates';
import { useAtom } from 'jotai';


function Header() {
  const [{currentPage}, setDetails] = useAtom(pageDetails);

  const onTabChange = () => {
    setDetails((prev)=> ({ ...prev, currentPage: "panel_login" }));
  }
  
  return (
    <div className="headerMainCon">
        <img src={logoImg} alt="" className="headerLogo" />
        <Button
                            key="loginBtn"
                            buttonId ="loginBtn"
                            buttonConClassName=""
                            buttonClassName="loginBtn"
                            onSubmit={()=>onTabChange()}
                            title="Login"
                            name="login"
                            icon={userProfileSvg}
        />
    </div>
  )
}

export default Header
