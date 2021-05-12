import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/userSummary.js";
import classNames from "classnames";
import Button from "../CustomButtons/Button";
import ProfileRating from "../ProfileRating/ProfileRating";
import Badge from "../Badge/Badge";
import {Message} from "@material-ui/icons";


const useStyles = makeStyles(styles);

export default function ReviewSummary(props) {
    const classes = useStyles();
    const {name,text} = props.review;

    return (
        <div className={classNames(classes.body)}>
            <h3 className={classes.title}>{name}</h3>
            <div>
                <p>{text}</p>
            </div>
            
            <ProfileRating/>
        </div>
    );
}

ReviewSummary.propTypes = {};