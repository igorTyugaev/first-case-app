import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {
    dangerColor,
    infoColor,
    primaryColor,
    roseColor,
    successColor,
    warningColor
} from "../../assets/jss/material-kit-react";

const useStyles = makeStyles({
    badge: {
        marginRight: "3px",
        borderRadius: "12px",
        padding: "5px 12px",
        textTransform: "uppercase",
        fontSize: "10px",
        fontWeight: "500",
        lineHeight: "1",
        color: "#fff",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "baseline",
        display: "inline-block"
    },
    primary: {
        backgroundColor: primaryColor
    },
    warning: {
        backgroundColor: warningColor
    },
    danger: {
        backgroundColor: dangerColor
    },
    success: {
        backgroundColor: successColor
    },
    info: {
        backgroundColor: infoColor
    },
    rose: {
        backgroundColor: roseColor
    },
    gray: {
        backgroundColor: "#6c757d"
    }
});

export default function Badge(props) {
    const classes = useStyles();
    const {color, children} = props;
    return (
        <span className={classes.badge + " " + classes[color]}>{children}</span>
    );
}

Badge.defaultProps = {
    color: "gray"
};

Badge.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    children: PropTypes.node
};
