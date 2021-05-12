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
import {Box, Container, Input, InputLabel} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import RoleCard from "../../baseComponents/RoleCard/RoleCard";
import authentication from "../../services/authentication";
import ProfileEdit from "../../baseComponents/ProfileEdit";
import OrderEdit from "../../baseComponents/OrderEdit/OrderEdit";

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
        'Создать заказ'
    ];
}

export default function UserForm(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const [role, setRole] = useState(null);

    function getStepContent(stepIndex, handleNextFunc, setRole) {
        switch (stepIndex) {
            case 0:
                return (
                    <Box>
                        <Hidden xsDown>
                            <Box mb={3}>
                                <Typography variant="h4" color="textPrimary" component="p" align="center">
                                    Как Вы планируете использовать приложение?
                                </Typography>
                            </Box>

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
                            <Box mb={3}>
                                <Typography variant="h6" color="textPrimary" component="p" align="center">
                                    Как Вы планируете использовать приложение?
                                </Typography>
                            </Box>

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
                        user={props.user}
                        userData={props.userData}
                    />
                );
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
        }
    }

    useEffect(() => {
        if (role) {
            authentication
                .changeRole(role)
                .then(() => {
                    const {user, userData} = props;
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
                    console.log(role);
                });
        }

    }, [role]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Grid item xs={12} sm={12} md={10} lg={8} className={classes.root}>
            <Card>
                <CardHeader color="success">
                    <Hidden xsDown>
                        <Typography color="initial" variant="h4" component="p" align="left">
                            Расскажите немного о себе
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

                                {activeStep != 0 ? (
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
