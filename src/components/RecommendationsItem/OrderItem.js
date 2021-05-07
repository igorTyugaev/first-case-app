import React from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/orderItem.js";
import ItemDescriptionSmall from "../ItemDescription/ItemDescriptionSmall";
import classNames from "classnames";
import OrderActions from "../OrderActions/OrderActions";

const useStyles = makeStyles(styles);


export default function OrderItem(props) {
    const classes = useStyles();
    const {product} = props;

    return (
        <div className={classNames(classes.main)}>

            <div className={classNames(classes.col_1)}>
                <ItemDescriptionSmall dataItem={product}/>
            </div>

            <div className={classNames(classes.col_2)}>
                <OrderActions products={product}/>
            </div>
        </div>
    );
}