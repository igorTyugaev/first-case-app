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


export default function ProfileItemDescription(props) {
    const classes = useStyles();
    const {profile} = props;

    return (
        <div className={classNames(classes.main)}>
            <h3 className={classes.title}>
                <Link
                    color="inherit"
                    component={RouterLink}
                    to={`/user/${profile.id}`}
                    underline="none"
                >
                    {!profile.fullName || profile.fullName.length < 1 ? "Загаловок отсутствует" : profile.fullName}
                </Link>
            </h3>

            <p className={classNames(classes.description)}>
                {!profile.aboutUser || profile.aboutUser.length < 1 ? "Описание отсутствует" : profile.aboutUser}
            </p>
        </div>
    );
}

