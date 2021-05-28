import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import classNames from "classnames";
import imagesStyle from "../../../assets/jss/material-kit-react/imagesStyles";

const useStyles = makeStyles({
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
});

export default function UserReview(props) {
    const classes = useStyles();
    const {photo} = props;
    const imageClasses = classNames(
        classes.imgBody,
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    return (
        <div className={classNames(classes.body)}>
            <div className={classNames(classes.profile)}>
                <img src={photo ? photo : null} alt="..." className={imageClasses}/>
            </div>
        </div>
    );
}

UserReview.propTypes = {};