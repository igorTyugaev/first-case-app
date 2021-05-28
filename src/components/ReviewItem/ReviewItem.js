import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/userAboutHeader.js";
import classNames from "classnames";
import UserReview from "./../UserReview/UserReview";
import ReviewSummary from "./../ReviewSummary/ReviewSummary";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);


export default function ReviewItem(props) {
    const classes = useStyles();
    const {review} = props;

    return (
        <div className={classes.body}>
            <div className={classNames(classes.card)}>
                <UserReview photo={review.athorPhoto}/>
            </div>
            <div className={classNames(classes.summary)} style={{paddingLeft: "45px"}}>
                <ReviewSummary review={review}/>
            </div>
        </div>
    );
}

ReviewItem.propTypes = {};