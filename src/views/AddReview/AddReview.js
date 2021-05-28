import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/editProfile.js";
import { useHistory } from "react-router-dom";
// core components
import classNames from "classnames";
import GridItem from "components/Grid/GridItem.js";
import {Typography,Input} from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import InputLabel from "@material-ui/core/InputLabel";
import MakeRating from './../../components/MakeRating/MakeRating';
import reviews from '../../services/reviews';
import constraintsReview from '../../data/constraintsReview';
import validate from "validate.js";
import PropTypes from "prop-types";

const initialState = {
    performingAction: false,
    errors: null,
    rating: null,
    description: null,
};

class AddReviewForm extends Component {
    state = initialState;

    onSubmit = () => {
        this.setState({
            performingAction: true,
            errors: null,
        })

        const {reviewId} = this.props;
        const {history} = this.props;

        const values = {
            rating: String(this.state.rating),
            description: this.state.description,
        }

       

        const errorsCurrent = validate(
            {
                rating: this.state.rating,
                description: this.state.description,
            },
            {
                description: constraintsReview.getValidator("description"),
                rating: constraintsReview.getValidator("rating"),
            }
        );
        

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

        const {userID} = this.props;
        
        const {
            performingAction,
            errors,
        } = this.state;

        return (
            <div>
                <Card>
                    <CardHeader color="success">
                        <h4>Создать отзыв</h4>
                        <p>
                            Пожалуйста, укажите ваш отзыв ниже
                        </p>
                    </CardHeader>
                    
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
                                        disabled={performingAction}
                                        error={!!(errors && errors.price)}
                                        fullWidth
                                        placeholder="Что вы думаете об этом исполнителе?"
                                        required
                                        type="text"
                                        defaultValue={this.description ? this.description : ""}
                                        onChange={(event) => this.handleChange(event.target.value, "description")}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button 
                            color="success"
                            onClick={this.onSubmit}
                            disabled={performingAction}
                            variant="contained"
                            >
                                Добавить отзыв
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
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

export default AddReviewForm;
            