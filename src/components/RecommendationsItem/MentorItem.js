import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/userItem.js";
import CardProfileOrder from "../CardProfileOrder/CardProfileOrder";
import ItemDescriptionSmall from "../ItemDescription/ItemDescriptionSmall";
import classNames from "classnames";
import OrderActions from "../OrderActions/OrderActions";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);


export default function MentorItem(props) {
    const classes = useStyles();
    const {mentor} = props;

    return (
        <div className={classNames(classes.main)}>

            <div className={classNames(classes.col_1)}>
                <CardProfileOrder/>
            </div>

            <div className={classNames(classes.col_2)}>
                <ItemDescriptionSmall dataItem={mentor}/>
            </div>

            <div className={classNames(classes.col_3)}>
                <OrderActions mentor={mentor}/>
            </div>

        </div>
    );
}
