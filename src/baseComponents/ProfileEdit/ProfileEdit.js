import React, {Component} from "react";

import PropTypes from "prop-types";

import validate from "validate.js";
import {withStyles} from "@material-ui/core/styles";

import {
    Grid,
    Typography,
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Hidden,
    TextField,
    Divider, Container, Input, Badge, Tooltip, Fab, Fade, CircularProgress, Avatar,
} from "@material-ui/core";

import {
    Close as CloseIcon, CloudUpload as CloudUploadIcon,
    DeleteForever as DeleteForeverIcon, Lock as LockIcon, Photo as PhotoIcon,
} from "@material-ui/icons";

import constraintsAuth from "../../data/constraintsAuth";
import orders from "../../services/orders";
import InputLabel from "@material-ui/core/InputLabel";
import constraintsOrder from "../../data/constraintsOrder";
import {auth, firestore} from "../../firebase";
import authentication from "../../services/authentication";

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
    showingField: "",
    performingAction: false,
    errors: null,
};

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    showField = (fieldId) => {
        if (!fieldId) {
            return;
        }

        this.setState({
            showingField: fieldId,
        });
    };

    hideFields = (callback) => {
        this.setState(
            {
                showingField: "",
                title: "",
                errors: null,
            },
            () => {
                if (callback && typeof callback === "function") {
                    callback();
                }
            }
        );
    };

    changeField = (fieldId) => {
        switch (fieldId) {
            case "about":
                this.changeAbout();
                return;

            default:
                return;
        }
    };

    changeFields = () => {
        this.changeAbout();
    };

    handleKeyDown = (event, fieldId) => {
        if (!event || !fieldId) {
            return;
        }

        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        const key = event.key;

        if (!key) {
            return;
        }

        if (key === "Escape") {
            this.hideFields();
        } else if (key === "Enter") {
            this.changeField(fieldId);
        }
    };

    changeAbout = () => {
        const {about} = this.state;

        const errors = validate(
            {
                about: about,
            },
            {
                about: constraintsAuth.about,
            }
        );

        if (errors) {
            this.setState({
                errors: errors,
            });

            return;
        }

        this.setState(
            {
                errors: null,
            },
            () => {
                const {user} = this.props;

                if (about === user.about) {
                    return;
                }

                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        authentication
                            .changeAbout(about)
                            .then(() => {
                                const {user, userData} = this.props;

                                this.setState(
                                    {
                                        profileCompletion: authentication.getProfileCompletion({
                                            ...user,
                                            ...userData,
                                        }),
                                    },
                                    () => {
                                        this.hideFields();
                                    }
                                );
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
                                });
                            });
                    }
                );
            }
        );
    };

    handleAboutChange = (event) => {
        if (!event) {
            return;
        }

        const about = event.target.value;

        this.setState({
            about: about,
        });
    };

    render() {
        // Styling
        const {classes} = this.props;
        const {user, userData} = this.props;

        const {
            performingAction,
            errors,
            about,
        } = this.state;

        const hasAbout = userData && userData.about;

        return (
            <Container classes={{root: classes.mainContent}}>
                <List disablePadding>

                    <ListItem>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <InputLabel>
                                <Typography variant="subtitle1" color="textPrimary" component="p">
                                    О себе
                                </Typography>
                            </InputLabel>

                            <Input
                                autoComplete="title"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.title)}
                                fullWidth
                                rowsMax={12}
                                multiline
                                placeholder={hasAbout && userData.about}
                                required
                                type="text"
                                value={about}
                                variant="filled"
                                onKeyDown={(event) => this.handleKeyDown(event, "about")}
                                onChange={this.handleAboutChange}
                            />
                        </Grid>
                    </ListItem>
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
};

export default withStyles(styles)(ProfileEdit);
