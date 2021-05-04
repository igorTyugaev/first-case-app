import React from "react";
// @material-ui/core components
// nodejs library that concatenates classes
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/profileAboutOrder.js";
import Typography from "@material-ui/core/Typography";
// core components
const dashboardRoutes = [];
const useStyles = makeStyles(styles);


export default function ProfileAboutItem(props) {
    const classes = useStyles();
    const {name} = props.profile;
    const {desc} = props.profile;

    return (
        <div className={classNames(classes.main)}>
            <h3 className={classes.title}>{name}</h3>

            <p className={classNames(classes.description)}>
                {desc}
            </p>
        </div>
    );
}

