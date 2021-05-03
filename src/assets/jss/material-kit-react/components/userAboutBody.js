import {container, title} from "assets/jss/material-kit-react.js";

import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";

const userAboutBodyStyle = {

    description: {
        flex: "2",
        color: "#999",
        textAlign: "justify !important"
    },

    titleDescription: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "0px",
        minHeight: "32px",
        textDecoration: "none"
    },
};

export default userAboutBodyStyle;
