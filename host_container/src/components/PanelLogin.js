import { mount } from 'panel_login/PanelLoginApp';
import React, { useRef, useEffect } from 'react';

const PanelLogin = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []); 

  return <div ref={ref} />;
};

export default PanelLogin;
