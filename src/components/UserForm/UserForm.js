import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import {Box, Container} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import RoleCard from "../../components/RoleCard/RoleCard";
import authentication from "../../services/authentication";
import ProfileEdit from "../../components/ProfileEdit";
import validate from "validate.js";
import constraintsAuth from "../../data/constraintsAuth";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(14),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    stepper: {
        backgroundColor: "transparent",
        width: "100%",
        paddingLeft: 0,
        paddingRight: 0,
    },
    step: {
        width: "100%",
        paddingLeft: 0,
        paddingRight: 0,
    },
    inner: {
        width: "100%",
        height: "100%",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    action: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

function getSteps() {
    return [
        'Выбрать роль',
        'Заполнить профиль',
        'Начать пользоваться сайтом'
    ];
}

function UserForm(props) {
    const classes = useStyles();
    const steps = getSteps();

    // Defining initial state
    const [activeStep, setActiveStep] = useState(0);
    const [performingAction, setPerformingAction] = useState(false);
    // Base user info
    const [errors, setErrors] = useState(null);
    const [role, setRole] = useState(null);
    const [fullName, setFullName] = useState("");
    const [dateBirth, setDateBirth] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [aboutUser, setAboutUser] = useState("");

    const [position, setPosition] = useState("");
    const [company, setCompany] = useState("");
    const [city, setCity] = useState("");
    const [education, setEducation] = useState("");
    const [experience, setExperience] = useState("");
    const [serviceCost, setServiceCost] = useState("");

    const values = {
        errors,
        role,
        fullName,
        dateBirth,
        phoneNumber,
        aboutUser,
        position,
        company,
        city,
        education,
        experience,
        serviceCost
    }

    const changeField = (value, fieldId) => {
        if (!fieldId) {
            return;
        }

        const errorsCurrent = validate(
            {
                fullName: fullName,
                dateBirth: dateBirth,
                phoneNumber: phoneNumber,
                education: education,
                experience: experience,
            },
            {
                fullName: constraintsAuth.fullName,
                dateBirth: constraintsAuth.dateBirth,
                phoneNumber: constraintsAuth.phoneNumber,
                education: constraintsAuth.education,
                experience: constraintsAuth.experience,
            }
        );

        if (!errorsCurrent)
            setErrors(null);
        else
            setErrors(errorsCurrent);

        switch (fieldId) {
            case "fullName":
                setFullName(value);
                return;

            case "dateBirth":
                setDateBirth(value);
                return;

            case "phoneNumber":
                setPhoneNumber(value);
                return;

            case "aboutUser":
                setAboutUser(value);
                return;

            case "position":
                setPosition(value);
                return;

            case "company":
                setCompany(value);
                return;


            case "city":
                setCity(value);
                return;

            case "education":
                setEducation(value);
                return;

            case "experience":
                setExperience(value);
                return;

            case "serviceCost":
                setServiceCost(value);
                return;

            default:
                return;
        }
    };

    const checkValid = () => {
        if (role.toLowerCase() === "mentor") {
            const errorsCurrent = validate(
                {
                    fullName: fullName,
                    dateBirth: dateBirth,
                    phoneNumber: phoneNumber,
                    education: education,
                },
                {
                    fullName: constraintsAuth.fullName,
                    dateBirth: constraintsAuth.dateBirth,
                    phoneNumber: constraintsAuth.phoneNumber,
                    education: constraintsAuth.education,
                }
            );

            return errorsCurrent;

        } else if (role.toLowerCase() === "student") {

            const errorsCurrent = validate(
                {
                    fullName: fullName,
                    dateBirth: dateBirth,
                    phoneNumber: phoneNumber,
                    education: education,
                },
                {
                    fullName: constraintsAuth.fullName,
                    dateBirth: constraintsAuth.dateBirth,
                    phoneNumber: constraintsAuth.phoneNumber,
                    education: constraintsAuth.education,
                }
            );
            return errorsCurrent;

        } else if (role.toLowerCase() === "customer") {
            const errorsCurrent = validate(
                {
                    fullName: fullName,
                    dateBirth: dateBirth,
                    phoneNumber: phoneNumber,
                },
                {
                    fullName: constraintsAuth.fullName,
                    dateBirth: constraintsAuth.dateBirth,
                    phoneNumber: constraintsAuth.phoneNumber,
                }
            );

            return errorsCurrent;
        }
    };

    // creating user and submitting data to firebase
    const submitForm = (values) => {

        const errorsCurrent = checkValid();

        if (!errorsCurrent) {
            setPerformingAction(true);
            setErrors(null);

            authentication
                .updateProfile(values)
                .then(() => {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
            setErrors(errorsCurrent);
            return;
        }
    }

    const handleNext = () => {
        if (activeStep === 1) {
            submitForm(values);
        } else
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {
        if (role) {
            setErrors(null);
            values.errors = null;
        }

    }, [role]);

    function getStepContent(stepIndex, handleNextFunc, setRole) {
        switch (stepIndex) {
            case 0:
                return (
                    <Box>
                        <Hidden xsDown>
                            <Grid container spacing={2} mt={4} direction="row">
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <RoleCard role={0} handleFormNext={handleNextFunc} setRoleForm={setRole}/>
                                </Grid>

                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <RoleCard role={1} handleFormNext={handleNextFunc} setRoleForm={setRole}/>
                                </Grid>

                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <RoleCard role={2} handleFormNext={handleNextFunc} setRoleForm={setRole}/>
                                </Grid>
                            </Grid>
                        </Hidden>

                        <Hidden smUp>
                            <Grid container spacing={2} mt={4} direction="column" alignItems="center">
                                <Grid item md={12} lg={12}>
                                    <RoleCard role={0} handleFormNext={handleNextFunc} setRoleForm={setRole}/>
                                </Grid>

                                <Grid item md={12} lg={12}>
                                    <RoleCard role={1} handleFormNext={handleNextFunc} setRoleForm={setRole}/>
                                </Grid>

                                <Grid item md={12} lg={12}>
                                    <RoleCard role={2} handleFormNext={handleNextFunc} setRoleForm={setRole}/>
                                </Grid>
                            </Grid>
                        </Hidden>
                    </Box>
                )
            case 1:
                return (
                    <ProfileEdit
                        theme={props.theme}
                        openSnackbar={props.openSnackbar}
                        changeField={changeField}
                        values={values}
                    />
                );
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
        }
    }

    const getStepTitle = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return "Как Вы планируете использовать приложение?"
            case 1:
                return "Расскажите немного о себе?"
            case 2:
                return "Начать пользоваться сайтом"
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <Grid item xs={12} sm={12} md={10} lg={8} className={classes.root}>
            <Card>
                <CardHeader color="success">
                    <Hidden xsDown>
                        <Typography color="initial" variant="h4" component="h4" align="left">
                            {getStepTitle(activeStep)}
                        </Typography>
                    </Hidden>

                    <Hidden smUp>
                        <Typography color="initial" variant="subtitle1" component="p" align="left">
                            Расскажите немного о себе
                        </Typography>
                    </Hidden>
                </CardHeader>
                <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label} className={classes.step}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box mb={4}>
                    {activeStep === steps.length ? (
                        <Container>
                            <Typography className={classes.inner}>Все шаги выполнены</Typography>
                            <Button onClick={handleReset}>Сбросить</Button>
                        </Container>
                    ) : (
                        <Container>
                            <Box className={classes.inner}>
                                {getStepContent(activeStep, handleNext, setRole)}

                                {activeStep !== 0 ? (
                                    <Box className={classes.action}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                        >
                                            Назад
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Сохранить' : 'Далее'}
                                        </Button>
                                    </Box>
                                ) : (<div></div>)}
                            </Box>
                        </Container>
                    )}
                </Box>
            </Card>
        </Grid>
    );
}

export default UserForm;
