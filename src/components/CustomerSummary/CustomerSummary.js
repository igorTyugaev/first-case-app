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

export default function CustomerSummary(props) {
    const classes = useStyles();
    const {...rest} = props;

    return (
        <div className={classNames(classes.body)}>
            <h3 className={classes.title}>Михаил Михаилов</h3>

            <ProfileRating/>

            <Button color="success" round className={classes.btn}>
                <Message className={classes.icons}/> Написать сообщение
            </Button>

        </div>
    );
}

CustomerSummary.propTypes = {};