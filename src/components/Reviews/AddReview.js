import React, {useState} from "react";
import {Typography, Input, Button, Card, Grid, ListItem} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";

import reviews from '../../services/reviews';
import constraintsReview from '../../data/constraintsReview';
import validate from "validate.js";
import PropTypes from "prop-types";
import MakeRating from "./MakeRating/MakeRating";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "../../views/LandingPage/Grid/GridContainer";
import GridItem from "../../views/LandingPage/Grid/GridItem";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
}));

function AddReviewForm(props) {
    const [performingAction, setPerformingAction] = useState(false);
    const [errors, setErrors] = useState(null);
    const [rating, setRating] = useState(null);
    const [description, setDescription] = useState(null);

    const classes = useStyles();
    const {userID} = props;

    const onSubmit = () => {
        setPerformingAction(true);
        setErrors(null);

        const {reviewId} = props;
        const {history} = props;

        const values = {
            rating: String(rating),
            description: description,
        }

        const errorsCurrent = validate(
            {
                rating: String(rating),
                description: description,
            },
            {
                description: constraintsReview.getValidator("description"),
                rating: constraintsReview.getValidator("rating"),
            }
        );


        if (!errorsCurrent) {
            setErrors(null);

            reviews
                .updateReview(values, reviewId)
                .then(() => {
                    history.push('/');
                })
                .catch((reason) => {
                    const code = reason.code;
                    const message = reason.message;

                    switch (code) {
                        default:
                            props.openSnackbar(message);
                            return;
                    }
                })
                .finally(() => {
                    setPerformingAction(false);
                });
        } else {
            setPerformingAction(true);
            setErrors(errorsCurrent);
        }
    };

    const checkValidator = (fieldId, value) => {
        if (constraintsReview.getValidator(fieldId)) {
            const errorsCurrent = validate(
                {
                    [fieldId]: value,
                },
                {
                    [fieldId]: constraintsReview.getValidator(fieldId),
                }
            );

            if (!errorsCurrent) {
                setErrors(null);
            } else {
                setErrors(errorsCurrent);
            }
        }
    };

    const changeField = (value, fieldId) => {
        if (!fieldId) {
            return;
        }

        checkValidator(fieldId, value);
    };

    const handleChange = (value, fieldId) => {
        changeField(value, fieldId);
    };

    return (
        <Grid item xs={12} sm={12} md={8} className={classes.root}>
            <Card>
                <form>
                    <MakeRating
                        disabled={performingAction}
                        error={!!(errors && errors.name)}
                        value={rating}
                        onChange={(event) => handleChange(event.target.value, "rating")}
                    />
                    <CardBody>
                        <InputLabel>
                            <Typography variant="subtitle1" color="textPrimary" component="p">
                                Отзыв
                            </Typography>
                        </InputLabel>

                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Input
                                    autoComplete="Что нужно сделать?"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.price)}
                                    fullWidth
                                    placeholder="Что вы думаете об этом исполнителе?"
                                    required
                                    type="text"
                                    defaultValue={description ? description : ""}
                                    onChange={(event) => handleChange(event.target.value, "description")}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button
                            color="primary"
                            onClick={onSubmit}
                            disabled={performingAction}
                            variant="contained"
                        >
                            Добавить отзыв
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </Grid>
    )
}

AddReviewForm.propTypes = {
    // Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default AddReviewForm;
            