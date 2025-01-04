import { mount } from 'panel_two/PanelTwoApp';
import React, { useRef, useEffect } from 'react';

const PanelTwoApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []); 

  return <div ref={ref} />;
};

export default PanelTwoApp;
