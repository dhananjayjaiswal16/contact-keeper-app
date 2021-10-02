import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ children, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
    console.log("isAuth", isAuthenticated);
    console.log("loading", loading);

    return (
        <Route {...rest}
            render={({ location }) => {
                return (
                    (!isAuthenticated) ? (
                        <Redirect to='/login' />
                    ) : (
                        children
                    )
                )

            }} />
    )
}
export default PrivateRoute;