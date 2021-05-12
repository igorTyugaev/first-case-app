import React, {Component} from "react";

import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

import {auth} from "../../firebase";
import authentication from "../../services/authentication";

import MainPage from "../../components/MainPage/MainPage";
import UserForm from "../../views/UserForm/UserForm";


class HomePage extends Component {
    signInWithEmailLink = () => {
        const {user} = this.props;

        if (user) {
            return;
        }

        const emailLink = window.location.href;

        if (!emailLink) {
            return;
        }

        if (auth.isSignInWithEmailLink(emailLink)) {
            let emailAddress = localStorage.getItem("emailAddress");

            if (!emailAddress) {
                this.props.history.push("/");
                return;
            }

            authentication
                .signInWithEmailLink(emailAddress, emailLink)
                .then((value) => {
                    const user = value.user;
                    const displayName = user.displayName;
                    const emailAddress = user.email;

                    this.props.openSnackbar(
                        `Вы вошли как ${displayName || emailAddress}`
                    );
                })
                .catch((reason) => {
                    const code = reason.code;
                    const message = reason.message;

                    switch (code) {
                        case "auth/expired-action-code":
                        case "auth/invalid-email":
                        case "auth/user-disabled":
                            this.props.openSnackbar(message);
                            break;

                        default:
                            this.props.openSnackbar(message);
                            return;
                    }
                })
                .finally(() => {
                    this.props.history.push("/");
                });
        }
    };

    render() {
        // Styling
        const {classes} = this.props;

        // Custom Properties
        const {user, userData, theme} = this.props;

        // Custom Functions
        const {openSnackbar} = this.props;

        // Custom Functions
        const {onDeleteAccountClick} = this.props;

        if (userData && userData.isProfileComplete) {
            return (
                <MainPage/>
            );
        } else {
            return (
                <UserForm theme={theme} userData={userData} user={user} openSnackbar={openSnackbar}
                          onDeleteAccountClick={onDeleteAccountClick}/>
            );
        }
    }

    componentDidMount() {
        this.signInWithEmailLink();
    }
}

HomePage.propTypes = {
    user: PropTypes.object,
};

export default withRouter(HomePage);
