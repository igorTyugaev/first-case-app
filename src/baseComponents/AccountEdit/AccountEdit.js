import React, {Component} from "react";

import PropTypes from "prop-types";

import validate from "validate.js";
import moment from "moment";

import {withStyles} from "@material-ui/core/styles";

import {
    Grid,
    Typography,
    Box,
    Fade,
    CircularProgress,
    Badge,
    Avatar,
    Fab,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Hidden,
    TextField,
    Tooltip,
    IconButton,
    Divider, Container, Input,
} from "@material-ui/core";


import {
    Close as CloseIcon,
    Photo as PhotoIcon,
    CloudUpload as CloudUploadIcon,
    Person as PersonIcon,
    Description as DescriptionIcon,
    Phone as PhoneIcon,
    School as EducationIcon,
    LocationCity as CityIcon,
    CalendarToday as CalendarIcon,
    Edit as EditIcon,
    PersonOutline as PersonOutlineIcon,
    Email as EmailIcon,
    Warning as WarningIcon,
    Check as CheckIcon,
    AccessTime as AccessTimeIcon,
    DeleteForever as DeleteForeverIcon, Lock as LockIcon,
} from "@material-ui/icons";

import constraintsAuth from "../../data/constraintsAuth";
import authentication from "../../services/authentication";

import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker, KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {getTime} from "date-fns";

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
    profileCompletion: 0,
    securityRating: 0,
    showingField: "",
    avatar: null,
    avatarUrl: "",
    fullName: "",
    phoneNumber: "",
    username: "",
    dateBirth: 0,
    emailAddress: "",
    performingAction: false,
    loadingAvatar: false,
    sentVerificationEmail: false,
    errors: null,
    password: "",
    passwordConfirmation: "",
    aboutUser: "",
    position: "",
    company: "",
    city: "",
    education: "",
    experience: "",
    serviceCost: "",
};

class AccountEdit extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    getNameInitialsOrIcon = ({classes, user, userData}) => {
        if (!user) {
            return null;
        }

        if (!userData) {
            return <PersonIcon className={classes.personIcon}/>;
        }

        const nameInitials = authentication.getNameInitials({
            ...user,
            ...userData,
        });

        if (nameInitials) {
            return (
                <Typography className={classes.nameInitials} variant="h2">
                    {nameInitials}
                </Typography>
            );
        }

