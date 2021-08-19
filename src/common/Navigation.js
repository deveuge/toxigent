import React from 'react';
import { Link } from 'react-router-dom';
import '../static/css/navbar.css';

import logo from '../static/img/logo.svg';
import { AppName, AppData } from '../util/Constants';
import { setTheme, isLightTheme } from '../util/Functions';
import Toggle from "react-toggle";
import "react-toggle/style.css"

const DarkModeToggle = () => {
	return (
	  <Toggle
	  	defaultChecked={isLightTheme()}
		onChange={({ target }) => setTheme(target.checked)}
		icons={{ checked: "🔆", unchecked: "🌙" }}
		aria-label="Toggle dark mode"
	  />
	);
};

const Navbar = () => {
	return (
		<nav id="navbar">
			<Link to="/" title="Home">
				<img src={logo} alt="Logo" />
				<h1>{AppName}</h1>
			</Link>
			<DarkModeToggle/>
		</nav>
	);
}

const TopNavigation = ({ crumbs }) => {
	return (
		<header>
			{crumbs.map(({ name, path }, key) => key + 1 === crumbs.length
				? (<Link key={key} to={path} className="active">{name}</Link>)
				: (<Link key={key} to={path}>{name}</Link>)
			)}
		</header>
	);
};

export { TopNavigation };
export default Navbar;