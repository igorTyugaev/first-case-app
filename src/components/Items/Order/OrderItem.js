import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import OrderItemDescription from "./OrderItemDescription";
import OrderActions from "./OrderActions";

const useStyles = makeStyles({
    main: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",

        "@media (max-width: 642px)": {
            display: "flex",
            flexDirection: "column",
        },
    },

    col_1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flex: "2.5",
        width: "100%",
    },

    col_2: {
        flex: "1",
        width: "100%",
    },
});

export default function OrderItem(props) {
    const classes = useStyles();
    const {setLoading, openSnackbar, order, userData} = props;

    return (
        <div className={classNames(classes.main)}>

            <div className={classNames(classes.col_1)}>
                <OrderItemDescription order={order}/>
            </div>

            <div className={classNames(classes.col_2)}>
                <OrderActions setLoading={setLoading} openSnackbar={openSnackbar} userData={userData} order={order}/>
            </div>
        </div>
    );
}