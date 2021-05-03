import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
//core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import HeaderLinksStudent from "../../components/Header/HeaderLinksStudent";
import StudentAboutHeader from "../../components/StudentAboutHeader/StudentAboutHeader";
import StudentAboutBody from "../../components/StudentAboutBody/StudentAboutBody";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function ProfilePageStudent (props) {
    const classes = useStyles();
    const {...rest} = props;

    return (
        <React.Fragment>
            <Header
                color="white"
                routes={dashboardRoutes}
                brand="FirstCase"
                rightLinks={<HeaderLinksStudent/>}
                fixed
                {...rest}/>

            <div className={classNames(classes.main)}>
                <div className={classNames(classes.container)}>
                    <StudentAboutHeader/>

                    <StudentAboutBody/>
                </div>
            </div>
            <Footer/>       
        </React.Fragment>
    )
};