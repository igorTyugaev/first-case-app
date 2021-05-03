import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";
import {title} from "../../material-kit-react";

const userCardStyle = {
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "100%",
    },

    profile: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",

        "& img": {
            display: "block",
            maxWidth: "160px",
            width: "100%",
        }
    },

    ...imagesStyle,
    imgBody: {
        display: "block"
    },

};

export default userCardStyle;
