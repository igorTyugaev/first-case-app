import React, {Component} from "react";

import PropTypes from "prop-types";

import validate from "validate.js";
import {withStyles} from "@material-ui/core/styles";

import {
    Grid,
    Typography,
    List,
    ListItem,
    Container, Input, ListItemText, Divider, Box,
} from "@material-ui/core";

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {getTime} from 'date-fns'

import constraintsAuth from "../../data/constraintsAuth";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import CardContent from "@material-ui/core/CardContent";
import HomePage from "../HomePage/HomePage";
import LandingPage from "../../views/LandingPage/LandingPage";
import {Route} from "react-router-dom";

const styles = (theme) => ({
    mainContent: {
        paddingTop: theme.spacing(2),
    },

    badge: {
        top: theme.spacing(2),
        right: -theme.spacing(2),
    },

    loadingBadge: {
        top: "50%",
        right: "50%",
    },

    avatar: {
        marginRight: "auto",
        marginLeft: "auto",

        width: theme.spacing(14),
        height: theme.spacing(14),
    },

    nameInitials: {
        cursor: "default",
    },

    personIcon: {
        fontSize: theme.spacing(7),
    },

    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),

        minHeight: "initial",
    },
});

const initialState = {
    performingAction: false,
    errors: null,
    dateBirth: 0
};

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleFullNameChange = (fullName) => {
        const {changeField} = this.props;


        const errors = validate(
            {
                fullName: fullName,
            },
            {
                fullName: constraintsAuth.fullName,
            }
        );

        if (errors) {
            this.setState({
                errors: errors,
            });

            return;
        } else {
            this.setState({
                errors: null,
            });
        }


        changeField(fullName, "fullName");

        this.setState({
            fullName: fullName,
        });
    };

    handleDateBirthChange = (data) => {
        const {changeField} = this.props;

        changeField(getTime(data), "dateBirth");
        console.log(getTime(data));

        this.setState({
            dateBirth: data,
        });
    };

    handlePhoneNumberChange = (phoneNumber) => {
        const {changeField} = this.props;

        changeField(phoneNumber, "phoneNumber");

        this.setState({
            phoneNumber: phoneNumber,
        });
    };

    handleAboutChange = (aboutUser) => {
        const {changeField} = this.props;


        const errors = validate(
            {
                aboutUser: aboutUser,
            },
            {
                aboutUser: constraintsAuth.aboutUser,
            }
        );

        if (errors) {
            this.setState({
                errors: errors,
            });

            return;
        } else {
            this.setState({
                errors: null,
            });
        }


        changeField(aboutUser, "aboutUser");

        this.setState({
            aboutUser: aboutUser,
        });
    };

    handleChange = (value, fieldId) => {
        const {changeField} = this.props;

        changeField(value, fieldId);

        this.setState({
            [fieldId]: value,
        });
    };

    render() {
        // Styling
        const {classes} = this.props;
        const {values} = this.props;

        const {
            performingAction,
            // errors
        } = this.state;

        const errors = values.errors;

        return (
            <Container classes={{root: classes.mainContent}}>
                <List disablePadding>

                    <ListItem>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ListItemText
                                primary="Как к Вам обращаться?"
                                secondary={errors && errors.fullName ? (
                                    <Typography color="error">
                                        {errors.fullName[0]}
                                    </Typography>
                                ) : ""}
                            />

                            <Input
                                autoComplete="fullName"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.fullName)}
                                fullWidth
                                placeholder="ФИО"
                                required
                                type="text"
                                defaultValue={values.fullName ? values.fullName : ""}
                                onChange={(event) => this.handleFullNameChange(event.target.value)}
                            />
                        </Grid>
                    </ListItem>

                    <ListItem>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ListItemText
                                primary="Дата рождения"
                                secondary={errors && errors.dateBirth ? (
                                    <Typography color="error">
                                        {errors.dateBirth[0]}
                                    </Typography>
                                ) : ""}
                            />

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    autoOk={true}
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={values.dateBirth}
                                    onChange={this.handleDateBirthChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </ListItem>

                    <ListItem>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ListItemText
                                primary="Телефон"
                                secondary={errors && errors.phoneNumber ? (
                                    <Typography color="error">
                                        {errors.phoneNumber[0]}
                                    </Typography>
                                ) : ""}
                            />

                            <PhoneInput
                                country={'ru'}
                                value={this.state.phoneNumber}
                                onChange={this.handlePhoneNumberChange}
                            />
                        </Grid>
                    </ListItem>

                    <Box mt={4}>
                        <Typography gutterBottom variant="h5" component="h5" align="center">
                            Редактировать профиль
                        </Typography>
                    </Box>
                    <Box mt={1} mb={2}>
                        <Divider light/>
                    </Box>

                    {/*aboutUser*/}
                    {(values.role.toLowerCase() === "student" || values.role.toLowerCase() === "mentor") && (
                        <ListItem>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ListItemText
                                    primary="О себе"
                                    secondary={errors && errors.aboutUser ? (
                                        <Typography color="error">
                                            {errors.aboutUser[0]}
                                        </Typography>
                                    ) : ""}
                                />

                                <Input
                                    autoComplete="aboutUser"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.aboutUser)}
                                    fullWidth
                                    placeholder="О себе..."
                                    required
                                    type="text"
                                    defaultValue={values.aboutUser ? values.aboutUser : ""}
                                    onChange={(event) => this.handleAboutChange(event.target.value)}
                                />
                            </Grid>
                        </ListItem>
                    )}

                    {/*position*/}
                    {(values.role.toLowerCase() === "customer") && (
                        <ListItem>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ListItemText
                                    primary="Должность"
                                    secondary={errors && errors.position ? (
                                        <Typography color="error">
                                            {errors.position[0]}
                                        </Typography>
                                    ) : ""}
                                />

                                <Input
                                    autoComplete="position"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.position)}
                                    fullWidth
                                    placeholder="Должность..."
                                    required
                                    type="text"
                                    defaultValue={values.position ? values.position : ""}
                                    onChange={(event) => this.handleChange(event.target.value, "position")}
                                />
                            </Grid>
                        </ListItem>
                    )}
                    {/*company*/}
                    {(values.role.toLowerCase() === "customer") && (
                        <ListItem>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ListItemText
                                    primary="Организация"
                                    secondary={errors && errors.company ? (
                                        <Typography color="error">
                                            {errors.company[0]}
                                        </Typography>
                                    ) : ""}
                                />

                                <Input
                                    autoComplete="company"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.company)}
                                    fullWidth
                                    placeholder="Организация..."
                                    required
                                    type="text"
                                    defaultValue={values.company ? values.company : ""}
                                    onChange={(event) => this.handleChange(event.target.value, "company")}
                                />
                            </Grid>
                        </ListItem>
                    )}
                    {/*city*/}
                    {(values.role.toLowerCase() === "customer") && (
                        <ListItem>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ListItemText
                                    primary="Город"
                                    secondary={errors && errors.city ? (
                                        <Typography color="error">
                                            {errors.city[0]}
                                        </Typography>
                                    ) : ""}
                                />

                                <Input
                                    autoComplete="city"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.city)}
                                    fullWidth
                                    placeholder="Город..."
                                    required
                                    type="text"
                                    defaultValue={values.city ? values.city : ""}
                                    onChange={(event) => this.handleChange(event.target.value, "city")}
                                />
                            </Grid>
                        </ListItem>
                    )}
                    {/*education*/}
                    {(values.role.toLowerCase() === "student" || values.role.toLowerCase() === "mentor") && (
                        <ListItem>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ListItemText
                                    primary="Образование"
                                    secondary={errors && errors.education ? (
                                        <Typography color="error">
                                            {errors.education[0]}
                                        </Typography>
                                    ) : ""}
                                />

                                <Input
                                    autoComplete="education"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.education)}
                                    fullWidth
                                    placeholder="Образование..."
                                    required
                                    type="text"
                                    defaultValue={values.education ? values.education : ""}
                                    onChange={(event) => this.handleChange(event.target.value, "education")}
                                />
                            </Grid>
                        </ListItem>
                    )}
                    {/*experience*/}
                    {(values.role.toLowerCase() === "student" || values.role.toLowerCase() === "mentor") && (
                        <ListItem>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ListItemText
                                    primary="Опыт"
                                    secondary={errors && errors.experience ? (
                                        <Typography color="error">
                                            {errors.experience[0]}
                                        </Typography>
                                    ) : ""}
                                />

                                <Input
                                    autoComplete="experience"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.experience)}
                                    fullWidth
                                    placeholder="Опыт..."
                                    required
                                    type="text"
                                    defaultValue={values.experience ? values.experience : ""}
                                    onChange={(event) => this.handleChange(event.target.value, "experience")}
                                />
                            </Grid>
                        </ListItem>
                    )}
                    {/*serviceCost*/}
                    {(values.role.toLowerCase() === "mentor") && (
                        <ListItem>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <ListItemText
                                    primary="Стоимость услуг"
                                    secondary={errors && errors.serviceCost ? (
                                        <Typography color="error">
                                            {errors.serviceCost[0]}
                                        </Typography>
                                    ) : ""}
                                />

                                <Input
                                    autoComplete="serviceCost"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.serviceCost)}
                                    fullWidth
                                    placeholder="Стоимость услуг..."
                                    required
                                    type="text"
                                    defaultValue={values.serviceCost ? values.serviceCost : ""}
                                    onChange={(event) => this.handleChange(event.target.value, "serviceCost")}
                                />
                            </Grid>
                        </ListItem>
                    )}
                </List>
            </Container>
        );
    }
}

ProfileEdit.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Functions
    openSnackbar: PropTypes.func.isRequired,
    changeField: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProfileEdit);
