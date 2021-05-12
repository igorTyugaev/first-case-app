import React, {Component} from "react";

import PropTypes from "prop-types";

import {BrowserRouter, Switch, Redirect, Route} from "react-router-dom";

import HomePage from "../HomePage";
import AdminPage from "../AdminPage";
import NotFoundPage from "../NotFoundPage";
import SettingsPage from "../SettingsPage";
import Components from "../../views/Components/Components";
import OrderList from "../../components/RecommendationsList/OrderList";
import MentorForCustomerList from "../../components/RecommendationsList/MentorForCustomerList";
import ProfilePage from "../ProfilePage";
import AddOrderPage from "../AddOrderPage";
import AddOrder from "../../views/AddOrder/AddOrder";
import UserForm from "../../views/UserForm/UserForm";
import LandingPage from "../../views/LandingPage/LandingPage";

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
                        {user ? (
                            <HomePage theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                                      onDeleteAccountClick={onDeleteAccountClick}/>
                        ) : (
                            <LandingPage/>
                        )}
                    </Route>

                    <Route path="/admin">
                        {user && roles.includes("admin") ? (
                            <AdminPage/>
                        ) : (
                            <Redirect to="/"/>
                        )}
                    </Route>

                    <Route path="/user/:userId">
                        {user ? <ProfilePage theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                                             onDeleteAccountClick={onDeleteAccountClick}/> : <Redirect to="/"/>}
                    </Route>

                    <Route path="/settings/">
                        {user ? <SettingsPage theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                                              onDeleteAccountClick={onDeleteAccountClick}/> : <Redirect to="/"/>}
                    </Route>

                    <Route path="/orders/">
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

                    <Route path="/new_order/:orderId">
                        <AddOrderPage theme={theme} openSnackbar={openSnackbar}/>
                    </Route>

                    <Route path="/new_order_old/">
                        <AddOrder/>
                    </Route>

                    <Route path="/form/">
                        {user ? <UserForm theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                                          onDeleteAccountClick={onDeleteAccountClick}/> :
                            <Redirect to="/"/>}
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
