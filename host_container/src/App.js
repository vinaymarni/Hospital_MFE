import React, { useEffect } from 'react';
import { useAtom } from "jotai";
import "./styles/home.css";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { getAvailableRemotes } from './apis/hostContainerApis';
import { pageDetails, remotesData } from './store/globalStates';
import { RemoteComponent } from './components/RemoteComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

const App = () => {
  const [, setData] = useAtom(remotesData);
  const [details, setDetails] = useAtom(pageDetails);
  const {isLoggedIn} = details;

  const onUpdateData = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    getAvailableRemotes(onUpdateData);
  }, []);

  return (
      <div className='homeMainCon'>
        <Header />
        {isLoggedIn ?
          <Dashboard />
          :
          <LandingPage/>
        }

        {false &&
        <>
          <RemoteComponent key="panel_one_c" keyName="panel_one" />
          <RemoteComponent key="panel_two_c" keyName="panel_two" />
          <RemoteComponent key="panel_three_c" keyName="panel_three" />
          <RemoteComponent key="panel_four_c" keyName="panel_four" />
          <RemoteComponent key="panel_login_c" keyName="panel_login" />
          </>
        }
        <Footer />
      </div>
  );
};

export default App;



        {/* <nav style={{  gap: "20px" }}>
          <Link to="/">Home</Link>
          <Link to="/nurse">nurse</Link>
          <Link to="/physician">physician</Link>
          <Link to="/admin">admin</Link>
          <Link to="/login">login</Link>
        </nav> */}
        {/* <Router>
          <Routes>
            <Route path="/" element={<RemoteComponent key="panel_one_c" keyName="panel_one" />} />
            <Route path="/nurse" element={<RemoteComponent key="panel_two_c" keyName="panel_two" />} />
            <Route path="/physician" element={<RemoteComponent key="panel_three_c" keyName="panel_three" />} />
            <Route path="/admin" element={<RemoteComponent key="panel_four_c" keyName="panel_four" />} />
            <Route path="/login" element={<RemoteComponent key="panel_login_c" keyName="panel_login" />} />
          </Routes>
        </Router> */}