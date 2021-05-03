import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import UserAboutHeader from "../../components/UserAboutHeader/UserAboutHeader";
import HeaderLinksProfile from "../../components/Header/HeaderLinksProfile";
import UserAboutBody from "../../components/UserAboutBody/UserAboutBody";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function ProfilePageMentor(props) {
    const classes = useStyles();
    const {...rest} = props;

    return (
        <div>
            <Header
                color="white"
                routes={dashboardRoutes}
                brand="FirstCase"
                rightLinks={<HeaderLinksProfile/>}
                fixed
                {...rest}/>

            <div className={classNames(classes.main)}>
                <div className={classNames(classes.container)}>
                    <UserAboutHeader/>

                    <UserAboutBody/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