        return <PersonIcon className={classes.personIcon}/>;
    };

    uploadAvatar = () => {
        const {avatar} = this.state;

        if (!avatar) {
            return;
        }

        this.setState(
            {
                performingAction: true,
                loadingAvatar: true,
            },
            () => {
                authentication
                    .changeAvatar(avatar)
                    .then((value) => {
                        const {user, userData} = this.props;

                        this.setState({
                            profileCompletion: authentication.getProfileCompletion({
                                ...user,
                                ...userData,
                            }),
                        });
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
                            loadingAvatar: false,
                            avatar: null,
                            avatarUrl: "",
                        });
                    });
            }
        );
    };

    removeAvatar = () => {
        const {user} = this.props;

        const {avatar, avatarUrl} = this.state;

        if (!user.photoURL && !avatar && !avatarUrl) {
            return;
        }

        if (
            (!user.photoURL && avatar && avatarUrl) ||
            (user.photoURL && avatar && avatarUrl)
        ) {
            URL.revokeObjectURL(avatarUrl);

            this.setState({
                avatar: null,
                avatarUrl: "",
            });
        } else if (user.photoURL && !avatar && !avatarUrl) {
            this.setState(
                {
                    performingAction: true,
                    loadingAvatar: true,
                },
                () => {
                    authentication
                        .removeAvatar()
                        .then((value) => {
                            const {user, userData} = this.props;

                            this.setState({
                                profileCompletion: authentication.getProfileCompletion({
                                    ...user,
                                    ...userData,
                                }),
                            });
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
                                loadingAvatar: false,
                            });
                        });
                }
            );
        }
    };

    showField = (fieldId) => {
        if (!fieldId) {
            return;
        }

        if (fieldId === "dateBirth") {
            this.setState({
                pickerDateBirth: true
            })
        }

        this.setState({
            showingField: fieldId,
        });
    };

    hideFields = (callback) => {
        this.setState(
            {
                showingField: "",
                fullName: "",
                phoneNumber: "",
                username: "",
                dateBirth: 0,
                emailAddress: "",
                errors: null,
                pickerDateBirth: false,
                performingAction: false,
            },
            () => {
                if (callback && typeof callback === "function") {
                    callback();
                }
            }
        );
    };

    changePassword = () => {
        const {password, passwordConfirmation} = this.state;

        const errors = validate(
            {
                password: password,
                passwordConfirmation: passwordConfirmation,
            },
            {
                password: constraintsAuth.password,
                passwordConfirmation: constraintsAuth.passwordConfirmation,
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
                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        authentication
                            .changePassword(password)
                            .then(() => {
                                this.hideFields(() => {
                                    this.props.openSnackbar("Changed password");
                                });
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

    changeFullName = () => {
        const {fullName} = this.state;

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
        }

        this.setState(
            {
                errors: null,
            },
            () => {
                const {userData} = this.props;

                if (fullName === userData.fullName) {
                    return;
                }

                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        authentication
                            .changeFullName(fullName)
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

    changePhoneNumber = () => {
        const {phoneNumber} = this.state;

        const errors = validate(
            {
                phoneNumber: phoneNumber,
            },
            {
                phoneNumber: constraintsAuth.phoneNumber,
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
                const {userData} = this.props;

                if (phoneNumber === userData.phone) {
                    return;
                }

                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        authentication
                            .changePhoneNumber(phoneNumber)
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

    changeOther = (fieldId) => {
        const value = this.state[fieldId];
        const errors = constraintsAuth[fieldId] ? validate(
            {
                [fieldId]: value,
            },
            {
                [fieldId]: constraintsAuth[fieldId],
            }
        ) : (null);

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
                const {userData} = this.props;

                if ([fieldId] === userData.fullName) {
                    return;
                }

                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        authentication
                            .changeOther(value, fieldId)
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

    changeEmailAddress = () => {
        const {emailAddress} = this.state;

        const errors = validate(
            {
                emailAddress: emailAddress,
            },
            {
                emailAddress: constraintsAuth.emailAddress,
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

                if (emailAddress === user.email) {
                    return;
                }

                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        authentication
                            .changeEmailAddress(emailAddress)
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

    changeDateBirth = (dateBirth) => {
        const errors = validate(
            {
                dateBirth: dateBirth,
            },
            {
                dateBirth: constraintsAuth.dateBirth,
            }
        );

        console.log(dateBirth)

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

                if (dateBirth === user.dateBirth) {
                    return;
                }

                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        authentication
                            .changeDateBirth(dateBirth)
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

    verifyEmailAddress = () => {
        this.setState(
            {
                performingAction: true,
            },
            () => {
                authentication
                    .verifyEmailAddress()
                    .then(() => {
                        this.setState(
                            {
                                sentVerificationEmail: true,
                            },
                            () => {
                                this.props.openSnackbar("Sent verification e-mail");
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

    handleAvatarChange = (event) => {
        if (!event) {
            return;
        }

        const files = event.target.files;

        if (!files) {
            return;
        }

        const avatar = files[0];

        if (!avatar) {
            return;
        }

        const fileTypes = [
            "image/gif",
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/svg+xml",
        ];

        if (!fileTypes.includes(avatar.type)) {
            return;
        }

        if (avatar.size > 20 * 1024 * 1024) {
            return;
        }

        this.setState({
            avatar: avatar,
            avatarUrl: URL.createObjectURL(avatar),
        });
    };

    handleEmailAddressChange = (event) => {
        if (!event) {
            return;
        }

        const emailAddress = event.target.value;

        this.setState({
            emailAddress: emailAddress,
        });
    };

    handlePasswordChange = (event) => {
        if (!event) {
            return;
        }

        const password = event.target.value;

        this.setState({
            password: password,
        });
    };

    handlePasswordConfirmationChange = (event) => {
        if (!event) {
            return;
        }

        const passwordConfirmation = event.target.value;

        this.setState({
            passwordConfirmation: passwordConfirmation,
        });
    };


    changeField = (fieldId) => {
        if (!fieldId) {
            return;
        }

        switch (fieldId) {
            case "password":
                const {password} = this.state;

                const errors = validate(
                    {
                        password: password,
                    },
                    {
                        password: constraintsAuth.password,
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
                        this.showField("password-confirmation");
                    }
                );
                return;

            case "password-confirmation":
                this.changePassword();
                return;

            case "email-address":
                this.changeEmailAddress();
                return;

            case "fullName":
                this.changeFullName();
                return;

            case "phoneNumber":
                this.changePhoneNumber();
                return;

            case "aboutUser":
            case "position":
            case "company":
            case "city":
            case "education":
            case "experience":
            case "serviceCost":
                this.changeOther(fieldId);
                break;

            default:
                return;
        }
    };

    handleChange = (value, fieldId) => {
        if (!fieldId) {
            return;
        }

        if (fieldId === "dateBirths") {
            this.setState({
                [fieldId]: value.toDateString(),
            });
            this.changeDateBirth(getTime(value))
        } else {
            this.setState({
                [fieldId]: value,
            });
        }

        const errors = constraintsAuth[fieldId] ? validate(
            {
                [fieldId]: value,
            },
            {
                [fieldId]: constraintsAuth[fieldId],
            }
        ) : (null);

        if (errors) {
            this.setState({
                errors: errors,
            });

            return;
        } else {
            this.setState({
                errors: null,
            });

            return;
        }
    };

    render() {
        // Styling
        const {classes} = this.props;

        // Properties
        const {user, userData} = this.props;

        // Events
        const {onDeleteAccountClick} = this.props;

        const {
            profileCompletion,
            securityRating,
            showingField,
            performingAction,
            loadingAvatar,
            avatar,
            avatarUrl,
            fullName,
            dateBirth,
            phoneNumber,
            emailAddress,
            sentVerificationEmail,
            errors,
            password,
            passwordConfirmation,
            aboutUser,
            position,
            company,
            city,
            education,
            experience,
            serviceCost,
        } = this.state;

        const hasFullName = userData && userData.fullName;
        const hasPhoneNumber = userData && userData.phone;
        const hasDateBirth = userData && userData.dateBirth;
        const hasChangedPassword = userData && userData.lastPasswordChange;

        const hasAboutUser = userData && userData.aboutUser;
        const hasPosition = userData && userData.position;
        const hasCompany = userData && userData.company;
        const hasCity = userData && userData.city;
        const hasEducation = userData && userData.education;
        const hasExperience = userData && userData.experience;
        const hasServiceCost = userData && userData.serviceCost;

        return (
            <Container classes={{root: classes.mainContent}}>
                <Box mb={2}>
                    <Hidden xsDown>
                        <Grid alignItems="center" container>
                            <Grid item xs>
                                <Box textAlign="center">
                                    <Box mb={1.5}>
                                        {avatar && avatarUrl && (
                                            <Badge
                                                classes={{badge: classes.badge}}
                                                badgeContent={
                                                    <Tooltip title="Удалить">
                                                        <Fab
                                                            classes={{sizeSmall: classes.small}}
                                                            color="secondary"
                                                            disabled={performingAction}
                                                            size="small"
                                                            onClick={this.removeAvatar}
                                                        >
                                                            <CloseIcon fontSize="small"/>
                                                        </Fab>
                                                    </Tooltip>
                                                }
                                            >
                                                {loadingAvatar && (
                                                    <Badge
                                                        classes={{badge: classes.loadingBadge}}
                                                        badgeContent={
                                                            <Fade
                                                                style={{transitionDelay: "1s"}}
                                                                in={loadingAvatar}
                                                                unmountOnExit
                                                            >
                                                                <CircularProgress size={120} thickness={1.8}/>
                                                            </Fade>
                                                        }
                                                    >
                                                        <Avatar
                                                            className={classes.avatar}
                                                            alt="Аватар"
                                                            src={avatarUrl}
                                                        />
                                                    </Badge>
                                                )}

                                                {!loadingAvatar && (
                                                    <Avatar
                                                        className={classes.avatar}
                                                        alt="Аватар"
                                                        src={avatarUrl}
                                                    />
                                                )}
                                            </Badge>
                                        )}

                                        {!avatar && !avatarUrl && (
                                            <>
                                                {user.photoURL && (
                                                    <Badge
                                                        classes={{badge: classes.badge}}
                                                        badgeContent={
                                                            <Tooltip title="Удалить">
                                                                <Fab
                                                                    classes={{sizeSmall: classes.small}}
                                                                    color="secondary"
                                                                    disabled={performingAction}
                                                                    size="small"
                                                                    onClick={this.removeAvatar}
                                                                >
                                                                    <CloseIcon fontSize="small"/>
                                                                </Fab>
                                                            </Tooltip>
                                                        }
                                                    >
                                                        {loadingAvatar && (
                                                            <Badge
                                                                classes={{badge: classes.loadingBadge}}
                                                                badgeContent={
                                                                    <Fade
                                                                        style={{transitionDelay: "1s"}}
                                                                        in={loadingAvatar}
                                                                        unmountOnExit
                                                                    >
                                                                        <CircularProgress
                                                                            size={120}
                                                                            thickness={1.8}
                                                                        />
                                                                    </Fade>
                                                                }
                                                            >
                                                                <Avatar
                                                                    className={classes.avatar}
                                                                    alt="Аватар"
                                                                    src={user.photoURL}
                                                                />
                                                            </Badge>
                                                        )}

                                                        {!loadingAvatar && (
                                                            <Avatar
                                                                className={classes.avatar}
                                                                alt="Аватар"
                                                                src={user.photoURL}
                                                            />
                                                        )}
                                                    </Badge>
                                                )}

                                                {!user.photoURL && (
                                                    <>
                                                        {loadingAvatar && (
                                                            <Badge
                                                                classes={{badge: classes.loadingBadge}}
                                                                badgeContent={
                                                                    <Fade
                                                                        style={{transitionDelay: "1s"}}
                                                                        in={loadingAvatar}
                                                                        unmountOnExit
                                                                    >
                                                                        <CircularProgress
                                                                            size={120}
                                                                            thickness={1.8}
                                                                        />
                                                                    </Fade>
                                                                }
                                                            >
                                                                <Avatar className={classes.avatar} alt="Аватар">
                                                                    {this.getNameInitialsOrIcon(this.props)}
                                                                </Avatar>
                                                            </Badge>
                                                        )}

                                                        {!loadingAvatar && (
                                                            <Avatar className={classes.avatar} alt="Аватар">
                                                                {this.getNameInitialsOrIcon(this.props)}
                                                            </Avatar>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </Box>

                                    {avatar && avatarUrl && (
                                        <Button
                                            color="primary"
                                            disabled={performingAction}
                                            startIcon={<CloudUploadIcon/>}
                                            variant="contained"
                                            onClick={this.uploadAvatar}
                                        >
                                            Загрузить
                                        </Button>
                                    )}

                                    {!avatar && !avatarUrl && (
                                        <>
                                            <input
                                                id="avatar-input"
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={this.handleAvatarChange}
                                            />

                                            <label htmlFor="avatar-input">
                                                <Button
                                                    color="primary"
                                                    component="span"
                                                    disabled={performingAction}
                                                    startIcon={<PhotoIcon/>}
                                                    variant="contained"
                                                >
                                                    Выбрать...
                                                </Button>
                                            </label>
                                        </>
                                    )}
                                </Box>
                            </Grid>

                            <Grid item xs>
                                <Box textAlign="center">
                                    <Typography variant="body1">Заполнение профиля</Typography>

                                    {profileCompletion === 0 && (
                                        <Typography color="error" variant="h5">
                                            {profileCompletion}%
                                        </Typography>
                                    )}

                                    {profileCompletion === 100 && (
                                        <Typography color="primary" variant="h5">
                                            {profileCompletion}%
                                        </Typography>
                                    )}

                                    {profileCompletion !== 0 && profileCompletion !== 100 && (
                                        <Typography color="secondary" variant="h5">
                                            {profileCompletion}%
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>

                            <Grid item xs>
                                <Box textAlign="center">
                                    <Typography variant="body1">Рейтинг доверия</Typography>

                                    {securityRating === 0 && (
                                        <Typography color="error" variant="h5">
                                            {securityRating}%
                                        </Typography>
                                    )}

                                    {securityRating === 100 && (
                                        <Typography color="primary" variant="h5">
                                            {securityRating}%
                                        </Typography>
                                    )}

                                    {securityRating !== 0 && securityRating !== 100 && (
                                        <Typography color="secondary" variant="h5">
                                            {securityRating}%
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Hidden>

                    <Hidden smUp>
                        <Box textAlign="center" mb={3}>
                            <Box mb={1.5}>
                                {avatar && avatarUrl && (
                                    <Badge
                                        classes={{badge: classes.badge}}
                                        badgeContent={
                                            <Tooltip title="Remove">
                                                <Fab
                                                    classes={{sizeSmall: classes.small}}
                                                    color="secondary"
                                                    disabled={performingAction}
                                                    size="small"
                                                    onClick={this.removeAvatar}
                                                >
                                                    <CloseIcon fontSize="small"/>
                                                </Fab>
                                            </Tooltip>
                                        }
                                    >
                                        {loadingAvatar && (
                                            <Badge
                                                classes={{badge: classes.loadingBadge}}
                                                badgeContent={
                                                    <Fade
                                                        style={{transitionDelay: "1s"}}
                                                        in={loadingAvatar}
                                                        unmountOnExit
                                                    >
                                                        <CircularProgress size={120} thickness={1.8}/>
                                                    </Fade>
                                                }
                                            >
                                                <Avatar
                                                    className={classes.avatar}
                                                    alt="Avatar"
                                                    src={avatarUrl}
                                                />
                                            </Badge>
                                        )}

                                        {!loadingAvatar && (
                                            <Avatar
                                                className={classes.avatar}
                                                alt="Avatar"
                                                src={avatarUrl}
                                            />
                                        )}
                                    </Badge>
                                )}

                                {!avatar && !avatarUrl && (
                                    <>
                                        {user.photoURL && (
                                            <Badge
                                                classes={{badge: classes.badge}}
                                                badgeContent={
                                                    <Tooltip title="Remove">
                                                        <Fab
                                                            classes={{sizeSmall: classes.small}}
                                                            color="secondary"
                                                            disabled={performingAction}
                                                            size="small"
                                                            onClick={this.removeAvatar}
                                                        >
                                                            <CloseIcon fontSize="small"/>
                                                        </Fab>
                                                    </Tooltip>
                                                }
                                            >
                                                {loadingAvatar && (
                                                    <Badge
                                                        classes={{badge: classes.loadingBadge}}
                                                        badgeContent={
                                                            <CircularProgress size={120} thickness={1.8}/>
                                                        }
                                                    >
                                                        <Avatar
                                                            className={classes.avatar}
                                                            alt="Avatar"
                                                            src={user.photoURL}
                                                        />
                                                    </Badge>
                                                )}

                                                {!loadingAvatar && (
                                                    <Avatar
                                                        className={classes.avatar}
                                                        alt="Avatar"
                                                        src={user.photoURL}
                                                    />
                                                )}
                                            </Badge>
                                        )}

                                        {!user.photoURL && (
                                            <>
                                                {loadingAvatar && (
                                                    <Badge
                                                        classes={{badge: classes.loadingBadge}}
                                                        badgeContent={
                                                            <Fade
                                                                style={{transitionDelay: "1s"}}
                                                                in={loadingAvatar}
                                                                unmountOnExit
                                                            >
                                                                <CircularProgress size={120} thickness={1.8}/>
                                                            </Fade>
                                                        }
                                                    >
                                                        <Avatar className={classes.avatar} alt="Avatar">
                                                            {this.getNameInitialsOrIcon(this.props)}
                                                        </Avatar>
                                                    </Badge>
                                                )}

                                                {!loadingAvatar && (
                                                    <Avatar className={classes.avatar} alt="Avatar">
                                                        {this.getNameInitialsOrIcon(this.props)}
                                                    </Avatar>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </Box>

                            {avatar && avatarUrl && (
                                <Button
                                    color="primary"
                                    disabled={performingAction}
                                    startIcon={<CloudUploadIcon/>}
                                    variant="contained"
                                    onClick={this.uploadAvatar}
                                >
                                    Загрузить
                                </Button>
                            )}

                            {!avatar && !avatarUrl && (
                                <>
                                    <input
                                        id="avatar-input"
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={this.handleAvatarChange}
                                    />

                                    <label htmlFor="avatar-input">
                                        <Button
                                            color="primary"
                                            component="span"
                                            disabled={performingAction}
                                            startIcon={<PhotoIcon/>}
                                            variant="contained"
                                        >
                                            Выбирать...
                                        </Button>
                                    </label>
                                </>
                            )}
                        </Box>

                        <Grid container>
                            <Grid item xs>
                                <Box textAlign="center">
                                    <Typography variant="body1">Заполнение профиля</Typography>

                                    {profileCompletion === 0 && (
                                        <Typography color="error" variant="h5">
                                            {profileCompletion}%
                                        </Typography>
                                    )}

                                    {profileCompletion === 100 && (
                                        <Typography color="primary" variant="h5">
                                            {profileCompletion}%
                                        </Typography>
                                    )}

                                    {profileCompletion !== 0 && profileCompletion !== 100 && (
                                        <Typography color="secondary" variant="h5">
                                            {profileCompletion}%
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>

                            <Grid item xs>
                                <Box textAlign="center">
                                    <Typography variant="body1">Рейтинг доверия</Typography>

                                    {securityRating === 0 && (
                                        <Typography color="error" variant="h5">
                                            {securityRating}%
                                        </Typography>
                                    )}

                                    {securityRating === 100 && (
                                        <Typography color="primary" variant="h5">
                                            {securityRating}%
                                        </Typography>
                                    )}

                                    {securityRating !== 0 && securityRating !== 100 && (
                                        <Typography color="secondary" variant="h5">
                                            {securityRating}%
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Hidden>
                </Box>

                <List disablePadding>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                        </Hidden>

                        {!hasFullName && (
                            <ListItemIcon>
                                <Tooltip title="Нет имени">
                                    <WarningIcon color="error"/>
                                </Tooltip>
                            </ListItemIcon>
                        )}

                        {showingField === "fullName" && (
                            <TextField
                                autoComplete="fullName"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.fullName)}
                                fullWidth
                                helperText={
                                    errors && errors.fullName
                                        ? errors.fullName[0]
                                        : "Нажмите Enter, чтобы изменить ФИО"
                                }
                                label="Имя"
                                placeholder={hasFullName && userData.fullName}
                                required
                                type="text"
                                value={fullName}
                                variant="filled"
                                InputLabelProps={{required: false}}
                                onBlur={this.hideFields}
                                onKeyDown={(event) => this.handleKeyDown(event, "fullName")}
                                onChange={(e) => {
                                    this.handleChange(e.target.value, "fullName")
                                }}
                            />
                        )}

                        {showingField !== "fullName" && (
                            <>
                                <ListItemText
                                    primary="ФИО"
                                    secondary={
                                        hasFullName
                                            ? userData.fullName
                                            : "Вы не указали ФИО"
                                    }
                                />

                                <ListItemSecondaryAction>
                                    {hasFullName && (
                                        <Tooltip title="Редактировать">
                                            <div>
                                                <IconButton
                                                    disabled={performingAction}
                                                    onClick={() => this.showField("fullName")}
                                                >
                                                    <EditIcon/>
                                                </IconButton>
                                            </div>
                                        </Tooltip>
                                    )}

                                    {!hasFullName && (
                                        <Button
                                            color="primary"
                                            disabled={performingAction}
                                            variant="contained"
                                            onClick={() => this.showField("fullName")}
                                        >
                                            Добавить
                                        </Button>
                                    )}
                                </ListItemSecondaryAction>
                            </>
                        )}
                    </ListItem>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <PhoneIcon/>
                            </ListItemIcon>
                        </Hidden>

                        {!hasPhoneNumber && (
                            <ListItemIcon>
                                <Tooltip title="Не указан телефон">
                                    <WarningIcon color="error"/>
                                </Tooltip>
                            </ListItemIcon>
                        )}

                        {showingField === "phoneNumber" && (
                            <TextField
                                autoComplete="phoneNumber"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.phoneNumber)}
                                fullWidth
                                helperText={
                                    errors && errors.phoneNumber
                                        ? errors.phoneNumber[0]
                                        : "Нажмите Enter, чтобы изменить телефон"
                                }
                                label="Телефон"
                                placeholder={hasPhoneNumber && userData.phone}
                                required
                                type="number"
                                value={phoneNumber}
                                variant="filled"
                                InputLabelProps={{required: false}}
                                onBlur={this.hideFields}
                                onKeyDown={(event) => this.handleKeyDown(event, "phoneNumber")}
                                onInput={(e) => {
                                    e.target.value && (e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 11))
                                }}
                                onChange={(e) => {
                                    this.handleChange(e.target.value, "phoneNumber")
                                }}
                            />
                        )}

                        {showingField !== "phoneNumber" && (
                            <>
                                <ListItemText
                                    primary="Телефон"
                                    secondary={
                                        hasPhoneNumber
                                            ? userData.phone
                                            : "Вы не указали ваш телефон"
                                    }
                                />

                                <ListItemSecondaryAction>
                                    {hasPhoneNumber && (
                                        <Tooltip title="Редактировать">
                                            <div>
                                                <IconButton
                                                    disabled={performingAction}
                                                    onClick={() => this.showField("phoneNumber")}
                                                >
                                                    <EditIcon/>
                                                </IconButton>
                                            </div>
                                        </Tooltip>
                                    )}

                                    {!hasPhoneNumber && (
                                        <Button
                                            color="primary"
                                            disabled={performingAction}
                                            variant="contained"
                                            onClick={() => this.showField("phoneNumber")}
                                        >
                                            Добавить
                                        </Button>
                                    )}
                                </ListItemSecondaryAction>
                            </>
                        )}
                    </ListItem>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <CalendarIcon/>
                            </ListItemIcon>
                        </Hidden>

                        {!hasDateBirth && (
                            <ListItemIcon>
                                <Tooltip title="Не указана дата рождения">
                                    <WarningIcon color="error"/>
                                </Tooltip>
                            </ListItemIcon>
                        )}

                        {showingField === "dateBirth" && (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker value={dateBirth}
                                            onClick={() => this.setState({
                                                pickerDateBirth: true
                                            })}
                                            onClose={() => this.setState({
                                                performingAction: false,
                                                pickerDateBirth: false,
                                                showingField: null,
                                            })}
                                            open={this.state.pickerDateBirth}
                                            value={this.state.dateBirth}
                                            onChange={(date) => {
                                                this.handleChange(date, "dateBirths")
                                            }}
                                />
                            </MuiPickersUtilsProvider>
                        )}

                        {showingField !== "dateBirth" && (
                            <>
                                <ListItemText
                                    primary="Дата рождения"
                                    secondary={
                                        hasDateBirth
                                            ? (new Date(userData.dateBirth).toDateString())
                                            : "Вы не указали дату рождения"
                                    }
                                />

                                <ListItemSecondaryAction>
                                    {hasDateBirth && (
                                        <Tooltip title="Редактировать">
                                            <div>
                                                <IconButton
                                                    disabled={performingAction}
                                                    onClick={() => this.showField("dateBirth")}
                                                >
                                                    <EditIcon/>
                                                </IconButton>
                                            </div>
                                        </Tooltip>
                                    )}

                                    {!hasDateBirth && (
                                        <Button
                                            color="primary"
                                            disabled={performingAction}
                                            variant="contained"
                                            onClick={() => this.showField("dateBirth")}
                                        >
                                            Добавить
                                        </Button>
                                    )}
                                </ListItemSecondaryAction>
                            </>
                        )}
                    </ListItem>

                    <Box mt={1} mb={1}>
                        <Divider light/>
                    </Box>

                    {(userData.role && (userData.role.toLowerCase() === "student" || userData.role.toLowerCase() === "mentor")) && (
                        <ListItem>
                            <Hidden xsDown>
                                <ListItemIcon>
                                    <DescriptionIcon/>
                                </ListItemIcon>
                            </Hidden>

                            {!hasAboutUser && (
                                <ListItemIcon>
                                    <Tooltip title="Нет информации">
                                        <WarningIcon color="error"/>
                                    </Tooltip>
                                </ListItemIcon>
                            )}

                            {showingField === "aboutUser" && (
                                <TextField
                                    autoComplete="aboutUser"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.aboutUser)}
                                    fullWidth
                                    helperText={
                                        errors && errors.aboutUser
                                            ? errors.aboutUser[0]
                                            : "Нажмите Enter, чтобы сохранить изменения"
                                    }
                                    label="О себе"
                                    placeholder={hasAboutUser && userData.aboutUser}
                                    required
                                    type="text"
                                    value={aboutUser}
                                    variant="filled"
                                    InputLabelProps={{required: false}}
                                    onBlur={this.hideFields}
                                    onKeyDown={(event) => this.handleKeyDown(event, "aboutUser")}
                                    onChange={(e) => {
                                        this.handleChange(e.target.value, "aboutUser")
                                    }}
                                />
                            )}

                            {showingField !== "aboutUser" && (
                                <>
                                    <ListItemText
                                        primary="О себе"
                                        secondary={
                                            hasAboutUser
                                                ? userData.aboutUser
                                                : "Вы не рассказали о себе"
                                        }
                                    />

                                    <ListItemSecondaryAction>
                                        {hasAboutUser && (
                                            <Tooltip title="Редактировать">
                                                <div>
                                                    <IconButton
                                                        disabled={performingAction}
                                                        onClick={() => this.showField("aboutUser")}
                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        )}

                                        {!hasAboutUser && (
                                            <Button
                                                color="primary"
                                                disabled={performingAction}
                                                variant="contained"
                                                onClick={() => this.showField("aboutUser")}
                                            >
                                                Добавить
                                            </Button>
                                        )}
                                    </ListItemSecondaryAction>
                                </>
                            )}
                        </ListItem>
                    )}

                    {(userData.role && (userData.role.toLowerCase() === "customer")) && (
                        <ListItem>
                            <Hidden xsDown>
                                <ListItemIcon>
                                    <DescriptionIcon/>
                                </ListItemIcon>
                            </Hidden>

                            {!hasPosition && (
                                <ListItemIcon>
                                    <Tooltip title="Нет информации">
                                        <WarningIcon color="error"/>
                                    </Tooltip>
                                </ListItemIcon>
                            )}

                            {showingField === "position" && (
                                <TextField
                                    autoComplete="position"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.position)}
                                    fullWidth
                                    helperText={
                                        errors && errors.position
                                            ? errors.position[0]
                                            : "Нажмите Enter, чтобы сохранить изменения"
                                    }
                                    label="Должность"
                                    placeholder={hasPosition && userData.position}
                                    required
                                    type="text"
                                    value={position}
                                    variant="filled"
                                    InputLabelProps={{required: false}}
                                    onBlur={this.hideFields}
                                    onKeyDown={(event) => this.handleKeyDown(event, "position")}
                                    onChange={(e) => {
                                        this.handleChange(e.target.value, "position")
                                    }}
                                />
                            )}

                            {showingField !== "position" && (
                                <>
                                    <ListItemText
                                        primary="Должность"
                                        secondary={
                                            hasPosition
                                                ? userData.position
                                                : "Вы не указали должность"
                                        }
                                    />

                                    <ListItemSecondaryAction>
                                        {hasPosition && (
                                            <Tooltip title="Редактировать">
                                                <div>
                                                    <IconButton
                                                        disabled={performingAction}
                                                        onClick={() => this.showField("position")}
                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        )}

                                        {!hasPosition && (
                                            <Button
                                                color="primary"
                                                disabled={performingAction}
                                                variant="contained"
                                                onClick={() => this.showField("position")}
                                            >
                                                Добавить
                                            </Button>
                                        )}
                                    </ListItemSecondaryAction>
                                </>
                            )}
                        </ListItem>
                    )}

                    {(userData.role && (userData.role.toLowerCase() === "customer")) && (
                        <ListItem>
                            <Hidden xsDown>
                                <ListItemIcon>
                                    <DescriptionIcon/>
                                </ListItemIcon>
                            </Hidden>

                            {!hasCompany && (
                                <ListItemIcon>
                                    <Tooltip title="Нет информации">
                                        <WarningIcon color="error"/>
                                    </Tooltip>
                                </ListItemIcon>
                            )}

                            {showingField === "company" && (
                                <TextField
                                    autoComplete="company"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.company)}
                                    fullWidth
                                    helperText={
                                        errors && errors.company
                                            ? errors.company[0]
                                            : "Нажмите Enter, чтобы сохранить изменения"
                                    }
                                    label="Организация"
                                    placeholder={hasCompany && userData.company}
                                    required
                                    type="text"
                                    value={company}
                                    variant="filled"
                                    InputLabelProps={{required: false}}
                                    onBlur={this.hideFields}
                                    onKeyDown={(event) => this.handleKeyDown(event, "company")}
                                    onChange={(e) => {
                                        this.handleChange(e.target.value, "company")
                                    }}
                                />
                            )}

                            {showingField !== "company" && (
                                <>
                                    <ListItemText
                                        primary="Организация"
                                        secondary={
                                            hasCompany
                                                ? userData.company
                                                : "Вы не указали организацию"
                                        }
                                    />

                                    <ListItemSecondaryAction>
                                        {hasCompany && (
                                            <Tooltip title="Редактировать">
                                                <div>
                                                    <IconButton
                                                        disabled={performingAction}
                                                        onClick={() => this.showField("company")}
                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        )}

                                        {!hasCompany && (
                                            <Button
                                                color="primary"
                                                disabled={performingAction}
                                                variant="contained"
                                                onClick={() => this.showField("company")}
                                            >
                                                Добавить
                                            </Button>
                                        )}
                                    </ListItemSecondaryAction>
                                </>
                            )}
                        </ListItem>
                    )}

                    {(userData.role && (userData.role.toLowerCase() === "customer")) && (
                        <ListItem>
                            <Hidden xsDown>
                                <ListItemIcon>
                                    <CityIcon/>
                                </ListItemIcon>
                            </Hidden>

                            {!hasCity && (
                                <ListItemIcon>
                                    <Tooltip title="Нет информации">
                                        <WarningIcon color="error"/>
                                    </Tooltip>
                                </ListItemIcon>
                            )}

                            {showingField === "city" && (
                                <TextField
                                    autoComplete="city"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.city)}
                                    fullWidth
                                    helperText={
                                        errors && errors.city
                                            ? errors.city[0]
                                            : "Нажмите Enter, чтобы сохранить изменения"
                                    }
                                    label="Город"
                                    placeholder={hasCity && userData.city}
                                    required
                                    type="text"
                                    value={city}
                                    variant="filled"
                                    InputLabelProps={{required: false}}
                                    onBlur={this.hideFields}
                                    onKeyDown={(event) => this.handleKeyDown(event, "city")}
                                    onChange={(e) => {
                                        this.handleChange(e.target.value, "city")
                                    }}
                                />
                            )}

                            {showingField !== "city" && (
                                <>
                                    <ListItemText
                                        primary="Город"
                                        secondary={
                                            hasCity
                                                ? userData.city
                                                : "Вы не указали город"
                                        }
                                    />

                                    <ListItemSecondaryAction>
                                        {hasCity && (
                                            <Tooltip title="Редактировать">
                                                <div>
                                                    <IconButton
                                                        disabled={performingAction}
                                                        onClick={() => this.showField("city")}
                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        )}

                                        {!hasCity && (
                                            <Button
                                                color="primary"
                                                disabled={performingAction}
                                                variant="contained"
                                                onClick={() => this.showField("city")}
                                            >
                                                Добавить
                                            </Button>
                                        )}
                                    </ListItemSecondaryAction>
                                </>
                            )}
                        </ListItem>
                    )}

                    {(userData.role && (userData.role.toLowerCase() === "student" || userData.role.toLowerCase() === "mentor")) && (
                        <ListItem>
                            <Hidden xsDown>
                                <ListItemIcon>
                                    <EducationIcon/>
                                </ListItemIcon>
                            </Hidden>

                            {!hasEducation && (
                                <ListItemIcon>
                                    <Tooltip title="Нет информации">
                                        <WarningIcon color="error"/>
                                    </Tooltip>
                                </ListItemIcon>
                            )}

                            {showingField === "education" && (
                                <TextField
                                    autoComplete="education"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.education)}
                                    fullWidth
                                    helperText={
                                        errors && errors.education
                                            ? errors.education[0]
                                            : "Нажмите Enter, чтобы сохранить изменения"
                                    }
                                    label="Образование"
                                    placeholder={hasEducation && userData.education}
                                    required
                                    type="text"
                                    value={education}
                                    variant="filled"
                                    InputLabelProps={{required: false}}
                                    onBlur={this.hideFields}
                                    onKeyDown={(event) => this.handleKeyDown(event, "education")}
                                    onChange={(e) => {
                                        this.handleChange(e.target.value, "education")
                                    }}
                                />
                            )}

                            {showingField !== "education" && (
                                <>
                                    <ListItemText
                                        primary="Образование"
                                        secondary={
                                            hasEducation
                                                ? userData.education
                                                : "Вы не указали образование"
                                        }
                                    />

                                    <ListItemSecondaryAction>
                                        {hasEducation && (
                                            <Tooltip title="Редактировать">
                                                <div>
                                                    <IconButton
                                                        disabled={performingAction}
                                                        onClick={() => this.showField("education")}
                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        )}

                                        {!hasEducation && (
                                            <Button
                                                color="primary"
                                                disabled={performingAction}
                                                variant="contained"
                                                onClick={() => this.showField("education")}
                                            >
                                                Добавить
                                            </Button>
                                        )}
                                    </ListItemSecondaryAction>
                                </>
                            )}
                        </ListItem>
                    )}

                    {(userData.role && (userData.role.toLowerCase() === "student" || userData.role.toLowerCase() === "mentor")) && (
                        <ListItem>
                            <Hidden xsDown>
                                <ListItemIcon>
                                    <DescriptionIcon/>
                                </ListItemIcon>
                            </Hidden>

                            {!hasExperience && (
                                <ListItemIcon>
                                    <Tooltip title="Нет информации">
                                        <WarningIcon color="error"/>
                                    </Tooltip>
                                </ListItemIcon>
                            )}

                            {showingField === "experience" && (
                                <TextField
                                    autoComplete="experience"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.experience)}
                                    fullWidth
                                    helperText={
                                        errors && errors.experience
                                            ? errors.experience[0]
                                            : "Нажмите Enter, чтобы сохранить изменения"
                                    }
                                    label="Опыт"
                                    placeholder={hasExperience && userData.experience}
                                    required
                                    type="text"
                                    value={experience}
                                    variant="filled"
                                    InputLabelProps={{required: false}}
                                    onBlur={this.hideFields}
                                    onKeyDown={(event) => this.handleKeyDown(event, "experience")}
                                    onChange={(e) => {
                                        this.handleChange(e.target.value, "experience")
                                    }}
                                />
                            )}

                            {showingField !== "experience" && (
                                <>
                                    <ListItemText
                                        primary="Опыт"
                                        secondary={
                                            hasExperience
                                                ? userData.experience
                                                : "Вы не указали ваш опыт"
                                        }
                                    />

                                    <ListItemSecondaryAction>
                                        {hasExperience && (
                                            <Tooltip title="Редактировать">
                                                <div>
                                                    <IconButton
                                                        disabled={performingAction}
                                                        onClick={() => this.showField("experience")}
                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        )}

                                        {!hasExperience && (
                                            <Button
                                                color="primary"
                                                disabled={performingAction}
                                                variant="contained"
                                                onClick={() => this.showField("experience")}
                                            >
                                                Добавить
                                            </Button>
                                        )}
                                    </ListItemSecondaryAction>
                                </>
                            )}
                        </ListItem>
                    )}

                    {(userData.role.toLowerCase() === "mentor") && (
                        <ListItem>
                            <Hidden xsDown>
                                <ListItemIcon>
                                    <DescriptionIcon/>
                                </ListItemIcon>
                            </Hidden>

                            {!hasServiceCost && (
                                <ListItemIcon>
                                    <Tooltip title="Нет информации">
                                        <WarningIcon color="error"/>
                                    </Tooltip>
                                </ListItemIcon>
                            )}

                            {showingField === "serviceCost" && (
                                <TextField
                                    autoComplete="serviceCost"
                                    autoFocus
                                    disabled={performingAction}
                                    error={!!(errors && errors.serviceCost)}
                                    fullWidth
                                    multiline
                                    helperText={
                                        errors && errors.serviceCost
                                            ? errors.serviceCost[0]
                                            : "Нажмите Enter, чтобы сохранить изменения"
                                    }
                                    label="Стоимость услуг"
                                    placeholder={hasServiceCost && userData.serviceCost}
                                    required
                                    type="text"
                                    value={serviceCost}
                                    variant="filled"
                                    InputLabelProps={{required: false}}
                                    onBlur={this.hideFields}
                                    onKeyDown={(event) => this.handleKeyDown(event, "serviceCost")}
                                    onChange={(e) => {
                                        this.handleChange(e.target.value, "serviceCost")
                                    }}
                                />
                            )}

                            {showingField !== "serviceCost" && (
                                <>
                                    <ListItemText
                                        primary="Стоимость услуг"
                                        secondary={
                                            hasServiceCost
                                                ? userData.serviceCost
                                                : "Вы не указали cтоимость услуг"
                                        }
                                    />

                                    <ListItemSecondaryAction>
                                        {hasServiceCost && (
                                            <Tooltip title="Редактировать">
                                                <div>
                                                    <IconButton
                                                        disabled={performingAction}
                                                        onClick={() => this.showField("serviceCost")}
                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        )}

                                        {!hasServiceCost && (
                                            <Button
                                                color="primary"
                                                disabled={performingAction}
                                                variant="contained"
                                                onClick={() => this.showField("serviceCost")}
                                            >
                                                Добавить
                                            </Button>
                                        )}
                                    </ListItemSecondaryAction>
                                </>
                            )}
                        </ListItem>
                    )}

                    <Box mt={1} mb={1}>
                        <Divider light/>
                    </Box>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <EmailIcon/>
                            </ListItemIcon>
                        </Hidden>

                        {user.email && (
                            <ListItemIcon>
                                <>
                                    {user.emailVerified && (
                                        <Tooltip title="Подтверждено">
                                            <CheckIcon color="primary"/>
                                        </Tooltip>
                                    )}

                                    {!user.emailVerified && (
                                        <Tooltip title="Не подтверждено">
                                            <WarningIcon color="error"/>
                                        </Tooltip>
                                    )}
                                </>
                            </ListItemIcon>
                        )}

                        {!user.email && (
                            <ListItemIcon>
                                <Tooltip title="Нет адреса эл. почты">
                                    <WarningIcon color="error"/>
                                </Tooltip>
                            </ListItemIcon>
                        )}

                        {showingField === "email-address" && (
                            <TextField
                                autoComplete="email"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.emailAddress)}
                                fullWidth
                                helperText={
                                    errors && errors.emailAddress
                                        ? errors.emailAddress[0]
                                        : "Нажмите Enter, чтобы изменить свой адрес эл. почты."
                                }
                                label="E-mail address"
                                placeholder={user.email}
                                required
                                type="email"
                                value={emailAddress}
                                variant="filled"
                                InputLabelProps={{required: false}}
                                onBlur={this.hideFields}
                                onKeyDown={(event) =>
                                    this.handleKeyDown(event, "email-address")
                                }
                                onChange={this.handleEmailAddressChange}
                            />
                        )}

                        {showingField !== "email-address" && (
                            <>
                                <ListItemText
                                    primary="Эл. почта"
                                    secondary={
                                        user.email ? user.email : "У вас нет адреса эл. почты"
                                    }
                                />

                                {user.email && !user.emailVerified && (
                                    <Box clone mr={7}>
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Verify">
                                                <div>
                                                    <IconButton
                                                        color="secondary"
                                                        disabled={performingAction || sentVerificationEmail}
                                                        onClick={this.verifyEmailAddress}
                                                    >
                                                        <CheckIcon/>
                                                    </IconButton>
                                                </div>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </Box>
                                )}

                                <ListItemSecondaryAction>
                                    {user.email && (
                                        <Tooltip title="Редактировать">
                                            <div>
                                                <IconButton
                                                    disabled={performingAction}
                                                    onClick={() => this.showField("email-address")}
                                                >
                                                    <EditIcon/>
                                                </IconButton>
                                            </div>
                                        </Tooltip>
                                    )}

                                    {!user.email && (
                                        <Button
                                            color="primary"
                                            disabled={performingAction}
                                            variant="contained"
                                            onClick={() => this.showField("email-address")}
                                        >
                                            Add
                                        </Button>
                                    )}
                                </ListItemSecondaryAction>
                            </>
                        )}
                    </ListItem>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <LockIcon/>
                            </ListItemIcon>
                        </Hidden>

                        {showingField === "password" && (
                            <TextField
                                autoComplete="new-password"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.password)}
                                fullWidth
                                helperText={
                                    errors && errors.password
                                        ? errors.password[0]
                                        : "Нажмите Enter, чтобы изменить пароль"
                                }
                                label="Пароль"
                                required
                                type="password"
                                value={password}
                                variant="filled"
                                InputLabelProps={{required: false}}
                                onBlur={this.hideFields}
                                onKeyDown={(event) => this.handleKeyDown(event, "password")}
                                onChange={this.handlePasswordChange}
                            />
                        )}

                        {showingField === "password-confirmation" && (
                            <TextField
                                autoComplete="new-password"
                                autoFocus
                                disabled={performingAction}
                                error={!!(errors && errors.passwordConfirmation)}
                                fullWidth
                                helperText={
                                    errors && errors.passwordConfirmation
                                        ? errors.passwordConfirmation[0]
                                        : "Нажмите Enter, чтобы изменить пароль"
                                }
                                label="Подтверждение пароля"
                                required
                                type="password"
                                value={passwordConfirmation}
                                variant="filled"
                                InputLabelProps={{required: false}}
                                onBlur={this.hideFields}
                                onKeyDown={(event) =>
                                    this.handleKeyDown(event, "password-confirmation")
                                }
                                onChange={this.handlePasswordConfirmationChange}
                            />
                        )}

                        {showingField !== "password" &&
                        showingField !== "password-confirmation" && (
                            <>
                                <Hidden xsDown>
                                    <ListItemText
                                        primary="Пароль"
                                        secondary={
                                            hasChangedPassword
                                                ? `Последнее изменение ${moment(
                                                userData.lastPasswordChange.toDate()
                                                ).format("LL")}`
                                                : "Никогда не менялся"
                                        }
                                    />
                                </Hidden>

                                <Hidden smUp>
                                    <ListItemText
                                        primary="Пароль"
                                        secondary={
                                            hasChangedPassword
                                                ? `Последнее изменение ${moment(
                                                userData.lastPasswordChange.toDate()
                                                ).format("ll")}`
                                                : "Никогда не изменялся"
                                        }
                                    />
                                </Hidden>

                                <ListItemSecondaryAction>
                                    <Tooltip title="Редактировать">
                                        <div>
                                            <IconButton
                                                disabled={performingAction}
                                                onClick={() => this.showField("password")}
                                            >
                                                <EditIcon/>
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </>
                        )}
                    </ListItem>

                    <Box mt={1} mb={1}>
                        <Divider light/>
                    </Box>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <AccessTimeIcon/>
                            </ListItemIcon>
                        </Hidden>

                        <Hidden xsDown>
                            <ListItemText
                                primary="Активная сессия"
                                secondary={moment(user.metadata.lastSignInTime).format("LLLL")}
                            />
                        </Hidden>

                        <Hidden smUp>
                            <ListItemText
                                primary="Вход"
                                secondary={moment(user.metadata.lastSignInTime).format("llll")}
                            />
                        </Hidden>
                    </ListItem>

                    <Box mt={1} mb={1}>
                        <Divider light/>
                    </Box>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <DeleteForeverIcon/>
                            </ListItemIcon>
                        </Hidden>

                        <ListItemText
                            primary="Удалить аккаунт"
                            secondary="Аккаунт невозможно будет восстановить"
                        />

                        <ListItemSecondaryAction>
                            <Button
                                color="secondary"
                                disabled={performingAction}
                                variant="contained"
                                onClick={onDeleteAccountClick}
                            >
                                Удалить
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Container>
        );
    }

    componentDidMount() {
        const {user, userData} = this.props;

        this.setState({
            profileCompletion: authentication.getProfileCompletion({
                ...user,
                ...userData,
            }),
            securityRating: authentication.getSecurityRating(user, userData),
        });
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

AccountEdit.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Properties
    user: PropTypes.object.isRequired,
    userData: PropTypes.object,

    // Functions
    openSnackbar: PropTypes.func.isRequired,

    // Events
    onDeleteAccountClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AccountEdit);
