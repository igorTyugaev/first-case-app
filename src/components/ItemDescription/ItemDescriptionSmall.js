import React from "react";
// @material-ui/core components
// nodejs library that concatenates classes
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/profileAboutOrder.js";
import Typography from "@material-ui/core/Typography";
// core components
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@material-ui/core";

const useStyles = makeStyles(styles);


export default function ItemDescriptionSmall(props) {
    const classes = useStyles();
    const {dataItem} = props;

    return (
        <div className={classNames(classes.main)}>
            <h3 className={classes.title}>
                <Link
                    color="inherit"
                    component={RouterLink}
                    to={`/new_order/${dataItem.id}`}
                    underline="none"
                >
                    {!dataItem.title || dataItem.title.length < 1 ? "Загаловок отсутствует" : dataItem.title}
                </Link>
            </h3>

            <p className={classNames(classes.description)}>
                {!dataItem.desc || dataItem.desc.length < 1 ? "Описание отсутствует" : dataItem.desc}
            </p>
        </div>
    );
}

