import React, {Component} from "react";

import {withStyles} from "@material-ui/core/styles";

import {
    Typography,
    Box,
    Container,
} from "@material-ui/core";

import {
    Person as PersonIcon,
} from "@material-ui/icons";

import authentication from "../../services/authentication";

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

class OrderView extends Component {
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
        const {order} = this.props;

        const {
            profileCompletion,
            securityRating,
            loadingAvatar,
            avatar,
            avatarUrl,
        } = this.state;

        return (
            <Container classes={{root: classes.dialogContent}}>
                <Box>
                    {(order && order.description) && (
                        <>
                            <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                                Описание закза
                            </Typography>
                            <div className={classes.description}>
                                <p>
                                    {order.description}
                                </p>
                            </div>
                        </>
                    )}

                    {(order && order.deadline) && (
                        <>
                            <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                                Крайний срок выполнения заказа
                            </Typography>
                            <div className={classes.description}>
                                <p>
                                    {new Date(order.deadline).toDateString()}
                                </p>
                            </div>
                        </>
                    )}

                    {(order && order.price) && (
                        <>
                            <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                                Бюджет на проект
                            </Typography>
                            <div className={classes.description}>
                                <p>
                                    {order.price}
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

OrderView.propTypes = {};

export default withStyles(styles)(OrderView);
