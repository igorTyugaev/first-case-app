import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import ProfileRating from "../ProfileRating/ProfileRating";
import {title} from "../../../assets/jss/material-kit-react";


const useStyles = makeStyles({
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
});

export default function ReviewSummary(props) {
    const classes = useStyles();
    const {review} = props;

    return (
        <div className={classNames(classes.body)}>
            <h3 className={classes.title}>{review.author}</h3>
            <div>
                <p>{review.description}</p>
            </div>

            <ProfileRating rating={review.rating}/>
        </div>
    );
}

ReviewSummary.propTypes = {};