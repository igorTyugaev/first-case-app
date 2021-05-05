import React, {Component} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles, withStyles} from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/components/userCard.js";
import classNames from "classnames";
import profile from "../../assets/img/faces/christian.jpg";
import Badge from "../Badge/Badge";
import {Avatar, Box, CircularProgress, Container, Fade, Grid, Hidden, Typography} from "@material-ui/core";

const style = (theme) => ({
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "100%",
    },

    profile: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",

        "& img": {
            display: "block",
            maxWidth: "160px",
            width: "100%",
        }
    },

    badge: {
        top: theme.spacing(2),
        right: -theme.spacing(2),
    },

    loadingBadge: {
        top: "50%",
        right: "50%",
    },

    avatar: {
        marginRight: "auto",
        marginLeft: "auto",

        width: theme.spacing(14),
        height: theme.spacing(14),
    },

    nameInitials: {
        cursor: "default",
    },

    personIcon: {
        fontSize: theme.spacing(7),
    },

    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),

        minHeight: "initial",
    },
});

const initialState = {
    profileCompletion: 0,
    securityRating: 0,
    showingField: "",
    avatar: null,
    avatarUrl: "",
    firstName: "",
    lastName: "",
    username: "",
    emailAddress: "",
    performingAction: false,
    loadingAvatar: false,
    sentVerificationEmail: false,
    errors: null,
    password: "",
    passwordConfirmation: "",
};

class UserCard extends Component {

    constructor(props) {
        super(props);

        this.state = initialState;
    }

    render() {
        // Styling
        const {classes} = this.props;

        // Properties
        const {user, userData} = this.props;

        const {
            profileCompletion,
            securityRating,
            showingField,
            performingAction,
            loadingAvatar,
            avatar,
            avatarUrl,
            firstName,
            lastName,
            username,
            errors,
        } = this.state;

        return (
            <div className={classNames(classes.body)}>
                <div className={classNames(classes.profile)}>
                    {/*<img src={profile} alt="..." className={imageClasses}/>*/}

                    <Box>
                        {avatar && avatarUrl && (
                            <Badge
                                classes={{badge: classes.badge}}>
                                {loadingAvatar && (
                                    <Badge
                                        classes={{badge: classes.loadingBadge}}
                                        badgeContent={
                                            <Fade
                                                style={{transitionDelay: "1s"}}
                                                in={loadingAvatar}
                                                unmountOnExit
                                            >
                                                <CircularProgress size={120} thickness={1.8}/>
                                            </Fade>
                                        }
                                    >
                                        <Avatar
                                            className={classes.avatar}
                                            alt="Аватар"
                                            src={avatarUrl}
                                        />
                                    </Badge>
                                )}

                                {!loadingAvatar && (
                                    <Avatar
                                        className={classes.avatar}
                                        alt="Аватар"
                                        src={avatarUrl}
                                    />
                                )}
                            </Badge>
                        )}

                        {!avatar && !avatarUrl && (
                            <>
                                {user.photoURL && (
                                    <Badge classes={{badge: classes.badge}}>
                                        {loadingAvatar && (
                                            <Badge
                                                classes={{badge: classes.loadingBadge}}
                                                badgeContent={
                                                    <Fade
                                                        style={{transitionDelay: "1s"}}
                                                        in={loadingAvatar}
                                                        unmountOnExit
                                                    >
                                                        <CircularProgress
                                                            size={120}
                                                            thickness={1.8}
                                                        />
                                                    </Fade>
                                                }
                                            >
                                                <Avatar
                                                    className={classes.avatar}
                                                    alt="Аватар"
                                                    src={user.photoURL}
                                                />
                                            </Badge>
                                        )}

                                        {!loadingAvatar && (
                                            <Avatar
                                                className={classes.avatar}
                                                alt="Аватар"
                                                src={user.photoURL}
                                            />
                                        )}
                                    </Badge>
                                )}

                                {!user.photoURL && (
                                    <>
                                        {loadingAvatar && (
                                            <Badge
                                                classes={{badge: classes.loadingBadge}}
                                                badgeContent={
                                                    <Fade
                                                        style={{transitionDelay: "1s"}}
                                                        in={loadingAvatar}
                                                        unmountOnExit
                                                    >
                                                        <CircularProgress
                                                            size={120}
                                                            thickness={1.8}
                                                        />
                                                    </Fade>
                                                }
                                            >
                                                <Avatar className={classes.avatar} alt="Аватар">
                                                    {this.getNameInitialsOrIcon()}
                                                </Avatar>
                                            </Badge>
                                        )}

                                        {!loadingAvatar && (
                                            <Avatar className={classes.avatar} alt="Аватар">
                                                {this.getNameInitialsOrIcon()}
                                            </Avatar>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </Box>

                    <div className={classes.name}>
                        <h5>Дизайнер</h5>
                        <Badge color="success">Аккаунт проверен</Badge>
                    </div>
                </div>
            </div>
        );
    }
}

UserCard.propTypes = {};
export default withStyles(style)(UserCard);