import React from "react";
// @material-ui/core components
// nodejs library that concatenates classes
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/profileAboutOrder.js";
// core components
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@material-ui/core";

const useStyles = makeStyles(styles);


export default function ItemDescriptionSmall(props) {
    const classes = useStyles();
    const {type} = props;
    const {id} = props;
    const {title} = props;
    const {desc} = props;

    return (
        <div className={classNames(classes.main)}>
            <h3 className={classes.title}>
                <Link
                    color="inherit"
                    component={RouterLink}
                    to={type ? (`/order_page/${id}`) : (`/user/${id}`)}
                    underline="none"
                >
                    {!title || title.length < 1 ? "Загаловок отсутствует" : title}
                </Link>
            </h3>

            <p className={classNames(classes.description)}>
                {!desc || desc.length < 1 ? "Описание отсутствует" : desc}
            </p>
        </div>
    );
}

