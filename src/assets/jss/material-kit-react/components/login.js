import {containerFluid} from "../../material-kit-react";

const login = theme => (
    {
        inner: {
            margin: "0 auto",
            ...containerFluid,
            "@media (min-width: 576px)": {
                maxWidth: "85%"
            },
            "@media (min-width: 768px)": {
                maxWidth: "62%"
            },
            "@media (min-width: 992px)": {
                maxWidth: "62%"
            },
            "@media (min-width: 1200px)": {
                maxWidth: "40%"
            },

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
        },

        main: {
            background: "#FFFFFF",
            paddingTop: "10vh",
            height: "90vh",
        },

        header: {},

        policy: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },

        textHighLineHeight: {
            lineHeight: "3",
        },

        btn: {},
    }
);

export default login;
