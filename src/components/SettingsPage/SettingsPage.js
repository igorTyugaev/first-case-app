import React, {Component} from "react";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";

import AccountEdit from "../AccountEdit";
import Card from "../../components/Card/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardHeader from "../../components/Card/CardHeader";


const styles = (theme) => ({
    inner: {
        margin: "0 auto",
        padding: "6vh 0",
    },

    root: {
        margin: "0 auto",
        marginTop: theme.spacing(12),
    },
});

const initialState = {};

class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    handleExited = () => {
        this.setState(initialState);
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

        return (
            <Grid item container xs={12} sm={12} md={10} lg={8} className={classes.root}>
                <Card>
                    <CardHeader color="success">
                        <Typography color="initial" variant="h4" component="h4" align="left">
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
