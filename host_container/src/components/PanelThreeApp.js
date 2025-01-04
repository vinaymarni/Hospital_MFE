import { mount } from 'panel_three/PanelThreeApp';
import React, { useRef, useEffect } from 'react';

const PanelThreeApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []); 

  return <div ref={ref} />;
};

export default PanelThreeApp;
