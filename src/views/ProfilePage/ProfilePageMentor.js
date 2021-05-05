import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
// core components
import Footer from "components/Footer/Footer.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import UserAboutHeader from "../../components/UserAboutHeader/UserAboutHeader";
import UserAboutBody from "../../components/UserAboutBody/UserAboutBody";

const useStyles = makeStyles(styles);

export default function ProfilePageMentor(props) {
    const classes = useStyles();
    const {...rest} = props;

    // Custom Properties
    const {user, userData, theme} = props;

    // Custom Functions
    const {openSnackbar} = props;

    return (
        <div>

            <div className={classNames(classes.main)}>
                <div className={classNames(classes.container)}>
                    <UserAboutHeader user={user} userData={userData}/>

                    <UserAboutBody/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
