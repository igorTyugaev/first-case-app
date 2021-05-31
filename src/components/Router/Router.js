import React, {Component} from "react";

import PropTypes from "prop-types";

import {BrowserRouter, Switch, Redirect, Route} from "react-router-dom";

import ProfilesList from "../../components/RecommendationsList/ProfilesList";
import ProfilePage from "../ProfilePage";
import LandingPage from "../../views/LandingPage/LandingPage";
import CreateOrderPage from "../CreateOrderPage";
import OrderPage from "../OrderPage/OrderPage";
import OrderList from "../../components/RecommendationsList/OrderList";
import DialogsList from "../../components/RecommendationsList/DialogsList";
import SettingsPage from "../SettingsPage";
import AddReview from "../Reviews/AddReviewConstainer";
import Reviews from "../Reviews/Reviews";
import UserForm from "../UserForm/UserForm";
import NotFoundPage from "../NotFoundPage";
import DialogPage from "../DialogPage/DialogPage";
import HomePage from "../HomePage";

class Router extends Component {
    state = {
        currentId: null,
    };

    onBtnClick = (idUser) => {
        this.setState({currentId: idUser});
    };

    render() {
        // Properties
        const {theme, userData, user, bar, roles} = this.props;
    
        // Functions
        const {openSnackbar} = this.props;
        const {onDeleteAccountClick} = this.props;
        const isProfileComplete = user && userData && userData.isProfileComplete;

        return (
            <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
                {bar}
                <Switch>
                    <Route path="/" exact>
                        {user ? (
                            <HomePage theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                                      onDeleteAccountClick={onDeleteAccountClick}/>
                        ) : (
                            <LandingPage theme={theme}/>
                        )}
                    </Route>

                    <Route path="/user/:userId">
                        {isProfileComplete ? <ProfilePage theme={theme} openSnackbar={openSnackbar} onClick={this.onBtnClick} currentId={this.state.currentId}/> :
                            <Redirect to="/"/>}
                    </Route>

                    <Route path="/settings/">
                        {isProfileComplete ?
                            <SettingsPage theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                                          onDeleteAccountClick={onDeleteAccountClick}/> : <Redirect to="/"/>}
                    </Route>

                    <Route path="/orders/">
                        {isProfileComplete ?
                            <OrderList theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}/> :
                            <Redirect to="/"/>}
                    </Route>

                    <Route path="/people/">
                        {isProfileComplete ?
                            <ProfilesList theme={theme} user={user} userData={userData} openSnackbar={openSnackbar}/> :
                            <Redirect to="/"/>}
                    </Route>

                    <Route path="/create_order/">
                        {isProfileComplete ?
                            <CreateOrderPage theme={theme} userID={user.uid} openSnackbar={openSnackbar}/> :
                            <Redirect to="/"/>}
                    </Route>

                    <Route path="/create_review/">
                        {user ? <AddReview theme={theme} userID={user} userData={userData} openSnackbar={openSnackbar}  currentId={this.state.currentId}/> :
                            <Redirect to="/"/>}
                    </Route>

                    <Route path="/reviews/">
                        {user ? <Reviews theme={theme} userData={userData} user={user} openSnackbar={openSnackbar} currentId={this.state.currentId}/> :
                            <Redirect to="/"/>}
                    </Route>

                    <Route path="/form/">
                        {isProfileComplete ?
                            <UserForm theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                                      onDeleteAccountClick={onDeleteAccountClick}/> :
                            <Redirect to="/"/>}
                    </Route>

                    <Route path="/order_page/:orderId">
                        {isProfileComplete ?
                            <OrderPage theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                                       onDeleteAccountClick={onDeleteAccountClick}/> :
                            <Redirect to="/"/>}
                    </Route>

                    <Route path="/dialogs/">
                        {user ? (
                            <DialogsList theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}/>
                        ) : <Redirect to="/"/>}
                    </Route>

                    <Route path="/dialog/:id/">
                        {user ? (
                            <DialogPage theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}/>
                        ) : <Redirect to="/"/>}
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
