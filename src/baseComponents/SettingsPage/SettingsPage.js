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
    Security as SecurityIcon,
} from "@material-ui/icons";

import SwipeableViews from "react-swipeable-views";

import AccountTab from "../AccountTab";
import AppearanceTab from "../AppearanceTab";
import LinksTab from "../LinksTab";
import SecurityTab from "../SecurityTab";
import GridItem from "../../components/Grid/GridItem";
import classNames from "classnames";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import List from "@material-ui/core/List";
import OrderItem from "../../components/RecommendationsItem/OrderItem";

const styles = (theme) => ({
    tabs: {
        display: "initial",
    },
    inner: {
        margin: "0 auto",
        padding: "6vh 0",
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
            <GridItem xs={12} sm={12} md={10} lg={8} className={classNames(classes.inner)}>
                <Card>
                    <Tabs
                        classes={{root: classes.tabs}}
                        style={{overflow: "initial", minHeight: "initial"}}
                        indicatorColor="primary"
                        textColor="primary"
                        value={selectedTab}
                        variant="fullWidth"
                        onChange={this.handleTabChange}
                    >
                        {tabs.map((tab) => {
                            return <Tab key={tab.key} icon={tab.icon} label={tab.label}/>;
                        })}
                    </Tabs>

                    <SwipeableViews
                        index={selectedTab}
                        onChangeIndex={this.handleIndexChange}
                    >
                        <AccountTab
                            user={user}
                            userData={userData}
                            openSnackbar={openSnackbar}
                            onDeleteAccountClick={onDeleteAccountClick}
                        />

                        <AppearanceTab theme={theme} openSnackbar={openSnackbar}/>

                        <LinksTab theme={theme} openSnackbar={openSnackbar}/>

                        <SecurityTab
                            user={user}
                            userData={userData}
                            openSnackbar={openSnackbar}
                        />
                    </SwipeableViews>
                </Card>
            </GridItem>
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
