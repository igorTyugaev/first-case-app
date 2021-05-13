import React, {Component} from "react";

import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

import {
    Grid,
    Typography,
    Box,
    Fade,
    CircularProgress,
    Badge,
    Avatar,
    Hidden,
    Divider, Container, Link,
} from "@material-ui/core";

import {
    Person as PersonIcon,
} from "@material-ui/icons";

import authentication from "../../services/authentication";
import ChipsArray from "../ChipsArray/ChipsArray";

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
    avatar: null,
    avatarUrl: "",
    loadingAvatar: false,
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

    render() {
        // Styling
        const {classes} = this.props;

        // Properties
        const {user, userData} = this.props;

        const {
            profileCompletion,
            securityRating,
            loadingAvatar,
            avatar,
            avatarUrl,
        } = this.state;

        const dateBirthYear = new Date(userData.dateBirth).getFullYear().valueOf();
        const currentYear = new Date().getFullYear().valueOf();
        const yearOld = currentYear - dateBirthYear;

        return (
            <Container classes={{root: classes.dialogContent}}>
                <Box mb={2}>
                    <Hidden xsDown>
                        <Grid container direction="row" justify="space-between">
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

                            <Grid item xs={9} sm={9} md={9} lg={9}>

                                <Box mt={1} mb={1}>
                                    <Divider light/>
                                </Box>
                                <Box textAlign="left">
                                    <Typography variant="body1">
                                        {"Телефон: "}
                                        {(userData.phone) ? (
                                            <Link color="inherit" href={`tel:${userData.phone}`}>
                                                {userData.phone}
                                            </Link>
                                        ) : ("не указан")}
                                    </Typography>
                                </Box>

                                <Box mt={1} mb={1}>
                                    <Divider light/>
                                </Box>

                                <Box textAlign="left">
                                    <Typography variant="body1">
                                        {"Email: "}
                                        {(user.email) ? (
                                            <Link color="inherit" href={`mailto:${user.email}`}>
                                                {user.email}
                                            </Link>
                                        ) : ("не указан")}
                                    </Typography>
                                </Box>

                                <Box mt={1} mb={1}>
                                    <Divider light/>
                                </Box>

                                <Box textAlign="left">
                                    <Typography variant="body1">
                                        {"Возраст: "}
                                        {(userData.dateBirth) ? (
                                            yearOld
                                        ) : ("не указан")}
                                        {((yearOld % 10) in [2, 3, 4]) ? " года" : " лет"}
                                    </Typography>
                                </Box>

                                <Box mt={1} mb={1}>
                                    <Divider light/>
                                </Box>

                                <Box textAlign="left">
                                    <Typography variant="body1">Интересы:</Typography>
                                    <ChipsArray/>
                                </Box>
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

                        <Grid container direction="column" justify="space-between">
                            <Grid item xs>

                                <Box mt={1} mb={1}>
                                    <Divider light/>
                                </Box>
                                <Box textAlign="left">
                                    <Typography variant="body1">
                                        {"Телефон: "}
                                        {(userData.phone) ? (
                                            <Link color="inherit" href={`tel:${userData.phone}`}>
                                                {userData.phone}
                                            </Link>
                                        ) : ("не указан")}
                                    </Typography>
                                </Box>

                                <Box mt={1} mb={1}>
                                    <Divider light/>
                                </Box>

                                <Box textAlign="left">
                                    <Typography variant="body1">
                                        {"Email: "}
                                        {(user.email) ? (
                                            <Link color="inherit" href={`mailto:${user.email}`}>
                                                {user.email}
                                            </Link>
                                        ) : ("не указан")}
                                    </Typography>
                                </Box>

                                <Box mt={1} mb={1}>
                                    <Divider light/>
                                </Box>

                                <Box textAlign="left">
                                    <Typography variant="body1">
                                        {"Возраст: "}
                                        {(userData.dateBirth) ? (
                                            yearOld
                                        ) : ("не указан")}
                                        {((yearOld % 10) in [2, 3, 4]) ? " года" : " лет"}
                                    </Typography>
                                </Box>

                                <Box mt={1} mb={1}>
                                    <Divider light/>
                                </Box>

                                <Box textAlign="left">
                                    <Typography variant="body1">Интересы:</Typography>
                                    <ChipsArray/>
                                </Box>
                            </Grid>
                        </Grid>

                    </Hidden>
                </Box>

                <Box mt={1} mb={1}>
                    <Divider light/>
                </Box>

                <Box>
                    {(userData.aboutUser) && (
                        <>
                            <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                                О себе
                            </Typography>
                            <div className={classes.description}>
                                <p>
                                    {userData.aboutUser}
                                </p>
                            </div>
                        </>
                    )}


                    {(userData.position) && (
                        <>
                            <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                                Должность
                            </Typography>
                            <div className={classes.description}>
                                <p>
                                    {userData.position}
                                </p>
                            </div>
                        </>
                    )}

                    {(userData.company) && (
                        <>
                            <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                                Организация
                            </Typography>
                            <div className={classes.description}>
                                <p>
                                    {userData.company}
                                </p>
                            </div>
                        </>
                    )}

                    {(userData.city) && (
                        <>
                            <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                                Город
                            </Typography>
                            <div className={classes.description}>
                                <p>
                                    {userData.city}
                                </p>
                            </div>
                        </>
                    )}

                    {(userData.education) && (
                        <>
                            <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                                Образование
                            </Typography>
                            <div className={classes.description}>
                                <p>
                                    {userData.education}
                                </p>
                            </div>
                        </>
                    )}

                    {(userData.experience) && (
                        <>
                            <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                                Опыт
                            </Typography>
                            <div className={classes.description}>
                                <p>
                                    {userData.experience}
                                </p>
                            </div>
                        </>
                    )}

                    {(userData.serviceCost) && (
                        <>
                            <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                                Стоимость услуг
                            </Typography>
                            <div className={classes.description}>
                                <p>
                                    {userData.serviceCost}
                                </p>
                            </div>
                        </>
                    )}

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
};

export default withStyles(styles)(AccountView);
