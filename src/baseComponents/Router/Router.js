import React, {Component} from "react";

import PropTypes from "prop-types";

import {BrowserRouter, Switch, Redirect, Route} from "react-router-dom";

import HomePage from "../HomePage";
import AdminPage from "../AdminPage";
import UserPage from "../UserPage";
import NotFoundPage from "../NotFoundPage";
import SettingsPage from "../SettingsPage";
import Components from "../../views/Components/Components";
import OrderList from "../../components/RecommendationsList/OrderList";
import MentorForCustomerList from "../../components/RecommendationsList/MentorForCustomerList";

class Router extends Component {
    render() {
        // Properties
        const {theme, userData, user, roles, bar} = this.props;

        // Functions
        const {openSnackbar} = this.props;
        const {onDeleteAccountClick} = this.props;

        return (
            <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
                {bar}

                <Switch>
                    <Route path="/" exact>
                        <HomePage user={user} openSnackbar={openSnackbar}/>
                    </Route>

                    <Route path="/admin">
                        {user && roles.includes("admin") ? (
                            <AdminPage/>
                        ) : (
                            <Redirect to="/"/>
                        )}
                    </Route>

                    <Route path="/user/:userId">
                        {user ? <UserPage/> : <Redirect to="/"/>}
                    </Route>

                    <Route path="/settings/:userId">
                        {user ? <SettingsPage theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                                              onDeleteAccountClick={onDeleteAccountClick}/> : <Redirect to="/"/>}
                    </Route>

                    <Route path="/orders/:userId">
                        {user ? <OrderList theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                                           onDeleteAccountClick={onDeleteAccountClick}/> : <Redirect to="/"/>}
                    </Route>

                    <Route path="/people/:userId">
                        {user ? <MentorForCustomerList theme={theme} userData={userData} user={user}
                                                       openSnackbar={openSnackbar}
                                                       onDeleteAccountClick={onDeleteAccountClick}/> :
                            <Redirect to="/"/>}
                    </Route>

                    <Route path="/example/">
                        <Components/>
                    </Route>

                    <Route>
                        <NotFoundPage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

Router.propTypes = {
    // Properties
    user: PropTypes.object,
    roles: PropTypes.array.isRequired,
    bar: PropTypes.element,

    // Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default Router;
