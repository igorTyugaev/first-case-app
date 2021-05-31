import React from 'react';
import {Grid} from "@material-ui/core";
import AddReview from './AddReview';
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();
    return (
        <Grid item xs={12} sm={12} md={8} className={classes.root}>
            <AddReview history={history} {...rest}/>
        </Grid>
    )
};

AddReviewContainer.propTypes = {
    // Custom Properties
    theme: PropTypes.object.isRequired,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default AddReviewContainer; 