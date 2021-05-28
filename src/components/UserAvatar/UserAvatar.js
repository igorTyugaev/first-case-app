import React, {Component} from "react";

import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";

import {Avatar, ListItemAvatar, Typography} from "@material-ui/core";

import {
    AccountCircle as AccountCircleIcon,
    Person as PersonIcon,
} from "@material-ui/icons";

import authentication from "../../services/authentication";

const styles = (theme) => ({
    nameInitials: {
        cursor: "default",
        wordSpacing: "1px",
    },

    avatar: {
        marginRight: "auto",
        marginLeft: "auto",

        width: theme.spacing(14),
        height: theme.spacing(14),
    },

    avatarLittle: {
        marginRight: "auto",
        marginLeft: "auto",

        width: theme.spacing(5),
        height: theme.spacing(5),
    },

    personIcon: {
        fontSize: theme.spacing(7),
    },
});

class UserAvatar extends Component {
    getNameInitialsOrIcon = (fullName) => {
        if (!fullName) {
            return null;
        }

        const {classes} = this.props;

        const fullNameArray = fullName.split(" ");
        const firstName = fullNameArray[0];
        const lastName = fullNameArray[1];
        const nameInitials = `${firstName ? (firstName.charAt(0)) : ""}${lastName ? (lastName.charAt(0)) : ""}`;

        if (nameInitials) {
            return (
                <Typography className={classes.nameInitials} variant="h3">
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
        const {context, user, userData, defaultCursor, title} = this.props;

        if (context === "standalone") {
            if (!user) {
                return <AccountCircleIcon/>;
            }

            const photoUrl = user.photoURL;

            if (photoUrl) {
                return <Avatar alt="Avatar" src={photoUrl}/>;
            }

            const nameInitials = authentication.getNameInitials({
                ...user,
                ...userData,
            });

            if (nameInitials) {
                return (
                    <Avatar alt="Avatar">
            <span className={defaultCursor && classes.nameInitials}>
              {nameInitials}
            </span>
                    </Avatar>
                );
            }

            return (
                <Avatar alt="Avatar">
                    <PersonIcon/>
                </Avatar>
            );
        }

        if (context === "list") {
            if (!user) {
                return (
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                    </ListItemAvatar>
                );
            }

            const photoUrl = user.photoURL;

            if (photoUrl) {
                return (
                    <ListItemAvatar>
                        <Avatar alt="Avatar" src={photoUrl}/>
                    </ListItemAvatar>
                );
            }

            const nameInitials = authentication.getNameInitials({
                ...user,
                ...userData
            });

            if (nameInitials) {
                return (
                    <ListItemAvatar>
                        <Avatar alt="Avatar">
              <span className={defaultCursor && classes.nameInitials}>
                {nameInitials}
              </span>
                        </Avatar>
                    </ListItemAvatar>
                );
            }

            return (
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                </ListItemAvatar>
            );
        }

        if (context === "card") {

            if (user && user.photoURL) {
                const photoUrl = user.photoURL;

                if (photoUrl) {
                    return <Avatar alt="Avatar" src={photoUrl} className={classes.avatar}/>;
                }
            } else if (userData && userData.avatar) {
                const photoUrl = userData.avatar;

                if (photoUrl) {
                    return <Avatar alt="Avatar" src={photoUrl} className={classes.avatar}/>;
                }
            }

            return (
                <Avatar alt="Avatar" className={classes.avatar}>
                    {this.getNameInitialsOrIcon(title)}
                </Avatar>
            );
        }

        if (context === "dialog") {
            if (user && user.photoURL) {
                const photoUrl = user.photoURL;

                if (photoUrl) {
                    return <Avatar alt="Avatar" src={photoUrl} className={classes.avatarLittle}/>;
                }
            } else if (userData && userData.avatar) {
                const photoUrl = userData.avatar;

                if (photoUrl) {
                    return <Avatar alt="Avatar" src={photoUrl} className={classes.avatarLittle}/>;
                }
            }

            return (
                <Avatar alt="Avatar" className={classes.avatarLittle}>
                    {this.getNameInitialsOrIcon(title)}
                </Avatar>
            );
        }

        return null;
    }
}

UserAvatar.defaultProps = {
    context: "standalone",
};

UserAvatar.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Properties
    context: PropTypes.string,
    user: PropTypes.object,
    userData: PropTypes.object,
    defaultCursor: PropTypes.bool,
};

export default withStyles(styles)(UserAvatar);
