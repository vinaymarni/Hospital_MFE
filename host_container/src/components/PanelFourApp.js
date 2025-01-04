import { mount } from 'panel_four/PanelFourApp';
import React, { useRef, useEffect } from 'react';

const PanelFourApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []); 

  return <div ref={ref} />;
};

export default PanelFourApp;
