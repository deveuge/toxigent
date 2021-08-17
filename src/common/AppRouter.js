import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from '../sections/Home';
import Detail from '../sections/Detail';

import Navigation from '../common/Navigation';
import ScrollToTop from '../common/ScrollToTop';

const AppRouter = () => {

    const routes = [
      { path: "/", name: "Toxigent", Component: Home },
      { path: "/p/:id", name: "View details", Component: Detail }
    ];

    return (
        <Switch>
            {routes.map(({ path, Component }, key) => (
                <Route exact path={path} key={key} render=
                    {props => {
                        const crumbs = routes.filter(({ path }) => props.match.path.includes(path))
                            .map(({ path, ...rest }) => ({
                                path: Object.keys(props.match.params).length
                                    ? Object.keys(props.match.params).reduce((path, param) => path.replace(`:${param}`, props.match.params[param]), path)
                                    : path, ...rest 
                            }));
                        return (
                            <div>
                                <ScrollToTop/>
                                <Navigation />
                                <Component {...props} crumbs={crumbs} />
                            </div>
                        );
                    }}
                />
            ))}
        </Switch>
    );
}

export default AppRouter;