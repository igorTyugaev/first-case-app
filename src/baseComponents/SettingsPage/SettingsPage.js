import React, {Component} from "react";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";

import {
    Tabs,
    Tab, ListItem,
} from "@material-ui/core";

import {
    Close as CloseIcon,
    AccountCircle as AccountCircleIcon,
    Palette as PaletteIcon,
    Link as LinkIcon,
    Security as SecurityIcon, SvgIconComponent,
} from "@material-ui/icons";

import SwipeableViews from "react-swipeable-views";
import AccountEdit from "../AccountEdit";
import AppearanceTab from "../AppearanceTab";
import LinksTab from "../LinksTab";
import SecurityTab from "../SecurityTab";
import Card from "../../components/Card/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardHeader from "../../components/Card/CardHeader";


const styles = (theme) => ({
    tabs: {
        display: "initial",
    },
    inner: {
        margin: "0 auto",
        padding: "6vh 0",
    },

    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
});

const tabs = [
    {
        key: "account",
        icon: <AccountCircleIcon/>,
        label: "Account",
    },

    {
        key: "appearance",
        icon: <PaletteIcon/>,
        label: "Appearance",
    },

    {
        key: "links",
        icon: <LinkIcon/>,
        label: "Links",
    },

    {
        key: "security",
        icon: <SecurityIcon/>,
        label: "Security",
    },
];

const initialState = {
    selectedTab: 0,
};

class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    handleExited = () => {
        this.setState(initialState);
    };

    handleTabChange = (event, value) => {
        this.setState({
            selectedTab: value,
        });
    };

    handleIndexChange = (index) => {
        this.setState({
            selectedTab: index,
        });
    };

    render() {
        // Styling
        const {classes} = this.props;

        // Custom Properties
        const {user, userData, theme} = this.props;

        // Custom Functions
        const {openSnackbar} = this.props;

        // Custom Functions
        const {onDeleteAccountClick} = this.props;

        const {selectedTab} = this.state;

        return (
            <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>

                <Card>
                    <CardHeader color="success">
                        <Typography color="initial" variant="h4" component="h4" align="left" gutterBottom>
                            Редактировать профиль
                        </Typography>
                    </CardHeader>

                    <AccountEdit
                        theme={theme}
                        user={user}
                        userData={userData}
                        openSnackbar={openSnackbar}
                        onDeleteAccountClick={onDeleteAccountClick}
                    />
                </Card>

            </Grid>
        );
    }
}

SettingsPage.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Custom Properties
    theme: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    userData: PropTypes.object,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,

    // Custom Events
    onDeleteAccountClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(SettingsPage);
