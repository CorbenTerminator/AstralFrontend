import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../../services/authenticationService';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentToken = authenticationService.currentTokenValue;
        if (!currentToken) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)