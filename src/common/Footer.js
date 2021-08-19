import React from 'react';
import { Link } from 'react-router-dom';
import '../static/css/navbar.css';

import logo from '../static/img/logo.svg';
import github from '../static/img/github.svg';
import random from '../static/img/random.svg';
import { AppName, AppData } from '../util/Constants';

const Footer = () => {
	return (
		<footer>
            <div>
                <a href="https://github.com/deveuge/toxigent">
                    <img src={github} alt="Github icon" title="View source code" />
                </a>
                <Link to={"/p/" + AppData.plantData[Math.floor(Math.random() * AppData.plantData.length)].name.common} title="Get random plant">
                    <img src={random} alt="Random icon" title="Get random plant" />
                </Link>
            </div>
            <div>
                <div>
                    <h2>{AppName}</h2>
                    <h5>Made by <a href="https://github.com/deveuge">deveuge</a> with React © 2021 </h5>
                </div>
                <img src={logo} alt="Logo"/>
            </div>
		</footer>
	);
}

export default Footer;