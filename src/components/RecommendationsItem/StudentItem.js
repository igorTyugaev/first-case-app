import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/userItem.js";
import CardProfileStudent from "./../CardProfileStudent/CardProfileStudent";
import classNames from "classnames";
import OrderActions from "./../OrderActions/OrderActions";
import CardProfileOrder from "../CardProfileOrder/CardProfileOrder";
import ProfileAboutItem from "../ProfileAboutItem/ProfileAboutItem";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);


export default function StudentItem(props) {
    const classes = useStyles();
    const {student} = props;

    return (
        <div className={classNames(classes.main)}>

            <div className={classNames(classes.col_1)}>
                <CardProfileStudent student={student}/>
            </div>

            <div className={classNames(classes.col_2)}>
                <ProfileAboutItem user={student}/>
            </div>

            <div className={classNames(classes.col_3)}>
                <OrderActions student={student}/>
            </div>
        </div>
    );
}