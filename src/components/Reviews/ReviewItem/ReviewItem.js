import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import ReviewSummary from "./../ReviewSummary/ReviewSummary";
import UserReview from "../../Reviews/UserReview/UserReview";

const useStyles = makeStyles({
    body: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        margin: "0 auto",
    },

    card: {
        width: "18%",
    },

    summary: {
        width: "35%",
    },

    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
    },
});


export default function ReviewItem(props) {
    const classes = useStyles();
    const {review} = props;

    return (
        <div className={classes.body}>
            <div className={classNames(classes.card)}>
                <UserReview review={review}/>
            </div>
            <div className={classNames(classes.summary)} style={{paddingLeft: "45px"}}>
                <ReviewSummary review={review}/>
            </div>
        </div>
    );
}

ReviewItem.propTypes = {};