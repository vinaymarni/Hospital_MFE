import { mount } from 'panel_one/PanelOneApp';
import React, { useRef, useEffect } from 'react';
import axios from 'axios';

const PanelOneApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    if(mount && ref.current) mount(ref.current);
    console.log(ref.current)
  }, []);

  return <div ref={ref} />;
};

export default PanelOneApp;
