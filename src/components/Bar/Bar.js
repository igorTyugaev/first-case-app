import React, {Component} from "react";

import PropTypes from "prop-types";

import {Link as RouterLink} from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    ButtonGroup,
    Button,
    IconButton,
    Divider,
    Menu,
    MenuItem,
    Link,
} from "@material-ui/core";

import UserAvatar from "../UserAvatar";
import {withStyles} from "@material-ui/core/styles";
import Header from "../../components/Header/Header";

const styles = (theme) => ({
    header__logo: {
        color: "#FFFFFF",
        "&:hover,&:focus": {
            color: "#FFFFFF",
            textDecoration: "none",
            cursor: "pointer"
        }
    },

    header__link: {
        color: "#FFFFFF",
        "&:hover,&:focus": {
            color: "#FFFFFF",
            cursor: "pointer"
        }
    }

});

class Bar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: {
                anchorEl: null,
            },
        };
    }

    openMenu = (event) => {
        const anchorEl = event.currentTarget;

        this.setState({
            menu: {
                anchorEl,
            },
        });
    };

    closeMenu = () => {
        this.setState({
            menu: {
                anchorEl: null,
            },
        });
    };

    getTitleForOrder = (userData) => {
        if (!userData && !userData.role)
            return null;

        switch (userData.role.toLowerCase()) {
            case "mentor":
                return "Найти заказ";
            case "customer":
                return "Все заказы";
            case "student":
                return "Найти заказ";
            default:
                return null;
        }
    }

    getTitleForRole = (userData) => {
        if (!userData && !userData.role)
            return null
        
        switch (userData.role) {
            case "Mentor":
                return "Наставник";
            case "Customer":
                return "Заказчик";
            case "Student":
                return "Студент";
            default:
                return null;
        } 
    }

    render() {
        // Properties
        const {performingAction, user, userData} = this.props;
        const {classes} = this.props;

        // Events
        const {
            onAboutClick,
            onSignOutClick,
            onSignUpClick,
            onSignInClick,
        } = this.props;

        const {menu} = this.state;

        const menuItems = [
            {
                name: "Мой профиль",
                to: user ? `/user/${user.uid}` : null,
            },

            {
                name: "Ред. профиль",
                to: user ? `/settings/` : null,
            },

            {
                name: "О нас",
                onClick: onAboutClick,
            },

            {
                name: "Выйти",
                divide: true,
                onClick: onSignOutClick,
            },
        ];

        if (user) {
            return (
                <AppBar color="primary" position="fixed">
                    <Toolbar>
                        <Box display="flex" flexGrow={1}>
                            <Typography color="inherit" variant="h6">
                                <Link
                                    className={classes.header__logo}
                                    component={RouterLink}
                                    to="/"
                                    underline="none"
                                >
                                    {process.env.REACT_APP_TITLE + ' > ' + this.getTitleForRole(userData)}
                                </Link>           
                            </Typography>
                            <Typography color="inherit" variant="h6" className={classes.header__logo}>
                                {}
                            </Typography>
                        </Box>

                        {user && (
                            <>
                                {userData.role && (
                                    <>
                                        < Box mr={1}>
                                            <Button
                                                className={classes.header__link}
                                                component={RouterLink}
                                                variant="text"
                                                to="/orders/"
                                            >
                                                {this.getTitleForOrder(userData)}
                                            </Button>
                                        </Box>

                                        <Box mr={1}>
                                            <Button
                                                className={classes.header__link}
                                                component={RouterLink}
                                                variant="text"
                                                to="/dialogs/"
                                            >
                                                Сообщения
                                            </Button>
                                        </Box>

                                        {userData.role.toLowerCase() === "mentor" && (
                                            // TODO: мой заказ
                                            <Box mr={1}>
                                                <Button
                                                    className={classes.header__link}
                                                    component={RouterLink}
                                                    variant="text"
                                                    to="/people/"
                                                >
                                                    Найти студента
                                                </Button>
                                            </Box>
                                        )}

                                        {userData.role.toLowerCase() === "customer" && (
                                            <Box mr={1}>
                                                <Button
                                                    className={classes.header__link}
                                                    component={RouterLink}
                                                    variant="text"
                                                    to="/create_order/"
                                                >
                                                    Новый заказ
                                                </Button>
                                            </Box>
                                        )}
                                    </>
                                )}

                                <IconButton
                                    color="inherit"
                                    disabled={performingAction}
                                    onClick={this.openMenu}
                                >
                                    <UserAvatar user={user} userData={userData}/>
                                </IconButton>

                                <Menu
                                    anchorEl={menu.anchorEl}
                                    open={Boolean(menu.anchorEl)}
                                    onClose={this.closeMenu}
                                >
                                    {menuItems.map((menuItem, index) => {
                                        if (
                                            menuItem.hasOwnProperty("condition") &&
                                            !menuItem.condition
                                        ) {
                                            return null;
                                        }

                                        let component = null;

                                        if (menuItem.to) {
                                            component = (
                                                <MenuItem
                                                    key={index}
                                                    component={RouterLink}
                                                    to={menuItem.to}
                                                    onClick={this.closeMenu}
                                                >
                                                    {menuItem.name}
                                                </MenuItem>
                                            );
                                        } else {
                                            component = (
                                                <MenuItem
                                                    key={index}
                                                    onClick={() => {
                                                        this.closeMenu();

                                                        menuItem.onClick();
                                                    }}
                                                >
                                                    {menuItem.name}
                                                </MenuItem>
                                            );
                                        }

                                        if (menuItem.divide) {
                                            return (
                                                <span key={index}>
                        <Divider/>

                                                    {component}
                      </span>
                                            );
                                        }

                                        return component;
                                    })}
                                </Menu>
                            </>
                        )}

                        {!user && (
                            <ButtonGroup
                                color="inherit"
                                disabled={performingAction}
                                variant="outlined"
                            >
                                <Button onClick={onSignUpClick}>Зарегистрироваться</Button>
                                <Button onClick={onSignInClick}>Войти</Button>
                            </ButtonGroup>
                        )}
                    </Toolbar>
                </AppBar>
            );
        } else {
            return (
                <Header
                    absolute
                    color="transparent"
                    brand="FirstCase"
                    rightLinks={
                        <ButtonGroup
                            color="inherit"
                            disabled={performingAction}
                            variant="outlined"
                        >
                            <Button onClick={onSignUpClick}>Зарегистрироваться</Button>
                            <Button onClick={onSignInClick}>Войти</Button>
                        </ButtonGroup>
                    }
                />
            );
        }
    }
}

Bar.defaultProps = {
    performingAction: false,
};

Bar.propTypes = {
    // Properties
    performingAction: PropTypes.bool.isRequired,
    user: PropTypes.object,
    userData: PropTypes.object,

    // Events
    onAboutClick: PropTypes.func.isRequired,
    onSettingsClick: PropTypes.func.isRequired,
    onSignOutClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Bar);
