import React, {useState} from "react";
import {Typography, Input, Button, Card, Grid} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { useHistory } from "react-router-dom";
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

const initialState = {
    performingAction: false,
    errors: null,
    rating: null,
    description: null,
    targetPerson: null,
};

export default class AddReviewForm extends React.Component {
    state = initialState;

    onSubmit = () => {
        this.setState({
            performingAction: true,
            errors: null,
        });

        const {reviewId} = this.props;
        const {history} = this.props;
        const current = this.props.currentId;
        const fullname = this.props.userData.fullName;
  
        console.log('rating onSubmit: '+this.state.rating+' | description onSubmit: '+this.state.description+' | currentId onSubmit: '+current);
        const values = {
            rating: String(this.state.rating),
            description: this.state.description,
            targetPerson: current,
            fullName: fullname,
        }
        console.log(values);
        const errorsCurrent = validate(
            {
                rating: String(this.state.rating),
                description: this.state.description,
                targetPerson: current,
                fullName: fullname,
            },
            {
                description: constraintsReview.getValidator("description"),
                rating: constraintsReview.getValidator("rating"),
                targetPerson: constraintsReview.getValidator("currentId"),
            }
        );
        console.log('errorsCurrent: '+errorsCurrent);
        if (!errorsCurrent) {
            this.setState({
                errors: null,
            });

            reviews
            .updateReview(values, reviewId)
            .then(() => {
                history.push('/');
            })
            .catch((reason) => {
                const code = reason.code;
                const message = reason.message;
                console.log('reason: ' + reason);
                switch (code) {
                    default:
                        this.props.openSnackbar(message);
                        return;
                }
            })
            .finally(() => {
                this.setState({
                    performingAction: false,
                })
            });
        } else {
            this.setState({
                performingAction: false,
                errors: errorsCurrent,
            });
        }
    };

    checkValidator = (fieldId, value) => {
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
                this.setState({
                    errors: null,
                })}
            else {
                this.setState({
                    errors: errorsCurrent,
                })
            }
        }
    };

    changeField = (value, fieldId) => {
        if (!fieldId) {
            return;
        }

        this.checkValidator(fieldId, value);
    };

    handleChange = (value, fieldId) => {
        this.changeField(value, fieldId);
        this.setState({
            [fieldId]: value,
        });
    };

    render() {
        const {userID, userData,currentId} = this.props;
        //console.log(userID);
        //console.log(userData);
        //console.log(currentId);
        
        const {
            performingAction,
            errors,
        } = this.state;

        return (
                <Card>
                    <form>
                        <MakeRating
                            disabled={performingAction}
                            error={!!(errors && errors.name)}
                            value={this.rating}
                            onChange={(event) => this.handleChange(event.target.value, "rating")}
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
                                        disabled={this.state.performingAction}
                                        error={!!(this.state.errors && this.state.errors.name)}
                                        fullWidth
                                        placeholder="Что вы думаете об этом исполнителе?"
                                        required
                                        type="text"
                                        defaultValue={this.state.description ? this.state.description : ""}
                                        onChange={(event) => this.handleChange(event.target.value, "description")}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button
                                color="primary"
                                onClick={this.onSubmit}
                                disabled={performingAction}
                                variant="contained"
                            >
                                Добавить отзыв
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
        )
    };
    componentWillUnmount() {
        this.setState({history: null})
    };
};

AddReviewForm.propTypes = {
    // Functions
    openSnackbar: PropTypes.func.isRequired,
};
            