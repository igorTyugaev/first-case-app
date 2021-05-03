import {container, title} from "assets/jss/material-kit-react.js";

import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";

const profilePageStyle = {
    container,
    profile: {
        textAlign: "center",
        "& img": {
            display: "block",
            maxWidth: "160px",
            width: "100%",
            margin: "0 auto",
            // transform: "translate3d(0, -50%, 0)"
        }
    },

    about: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        margin: "0 auto",
        maxWidth: "960px",

        "@media (min-width: 768px)": {

        },
    },

    description: {
        flex: "2",
        color: "#999",
        textAlign: "justify !important"
    },
    name: {},
    ...imagesStyle,
    main: {
        display: "block",
        width: "100%",
        background: "#FFFFFF",
        padding: "12vh 0",
        minHeight: "90vh",
    },

    mainFull: {
        marginTop: "40px"
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none"
    },

    titleDescription: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "0px",
        minHeight: "32px",
        textDecoration: "none"
    },

    rolerrrr: {
        display: "block !important"
    },

    socials: {
        marginTop: "0",
        width: "100%",
        transform: "none",
        left: "0",
        top: "0",
        height: "100%",
        lineHeight: "41px",
        fontSize: "20px",
        color: "#999"
    },
    navWrapper: {
        margin: "20px auto 50px auto",
        textAlign: "center"
    }
};

export default profilePageStyle;
