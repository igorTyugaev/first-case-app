import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
//core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import HeaderLinksCustomer from "../../components/Header/HeaderLinksCustomer";
import CustomerAboutHeader from "../../components/CustomerAboutHeader/CustomerAboutHeader";
import CustomerAboutBody from "../../components/CustomerAboutBody/CustomerAboutBody";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

export default function ProfilePageCustomer (props) {
    const classes = useStyles();
    const {...rest} = props;

    return (
        <React.Fragment>
            <Header
                color="white"
                routes={dashboardRoutes}
                brand="FirstCase"
                rightLinks={<HeaderLinksCustomer/>}
                fixed
                {...rest}/>

            <div className={classNames(classes.main)}>
                <div className={classNames(classes.container)}>
                    <CustomerAboutHeader/>

                    <CustomerAboutBody/>
                </div>
            </div>
            <Footer/>       
        </React.Fragment>
    )
};