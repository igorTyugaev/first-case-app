import React, {Component} from "react";

import PropTypes from "prop-types";
import validate from "validate.js";

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
    Divider, Container,
} from "@material-ui/core";

import {
    Person as PersonIcon,
    Edit as EditIcon,
    PersonOutline as PersonOutlineIcon,
    Warning as WarningIcon,
} from "@material-ui/icons";

import constraints from "../../data/constraints";
import authentication from "../../services/authentication";
import UserAboutBody from "../../components/UserAboutBody/UserAboutBody";
import GridItem from "../../components/Grid/GridItem";

const styles = (theme) => ({
    dialogContent: {
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
    firstName: "",
    lastName: "",
    username: "",
    emailAddress: "",
    performingAction: false,
    loadingAvatar: false,
    sentVerificationEmail: false,
    errors: null,
    password: "",
    passwordConfirmation: "",
};

class AccountView extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    getNameInitialsOrIcon = () => {
        const {user} = this.props;

        if (!user) {
            return null;
        }

        const {classes, userData} = this.props;

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

        this.setState({
            showingField: fieldId,
        });
    };

    hideFields = (callback) => {
        this.setState(
            {
                showingField: "",
                firstName: "",
                lastName: "",
                username: "",
                emailAddress: "",
                errors: null,
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
                password: constraints.password,
                passwordConfirmation: constraints.passwordConfirmation,
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

    changeFirstName = () => {
        const {firstName} = this.state;

        const errors = validate(
            {
                firstName: firstName,
            },
            {
                firstName: constraints.firstName,
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

                if (firstName === userData.firstName) {
                    return;
                }

                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        authentication
                            .changeFirstName(firstName)
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

    changeLastName = () => {
        const {lastName} = this.state;

        const errors = validate(
            {
                lastName: lastName,
            },
            {
                lastName: constraints.lastName,
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

                if (lastName === userData.lastName) {
                    return;
                }

                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        authentication
                            .changeLastName(lastName)
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

    changeUsername = () => {
        const {username} = this.state;

        const errors = validate(
            {
                username: username,
            },
            {
                username: constraints.username,
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

                if (username === userData.username) {
                    return;
                }

                this.setState(
                    {
                        performingAction: true,
                    },
                    () => {
                        authentication
                            .changeUsername(username)
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
                emailAddress: constraints.emailAddress,
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

    changeField = (fieldId) => {
        switch (fieldId) {
            case "first-name":
                this.changeFirstName();
                return;

            case "last-name":
                this.changeLastName();
                return;

            case "username":
                this.changeUsername();
                return;

            case "email-address":
                this.changeEmailAddress();
                return;

            default:
                return;
        }
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

    handleFirstNameChange = (event) => {
        if (!event) {
            return;
        }

        const firstName = event.target.value;

        this.setState({
            firstName: firstName,
        });
    };

    handleLastNameChange = (event) => {
        if (!event) {
            return;
        }

        const lastName = event.target.value;

        this.setState({
            lastName: lastName,
        });
    };

    handleUsernameChange = (event) => {
        if (!event) {
            return;
        }

        const username = event.target.value;

        this.setState({
            username: username,
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

    render() {
        // Styling
        const {classes} = this.props;

        // Properties
        const {user, userData} = this.props;

        const {
            profileCompletion,
            securityRating,
            showingField,
            performingAction,
            loadingAvatar,
            avatar,
            avatarUrl,
            firstName,
            lastName,
            username,
            errors,
        } = this.state;

        const hasFirstName = userData && userData.firstName;
        const hasLastName = userData && userData.lastName;
        const hasUsername = userData && userData.username;

        const isMentor = user?.roles?.includes('mentor');
        const isCustomer = user?.roles?.includes('customer');
        const isStudent = user?.roles?.includes('student');

        return (
            <Container classes={{root: classes.dialogContent}}>
                <Box mb={2}>
                    <Hidden xsDown>
                        <Grid container direction="column" justify="space-between">
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <Grid container direction="column" alignItems="center">
                                    <Box textAlign="center">
                                        <Box mb={1.5}>
                                            {avatar && avatarUrl && (
                                                <Badge
                                                    classes={{badge: classes.badge}}>
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
                                                        <Badge classes={{badge: classes.badge}}>
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
                                                                        {this.getNameInitialsOrIcon()}
                                                                    </Avatar>
                                                                </Badge>
                                                            )}

                                                            {!loadingAvatar && (
                                                                <Avatar className={classes.avatar} alt="Аватар">
                                                                    {this.getNameInitialsOrIcon()}
                                                                </Avatar>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </Box>
                                    </Box>

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
                        </Grid>

                    </Hidden>

                    <Hidden smUp>
                        <Box textAlign="center" mb={3}>
                            <Box mb={1.5}>
                                {avatar && avatarUrl && (
                                    <div>
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
                                    </div>
                                )}

                                {!avatar && !avatarUrl && (
                                    <>
                                        {user.photoURL && (
                                            <div>
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
                                            </div>
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
                                                            {this.getNameInitialsOrIcon()}
                                                        </Avatar>
                                                    </Badge>
                                                )}

                                                {!loadingAvatar && (
                                                    <Avatar className={classes.avatar} alt="Аватар">
                                                        {this.getNameInitialsOrIcon()}
                                                    </Avatar>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </Box>
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

                <Box mt={1} mb={1}>
                    <Divider light/>
                </Box>

                <Box>
                    <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                        О себе
                    </Typography>
                    <div className={classes.description}>
                        <p>
                            {user.about}
                        </p>
                    </div>

                    <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                        Роль
                    </Typography>
                    <div className={classes.description}>
                        <p>
                            {isMentor && "Ментор"}
                            {isCustomer && "Заказчик"}
                            {isStudent && "Студент"}
                        </p>
                    </div>                    

                    <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                        Образование
                    </Typography>
                    <div className={classes.description}>
                        <ul>
                            <li>
                                {user.education}
                            </li>
                        </ul>
                    </div>

                    <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                        Опыт
                    </Typography>
                    <div className={classes.description}>
                        <ul>
                            <li>Репетиторская деятельностьс 1995 г. (26 лет)</li>
                            <li>Педагогический стаж (преподавал английский язык на филфаке МГУ; курсы английского языка,
                                курсы IELTS и TOEFL, GRE, GMAT)с 1998 г. (23 года)
                            </li>
                            <li>На сервисе с февраля 2011 г. (10 лет)</li>
                        </ul>
                    </div>

                    <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                        Услуги и цены
                    </Typography>
                    <div className={classes.description}>
                        <ul>
                            <li> Английский язык 2000 ₽ / 60 мин.</li>
                            <li> IELTS 2000 ₽ / 60 мин.</li>
                            <li> TOEFL 2000 ₽ / 60 мин.</li>
                            <li> Международные экзамены по английскому 2000 ₽ / 60 мин.</li>
                            <li> Разговорный английский язык 2000 ₽ / 60 мин.</li>
                        </ul>
                    </div>
                </Box>
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

AccountView.propTypes = {
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

export default withStyles(styles)(AccountView);
