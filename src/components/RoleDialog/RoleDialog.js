import React, {Component} from "react";

import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";

import {
    Dialog,
    DialogTitle,
    Typography,
    Tooltip,
    IconButton, Box,
} from "@material-ui/core";

import {
    Close as CloseIcon,
} from "@material-ui/icons";


const styles = (theme) => ({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
});


class RoleDialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Styling
        const {classes} = this.props;

        // Dialog Properties
        const {dialogProps} = this.props;

        // Custom Properties
        const {user, userData, theme} = this.props;

        // Custom Functions
        const {openSnackbar} = this.props;

        return (
            <Dialog {...dialogProps} >
                <DialogTitle disableTypography>
                    <Typography variant="h6">Settings</Typography>

                    <Tooltip title="Close">
                        <IconButton
                            className={classes.closeButton}
                            onClick={dialogProps.onClose}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Tooltip>
                </DialogTitle>

                <Box>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus iste libero molestiae
                        pariatur placeat tempore. Accusamus ad, aliquam consectetur, deserunt dignissimos dolores ipsa
                        minima mollitia nam quaerat reprehenderit saepe, tempore!</p>
                </Box>

            </Dialog>
        );
    }
}

RoleDialog.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Dialog Properties
    dialogProps: PropTypes.object.isRequired,

    // Custom Properties
    theme: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    userData: PropTypes.object,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(RoleDialog);
