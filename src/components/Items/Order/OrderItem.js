import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/orderItem.js";
import classNames from "classnames";
import OrderItemDescription from "./OrderItemDescription";
import OrderActions from "./OrderActions";

const useStyles = makeStyles(styles);

export default function OrderItem(props) {
    const classes = useStyles();
    const {order} = props;

    return (
        <div className={classNames(classes.main)}>

            <div className={classNames(classes.col_1)}>
                <OrderItemDescription order={order}/>
            </div>

            <div className={classNames(classes.col_2)}>
                <OrderActions order={order}/>
            </div>
        </div>
    );
}