import React from 'react';
import { useAtom } from "jotai";

import '../styles/login.css';
import InputField from '../../../host_container/src/commonElements/InputField';
import { loginDetails } from '../store/globalStates,js';

function Login() {
  const [{email, password}, setData] = useAtom(loginDetails);

  const onValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prev => ({...prev, [name]: value }));
  }

  return (
    <div className='loginMainPage' >
      <div className='loginCard'>
        <h2>Login here</h2>
        <p>Need account?</p>
        <InputField 
          name="email"
          inputClassName=""
          inputType="email"
          required={true}
          value={email}
          onChange={(e)=>onValueChange(e)}
        />
        <InputField 
          name="password"
          inputClassName=""
          inputType="password"
          required={true}
          value={password}
          onChange={(e)=>onValueChange(e)}
        />
      </div>
    </div>
  )
}

export default Login;
