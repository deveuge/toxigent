import './static/css/loader.css';

import { useEffect, useState } from "react";
import axios from 'axios';

import AppRouter from './common/AppRouter';

import logo from './static/img/logo.svg';
import { AppData } from './util/Constants';

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/static/json/data.json').then(res => {
      AppData.plantData = res.data;
      Object.freeze(AppData);
      // Simulated latency to show loader
      setTimeout(function () {
        setLoading(false);
      }, 1000);
    });
  }, []);

  const Loader = () => {
    return (
      <div id="logo">
        <img src={logo} alt="Logo" />
      </div>
    );
  }
  
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
