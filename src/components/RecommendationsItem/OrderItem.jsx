import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/orderItem.js";
import ProfileAboutItem from "../ProfileAboutItem/ProfileAboutItem";
import Button from "../CustomButtons/Button";
import { ListItem } from "@material-ui/core";
import classNames from "classnames";
import OrderActions from "../OrderActions/OrderActions";

import firebase from 'firebase';

const useStyles = makeStyles(styles);

export default function OrderItem(props) {
    const classes = useStyles();
    const { product } = props;

    const user = firebase.auth().currentUser;

    const isMentor = user?.roles?.includes('mentor');
    const isStudent = user?.roles?.includes('student');
    const isCustomer = user?.roles?.includes('customer');

    return (
        <div className={classNames(classes.main)}>

            <div className={classNames(classes.col_1)}>
                <ProfileAboutItem profile={product} />
            </div>

            <div className={classNames(classes.col_2)}>
                <OrderActions product={product} variant={isMentor ? "mentor" : isStudent ? "student" : isCustomer ? "customer" : "fuck"} />
            </div>
        </div>
    );
}