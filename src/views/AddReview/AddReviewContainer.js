import React from 'react';
import GridItem from "components/Grid/GridItem.js";
import AddReview from './AddReview';
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(20),
    }
}));

const AddReviewContainer = (props) => {
    const {...rest} = props;
    // Styling
    const classes = useStyles();
    // Custom Properties
    const {theme} = props;

    return (
        <GridItem xs={12} sm={12} md={8} className={classes.root}>
            <AddReview {...rest}/>
        </GridItem>
    )
};

AddReviewContainer.propTypes = {
    // Custom Properties
    theme: PropTypes.object.isRequired,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default AddReviewContainer;