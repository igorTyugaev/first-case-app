import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/components/userCard.js";
import classNames from "classnames";
import Button from "../CustomButtons/Button";

import profile from "../../assets/img/faces/christian.jpg";
import Badge from "../Badge/Badge";
import Rating from "@material-ui/lab/Rating";
import GridItem from "../Grid/GridItem";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(styles);

export default function CardProfileOrder(props) {
    const classes = useStyles();
    const {...rest} = props;
    const imageClasses = classNames(
        classes.imgBody,
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const [value, setValue] = React.useState(4);

    return (
        <div className={classNames(classes.body)}>
            <div className={classNames(classes.profile)}>
                <img src={profile} alt="..." className={imageClasses}/>

                <div style={{padding: "5px"}}>
                    <Badge color="success">Аккаунт проверен</Badge>
                </div>

                <Typography variant="body2" color="textSecondary" component="p">
                    Выполненых работ: 200
                </Typography>

                <Rating name="read-only" value={value} readOnly style={{padding: "5px"}}/>

            </div>
        </div>
    );
}

CardProfileOrder.propTypes = {};
