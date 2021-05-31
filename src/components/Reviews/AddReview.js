import React, {useState} from "react";
import {Typography, Input, Button, Grid, Card, Link, Box} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import {NavLink, useHistory, useParams} from "react-router-dom";
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
import {ArrowBackIos as BackIcon} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(8),
    },
    header: {
        height: "10%",
        padding: "15px",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
}));

function AddReview(props) {
    const [performingAction, setPerformingAction] = useState(false);
    const [errors, setErrors] = useState(null);

    const [rating, setRating] = useState(null);
    const [description, setDescription] = useState(null);

    // Custom Properties
    const classes = useStyles();
    const history = useHistory();
    const {currentId} = useParams();
    const {userData, user, openSnackbar} = props;

    const onSubmit = () => {
        setPerformingAction(true);
        setErrors(null);

        const fullname = props.userData.fullName;

        const values = {
            rating: String(rating),
            description: description,
            targetPerson: currentId,
            fullName: fullname,
        }

        const errorsCurrent = validate(
            {
                description: description,
            },
            {
                description: constraintsReview.description,
            }
        );

        if (!errorsCurrent) {
            setErrors(null);

            reviews
                .updateReview(values)
                .then(() => {
                    history.goBack();
                })
                .catch((reason) => {
                    const code = reason.code;
                    const message = reason.message;
                    openSnackbar(message);
                })
                .finally(() => {
                    setPerformingAction(false);
                });
        } else {
            setPerformingAction(true);
            setErrors(errorsCurrent);
        }
    };

    const validDescription = (value) => {
        const errorsCurrent = validate(
            {
                description: value,
            },
            {
                description: constraintsReview.description,
            }
        );

        if (!errorsCurrent) {
            setErrors(null);
            setDescription(value);
        } else {
            setErrors(errorsCurrent);
        }
    };

    const handleChange = (value, fieldId) => {
        if (fieldId === "rating") {
            setRating(value);
            return;
        }

        validDescription(value);
    };

    return (
        <Grid item xs={12} sm={12} md={8} className={classes.root}>
            <Card>
                <Box className={classes.header}>
                    <Button
                        startIcon={<BackIcon/>}
                        onClick={() => history.goBack()}
                    >
                        Назад
                    </Button>

                    <Typography color="primary" variant="h5">
                        Оставить отзыв
                    </Typography>

                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </Box>
                <MakeRating
                    error={!!(errors && errors.name)}
                    value={rating}
                    onChange={(event) => handleChange(event.target.value, "rating")}
                />

                <CardBody>
                    <InputLabel>
                        <Typography variant="subtitle1" color="textPrimary" component="p">
                            Отзыв
                        </Typography>
                        {(errors && errors.description) && (
                            <Typography variant="subtitle1" color="secondary" component="p">
                                {errors.description}
                            </Typography>
                        )}
                    </InputLabel>

                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <Input
                                autoComplete="Что нужно сделать?"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.description)}
                                fullWidth
                                multiline
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
            </Card>
        </Grid>
    )

};

AddReview.propTypes = {
    // Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default AddReview;