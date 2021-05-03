import {title} from "assets/jss/material-kit-react.js";

const userSummaryStyle = {

    body: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    },

    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "0px",
        minHeight: "32px",
        textDecoration: "none"
    },

    btn: {
        margin: "0",
    }
};

export default userSummaryStyle;
