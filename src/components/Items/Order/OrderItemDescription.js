import React from "react";
// @material-ui/core components
// nodejs library that concatenates classes
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";

// core components
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@material-ui/core";

const useStyles = makeStyles({
    main: {
        padding: "0 2vw",
    },

    title: {
        color: "#3C4858",
        margin: "1.75rem 0 0.875rem",
        fontWeight: "700",
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        display: "inline-block",
        position: "relative",
        marginTop: "0px",
        minHeight: "32px",
        textDecoration: "none"
    },

    description: {},

    btn: {
        margin: 0,
        padding: 0,
    }
});


export default function OrderItemDescription(props) {
    const classes = useStyles();
    const {order} = props;


    return (
        <div className={classNames(classes.main)}>
            <h3 className={classes.title}>
                <Link
                    color="inherit"
                    component={RouterLink}
                    to={`/order_page/${order.id}`}
                    underline="none"
                >
                    {!order.name || order.name.length < 1 ? "Загаловок отсутствует" : order.name}
                </Link>
            </h3>

            <p className={classNames(classes.description)}>
                {!order.description || order.description.length < 1 ? "Описание отсутствует" : order.description}
            </p>
        </div>
    );
}

