import React, {Component} from "react";

import PropTypes from "prop-types";

import validate from "validate.js";
import moment from "moment";
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

class OrderEdit extends Component {
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

    changeFields = () => {
        this.changeTitle();
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
            this.changeFields();
        }
    };

    handleTitleChange = (event) => {
        if (!event) {
            return;
        }

        const title = event.target.value;

        this.setState({
            title: title,
        });
    };

    changeTitle = () => {
        const {title} = this.state;

        const errors = validate(
            {
                title: title,
            },
            {
                title: constraintsOrder.title,
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

                if (title === user.title) {
                    return;
                }

                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        orders
                            .changeTitle(title)
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


    render() {
        // Styling
        const {classes} = this.props;

        // Properties
        const {user, userData} = this.props;

        // Events
        const {onDeleteAccountClick} = this.props;

        const {
            performingAction,
            errors,
            title,
        } = this.state;


        const hasTitle = userData && userData.title;

        return (
            <Container classes={{root: classes.mainContent}}>
                <List disablePadding>

                    <ListItem>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <InputLabel>
                                <Typography variant="subtitle1" color="textPrimary" component="p">
                                    Название заказа
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
                                placeholder={(errors && errors.title)
                                    ? errors.title[0]
                                    : (hasTitle && userData.title)
                                }
                                required
                                type="text"
                                value={title ? title.trim() : (hasTitle && userData.title.trim())}
                                variant="filled"
                                onKeyDown={(event) => this.handleKeyDown(event, "title")}
                                onChange={this.handleTitleChange}
                            />
                        </Grid>
                    </ListItem>


                    <Box mt={1} mb={1}>
                        <Divider light/>
                    </Box>

                    <ListItem>
                        <Hidden xsDown>
                            <Grid alignItems="center" container direction="row" justify="space-between">
                                <Grid item xs>
                                    <ListItemText
                                        primary="Опубликовать объявление"
                                        secondary="Объявление можно будет отредактировать позже"
                                    />
                                </Grid>

                                <Grid item xs>
                                    <ListItemSecondaryAction>
                                        <Button
                                            color="primary"
                                            disabled={performingAction}
                                            variant="contained"
                                            onClick={() => this.changeFields()}
                                        >
                                            Опубликовать
                                        </Button>
                                    </ListItemSecondaryAction>
                                </Grid>
                            </Grid>
                        </Hidden>

                        <Hidden smUp>
                            <Grid alignItems="center" container direction="column" justify="space-between">
                                <Grid item xs>
                                    <ListItemText
                                        primary="Опубликовать объявление"
                                        secondary="Объявление можно будет отредактировать позже"
                                    />
                                </Grid>

                                <Grid item xs>
                                    <Box mb={2} mt={2}>
                                        <Button
                                            color="primary"
                                            disabled={performingAction}
                                            variant="contained"
                                            onClick={() => this.changeFields()}
                                        >
                                            Опубликовать
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Hidden>
                    </ListItem>
                </List>
            </Container>
        );
    }

    componentDidMount() {
        const {user, userData} = this.props;
    }

    componentWillUnmount() {
        const {avatarUrl} = this.state;

        if (avatarUrl) {
            URL.revokeObjectURL(avatarUrl);

            this.setState({
                avatarUrl: "",
            });
        }
    }
}

OrderEdit.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Properties
    user: PropTypes.object.isRequired,
    userData: PropTypes.object,

    // Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(OrderEdit);
