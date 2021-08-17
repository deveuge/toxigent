import React from 'react';
import { Link } from 'react-router-dom';
import '../static/css/navbar.css';

import logo from '../static/img/logo.svg';
import { AppName, AppData } from '../util/Constants';

const Navbar = () => {
	const NavLink = (props) => {
		return (
			<Link to={props.href} title={props.title}>{props.title}</Link>
		);
	}
	return (
		<nav id="navbar">
			<Link to="/" title="Home">
				<img src={logo} alt="Logo"/>
				<h1>{AppName}</h1>
			</Link>
			<ul>
				<li><NavLink href={"/p/" + AppData.plantData[Math.floor(Math.random()*AppData.plantData.length)].name.common} title="Random plant"/></li>
			</ul>
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